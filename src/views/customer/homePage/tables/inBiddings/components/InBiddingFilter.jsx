/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import CommonModal from '../../../../../../components/modal/CommonModal'
import CommonDatePicker from '../../../../../../components/input/CommonDatePicker'
import CommonSelect from '../../../../../../components/select/CommonSelect'
import FilterRange from '../../../../../../components/utility/FilterRange'
import CommonButton from '../../../../../../components/button/CommonButton'
import useRequestStore, { getTableViewRequestsData, onFilterValueChange } from '../../../../../../app/stores/others/requestStore'
import { getStringFromDateObject } from '../../../../../../app/utility/utilityFunctions'
import { k_data_set } from '../../../../../../app/utility/const'
import { useTranslation } from 'react-i18next'
import { kuGetRequestsNew } from '../../../../../../app/urls/commonUrl'

export default function InBiddingFilter({ showModal, setShowModal }) {

  const { setRequestApiUrl,request_filter_form, changeRequestFilterForm, transport_type, filter_range, resetRequestFilterForm, resetFilterRange, updateRequestFilterForm, request_filter_form_copy, updateRequestFilterFormCopy } = useRequestStore();
  const { t } = useTranslation();

  const divRef = useRef(null);

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
            onClick={async () => {
              resetRequestFilterForm();
              resetFilterRange();
              setRequestApiUrl(kuGetRequestsNew);
              await getTableViewRequestsData({
                data_set: k_data_set.in_bidding,
                filter: {
                  transport_type: "",
                  pickup_date_from: "",
                  pickup_date_to: "",
                  min_budget: "",
                  max_budget: "",
                }
              });
              updateRequestFilterFormCopy("");
              setShowModal(false);
            }}>
            {t('Clear')}
          </div>

        </div>
      }
      mainContent={
        <>
          <form className='mt-6' onSubmit={async (e) => {
            e.preventDefault();
            setRequestApiUrl(kuGetRequestsNew);
            await getTableViewRequestsData({
              data_set: k_data_set.in_bidding, filter: {
                transport_type: request_filter_form?.transport_type,
                pickup_date_from: request_filter_form?.pickup_date_from,
                pickup_date_to: request_filter_form?.pickup_date_to,
                min_budget: request_filter_form?.min_budget,
                max_budget: request_filter_form?.max_budget,
              }
            });
            updateRequestFilterFormCopy(request_filter_form);
            setShowModal(false);
          }}>

            <div tabIndex="0" ref={divRef} className='pt-0' ></div>

            <CommonSelect label={t('Transportation Type')} dataArray={transport_type} has_subtitle={false} onChange={(e, value) => {
              changeRequestFilterForm('transport_type', value);
            }} value={request_filter_form?.transport_type} />

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
