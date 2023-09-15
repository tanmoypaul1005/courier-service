/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import CommonMultiSelect from '../../../../components/select/CommonMultiSelect'
import useRequestStore, { getTableViewGlobalRequestsData } from '../../../../app/stores/others/requestStore';
import CommonModal from '../../../../components/modal/CommonModal';
import { k_data_set } from '../../../../app/utility/const';
import CommonSelect from '../../../../components/select/CommonSelect';
import CommonTimePicker from '../../../../components/input/CommonTimePicker';
import CommonButton from '../../../../components/button/CommonButton';
import CommonDatePicker from '../../../../components/input/CommonDatePicker';
import { getStringFromDateObject } from '../../../../app/utility/utilityFunctions';
import useGlobalReqStore from '../../../../app/stores/company/globlaReqStore';
import { useTranslation } from 'react-i18next';
import { kuGlobalRequestTableIndex } from '../../../../app/urls/companyUrl';

export default function GlobalRequestFilter({ showModal, setShowModal }) {

  const { setGlobalRequestApiUrl,request_filter_form, changeRequestFilterForm, transport_type, resetRequestFilterForm, resetFilterRange, updateRequestFilterForm, request_filter_form_copy, updateRequestFilterFormCopy } = useRequestStore();
  const { globalReqCityList } = useGlobalReqStore();

  const divRef = useRef(null);

  const { t } = useTranslation ();

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
            await resetRequestFilterForm();
            resetFilterRange();
            setGlobalRequestApiUrl(kuGlobalRequestTableIndex);
             getTableViewGlobalRequestsData({
              data_set: k_data_set.in_bidding,
              filter: {
                transport_type: "",
                pickup_date_from: "",
                pickup_date_to: "",
                start_time: "",
                end_time: "",
                city: "",
              }
            });
            updateRequestFilterFormCopy("");
            setShowModal(false);
          }}>
            {("Clear")}
          </div>

        </div>
      }
      mainContent={
        <>
          <form className='mt-6' onSubmit={async (e) => {
            e.preventDefault();
            setGlobalRequestApiUrl(kuGlobalRequestTableIndex);
            await getTableViewGlobalRequestsData({
              data_set: k_data_set.in_bidding, filter: {
                transport_type: request_filter_form?.transport_type,
                pickup_date_from: request_filter_form?.pickup_date_from,
                pickup_date_to: request_filter_form?.pickup_date_to,
                start_time: request_filter_form?.start_time,
                end_time: request_filter_form?.end_time,
                city: request_filter_form?.city,
              }
            });
            updateRequestFilterFormCopy(request_filter_form);
            setShowModal(false);
          }}>

            <div tabIndex="0" ref={divRef} className='pt-0' ></div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonSelect label={t('Transportation Type')} dataArray={transport_type} has_subtitle={false} onChange={(e, value) => {
                changeRequestFilterForm('transport_type', value);
              }} value={request_filter_form?.transport_type} />

              <CommonMultiSelect
                label={t('Select City')}
                value={request_filter_form?.city}
                dataArray={globalReqCityList?.length > 0 ? globalReqCityList : [{ title: t('Nothing to selected'), value: null }]}
                onChange={(e) => { changeRequestFilterForm('city', e.target.value) }}
              />
            </div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={request_filter_form?.pickup_date_from}
                onChange={(date) => changeRequestFilterForm('pickup_date_from', getStringFromDateObject(date))}
                label={t('Pickup date From')}
                allowPastDate={false}
              />

              <CommonDatePicker
                value={request_filter_form?.pickup_date_to}
                onChange={(date) => changeRequestFilterForm('pickup_date_to', getStringFromDateObject(date))}
                label={t('Pickup date To')}
                allowPastDate={false}
              />
            </div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonTimePicker
                showExtendedTimeUi={false}
                label={t('Pickup time From')}
                init_time={request_filter_form?.start_time}
                onChange={(time) => changeRequestFilterForm('start_time', time)}
              />
              <CommonTimePicker
                showExtendedTimeUi={false}
                label={t('Pickup time To')}
                init_time={request_filter_form?.end_time}
                onChange={(time) => changeRequestFilterForm('end_time', time)}
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
