/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import CommonModal from '../../../../../../components/modal/CommonModal'
import CommonDatePicker from '../../../../../../components/input/CommonDatePicker'
import CommonSelect from '../../../../../../components/select/CommonSelect'
import FilterRange from '../../../../../../components/utility/FilterRange'
import CommonButton from '../../../../../../components/button/CommonButton'
import useRequestStore, { getTableViewRequestsData, onFilterValueChange } from '../../../../../../app/stores/others/requestStore'
import { k_data_set, user_role as role } from '../../../../../../app/utility/const'
import { getStringFromDateObject } from '../../../../../../app/utility/utilityFunctions'
import useGeneralStore from '../../../../../../app/stores/others/generalStore'
import { useTranslation } from 'react-i18next'
import { kuGetRequestsNew } from '../../../../../../app/urls/commonUrl'

export default function AwardedFilter({ showModal, setShowModal }) {
  const { setRequestApiUrl,request_filter_form, changeRequestFilterForm, transport_type, filter_range, resetRequestFilterForm, resetFilterRange, updateRequestFilterForm, request_filter_form_copy, updateRequestFilterFormCopy, awarded_company, shift_drivers } = useRequestStore();
  const { user_role } = useGeneralStore();

  const divRef = useRef(null);
  const { t } = useTranslation();


  useEffect(() => { updateRequestFilterForm(request_filter_form_copy) }, [showModal]);

  useEffect(() => { if (divRef.current) divRef.current.focus() }, []);

  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={
        <div className='flex items-baseline'>
          <div>{t('Filter')}</div>
          <div className='cursor-pointer select-none drop-shadow-sm text-base text-cRed pl-4' 
          onClick={async() => {
            (user_role === role.customer) ? resetRequestFilterForm() : resetRequestFilterForm(1);
            resetFilterRange();
            setRequestApiUrl(kuGetRequestsNew);
            await getTableViewRequestsData({
              data_set: k_data_set.awarded, filter: {
                is_planned: user_role === role.company ? 1 : null,
                transport_type: "",
                pickup_date_from: "",
                pickup_date_to: "",
                min_budget: "",
                max_budget: "",
                awarded_company:  null,
                shift_driver: null,
              }
            });
            updateRequestFilterFormCopy("");
            setShowModal(false);
          }} >{t('Clear')}</div>
        </div>
      }
      mainContent={
        <>
          <form className='mt-6' onSubmit={async (e) => {
            e.preventDefault();
            setRequestApiUrl(kuGetRequestsNew);
            await getTableViewRequestsData({
              data_set: k_data_set.awarded, filter: {
                is_planned: user_role === role.company ? 1 : null,
                transport_type: request_filter_form?.transport_type,
                pickup_date_from: request_filter_form?.pickup_date_from,
                pickup_date_to: request_filter_form?.pickup_date_to,
                min_budget: request_filter_form?.min_budget,
                max_budget: request_filter_form?.max_budget,
                awarded_company: user_role === role.customer ? request_filter_form?.awarded_company : null,
                shift_driver: user_role === role.company ? request_filter_form?.shift_driver : null,
              }
            });
            updateRequestFilterFormCopy(request_filter_form);
            setShowModal(false);
          }}>

            <div tabIndex="0" ref={divRef} className='pt-0' ></div>

            <div className='grid grid-cols-2 items-center gap-7'>

              <CommonSelect label={t('Transportation Type')} dataArray={transport_type} has_subtitle={false} onChange={(e, value) => {
                changeRequestFilterForm('transport_type', value);
              }} value={request_filter_form?.transport_type} />

              {(user_role === role.customer) ? <CommonSelect label={t('Select Company')}
                dataArray={awarded_company?.length > 0 ? awarded_company : [{ title: t('Nothing to selected'), value: null }]}
                has_subtitle={false} onChange={(e, value) => {
                  changeRequestFilterForm('awarded_company', e.target.value);
                }} value={request_filter_form?.awarded_company} /> :
                <CommonSelect label={t('Select Driver')} dataArray={shift_drivers?.length > 0 ? shift_drivers : [{ title: t('Nothing to selected'), value: null }]} has_subtitle={false} onChange={(e, value) => {
                  changeRequestFilterForm('shift_driver', e.target.value);
                }} value={request_filter_form?.shift_driver} />
              }

            </div>


            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={request_filter_form?.pickup_date_from}
                onChange={(date) => changeRequestFilterForm('pickup_date_from', getStringFromDateObject(date))}
                label={t('Pickup From')}
              // allowPastDate={false}
              />

              <CommonDatePicker
                value={request_filter_form?.pickup_date_to}
                onChange={(date) => changeRequestFilterForm('pickup_date_to', getStringFromDateObject(date))}
                label={t('Pickup To')}
              // allowPastDate={false}
              />
            </div>

            <FilterRange
              className={'mt-4'}
              value={filter_range?.value}
              defaultValue={filter_range?.defaultValue}
              min={filter_range?.min}
              max={filter_range?.max}
              onChange={onFilterValueChange}
            />

            <div className='flex flex-row justify-end items-center w-full mt-5'>
              <CommonButton btnLabel={t('Apply Filter')} type='submit' />
            </div>


          </form>
        </>
      }
    />
  )
}
