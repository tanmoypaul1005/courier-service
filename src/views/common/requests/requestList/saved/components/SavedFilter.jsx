/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import CommonModal from '../../../../../../components/modal/CommonModal'
import CommonDatePicker from '../../../../../../components/input/CommonDatePicker'
import CommonSelect from '../../../../../../components/select/CommonSelect'
import CommonButton from '../../../../../../components/button/CommonButton'
import useRequestStore, { getTableViewRequestsData } from '../../../../../../app/stores/others/requestStore'
import { k_data_set, user_role as role } from '../../../../../../app/utility/const'
import { getStringFromDateObject } from '../../../../../../app/utility/utilityFunctions'
import useGeneralStore from '../../../../../../app/stores/others/generalStore'
import { useTranslation } from 'react-i18next'
import { kuGetRequestsNew } from '../../../../../../app/urls/commonUrl'

export default function SavedFilter({ showModal, setShowModal }) {
  const { setRequestApiUrl,request_filter_form, changeRequestFilterForm, transport_type, resetRequestFilterForm, resetFilterRange, updateRequestFilterForm, request_filter_form_copy, updateRequestFilterFormCopy, } = useRequestStore();
  const { user_role } = useGeneralStore();
  const [status, setStatus] = React.useState([]);
  const { t } = useTranslation();


  const divRef = useRef(null);

  useEffect(() => { updateRequestFilterForm(request_filter_form_copy) }, [showModal]);

  useEffect(() => {
    if (divRef.current) divRef.current.focus();
    if (user_role === role.customer) {
      setStatus([
        { title: t('Left in init'), value: 'init' },
        { title: t('Left in stops'), value: 'stops' },
        { title: t('Left in company'), value: 'company' },
        { title: t('Left in summary'), value: 'summary' },
      ]);
    } else {
      setStatus([
        { title: t('Left in init'), value: 'init' },
        { title: t('Left in stops'), value: 'stops' },
        { title: t('Left in shift'), value: 'shift' },
        { title: t('Left in summary'), value: 'summary' },
      ]);
    }
  }, []);

  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={
        <div className='flex items-baseline'>
          <div>{t('Filter')}</div>
          <div className='cursor-pointer select-none drop-shadow-sm text-base text-cRed pl-4' 
          onClick={async() => {
            await resetRequestFilterForm();
            resetFilterRange();
            setRequestApiUrl(kuGetRequestsNew);
            await getTableViewRequestsData({
              data_set: k_data_set.saved, 
              filter: {
                transport_type: "",
                pickup_date_from: "",
                pickup_date_to: "",
                saved_date_from: "",
                saved_date_to: "",
                status: "",
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
              data_set: k_data_set.saved, filter: {
                transport_type: request_filter_form?.transport_type,
                pickup_date_from: request_filter_form?.pickup_date_from,
                pickup_date_to: request_filter_form?.pickup_date_to,
                saved_date_from: request_filter_form?.saved_date_from,
                saved_date_to: request_filter_form?.saved_date_to,
                status: request_filter_form?.status,
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

              <CommonSelect label={t('Select Status')} dataArray={status} has_subtitle={false} onChange={(e, value) => {
                changeRequestFilterForm('status', e.target.value);
              }} value={request_filter_form?.status} />
            </div>


            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={request_filter_form?.pickup_date_from}
                onChange={(date) => changeRequestFilterForm('pickup_date_from', getStringFromDateObject(date))}
                label={t('Pickup From')}
              />

              <CommonDatePicker
                value={request_filter_form?.pickup_date_to}
                onChange={(date) => changeRequestFilterForm('pickup_date_to', getStringFromDateObject(date))}
                label={t('Pickup To')}
              />
            </div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={request_filter_form?.saved_date_from}
                onChange={(date) => changeRequestFilterForm('saved_date_from', getStringFromDateObject(date))}
                label={t('Saved From')}
              />

              <CommonDatePicker
                value={request_filter_form?.saved_date_to}
                onChange={(date) => changeRequestFilterForm('saved_date_to', getStringFromDateObject(date))}
                label={t('Saved To')}
              />
            </div>

            <div className='flex flex-row justify-end items-center w-full mt-5'>
              <CommonButton btnLabel={t('Apply Filter')} type='submit' />
            </div>

          </form>
        </>
      }
    />
  )
}
