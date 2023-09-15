/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import CommonModal from '../../../../../../components/modal/CommonModal'
import CommonDatePicker from '../../../../../../components/input/CommonDatePicker'
import CommonSelect from '../../../../../../components/select/CommonSelect'
import CommonButton from '../../../../../../components/button/CommonButton'
import useRequestStore, { getTableViewRequestsData } from '../../../../../../app/stores/others/requestStore'
import { k_data_set } from '../../../../../../app/utility/const'
import { getStringFromDateObject } from '../../../../../../app/utility/utilityFunctions'
import { useTranslation } from 'react-i18next'
import { kuGetRequestsNew } from '../../../../../../app/urls/commonUrl'

export default function InvitationFilter({ showModal, setShowModal }) {
  const {setRequestApiUrl,request_filter_form, changeRequestFilterForm, transport_type, resetRequestFilterForm, resetFilterRange, updateRequestFilterForm, request_filter_form_copy, updateRequestFilterFormCopy, } = useRequestStore();

  const divRef = useRef(null);
  const { t } = useTranslation();


  useEffect(() => { updateRequestFilterForm(request_filter_form_copy) }, [showModal]);

  useEffect(() => {
    if (divRef.current) divRef.current.focus();
  }, []);

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
              data_set: k_data_set.invitation, filter: {
                transport_type: "",
                bids_end_from: "",
                bids_end_to: "",
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
              data_set: k_data_set.invitation, filter: {
                transport_type: request_filter_form?.transport_type,
                bids_end_from: request_filter_form?.bids_end_from,
                bids_end_to: request_filter_form?.bids_end_to,
              }
            });
            updateRequestFilterFormCopy(request_filter_form);
            setShowModal(false);
          }}>

            <div tabIndex="0" ref={divRef} className='pt-0' ></div>

            <CommonSelect label={t('Transportation Type')} dataArray={transport_type} has_subtitle={false} onChange={(e, value) => {
              changeRequestFilterForm('transport_type', value);
            }} value={request_filter_form?.transport_type} />

            {/* bids_end_from: '',
    bids_end_to: '', */}
            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={request_filter_form?.bids_end_from}
                onChange={(date) => changeRequestFilterForm('bids_end_from', getStringFromDateObject(date))}
                label={t('Bid Ends From')}
              />

              <CommonDatePicker
                value={request_filter_form?.bids_end_to}
                onChange={(date) => changeRequestFilterForm('bids_end_to', getStringFromDateObject(date))}
                label={t('Bid Ends To')}
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
