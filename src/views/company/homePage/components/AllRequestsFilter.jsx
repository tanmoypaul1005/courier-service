/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import useRequestStore, { getTableViewRequestsData, onFilterValueChange } from '../../../../app/stores/others/requestStore';
import CommonModal from '../../../../components/modal/CommonModal';
import { k_data_set } from '../../../../app/utility/const';
import CommonSelect from '../../../../components/select/CommonSelect';
import CommonDatePicker from '../../../../components/input/CommonDatePicker';
import { getStringFromDateObject } from '../../../../app/utility/utilityFunctions';
import FilterRange from '../../../../components/utility/FilterRange';
import CommonButton from '../../../../components/button/CommonButton';
import { useTranslation } from 'react-i18next';
import { kuGetRequestsNew } from '../../../../app/urls/commonUrl';

export default function AllRequestsFilter({ showModal, setShowModal }) {

  const { setRequestApiUrl,request_filter_form, changeRequestFilterForm, transport_type, filter_range, resetRequestFilterForm, resetFilterRange, updateRequestFilterForm, request_filter_form_copy, updateRequestFilterFormCopy } = useRequestStore();

  const divRef = useRef(null);

  const [status, setStatus] = useState([]);
  const { t } = useTranslation();


  useEffect(() => { updateRequestFilterForm(request_filter_form_copy) }, [showModal]);

  useEffect(() => {
    if (divRef.current) divRef.current.focus();
    setStatus([
      { title: t('Invitation'), value: 'invitation' },
      { title: t('In Bidding'), value: 'in_bidding' },
      { title: t('Not Planned'), value: 'not_planned' },
      { title: t('Awarded'), value: 'awarded' },
      { title: t('Ongoing'), value: 'ongoing' },
      // { title: t('Completed'), value: 'complete' },
      // { title: t('History'), value: 'history' },
    ]);
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
            resetRequestFilterForm();
            resetFilterRange();
            setRequestApiUrl(kuGetRequestsNew)
            await getTableViewRequestsData({
              data_set: k_data_set.all_requests, 
              filter: {
                transport_type: "",
                status: "",
                from_date: "",
                to_date: "",
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
            setRequestApiUrl(kuGetRequestsNew)
            await getTableViewRequestsData({
              data_set: k_data_set.all_requests, filter: {
                transport_type: request_filter_form?.transport_type,
                status: request_filter_form?.status,
                from_date: request_filter_form?.from_date,
                to_date: request_filter_form?.to_date,
                min_budget: request_filter_form?.min_budget,
                max_budget: request_filter_form?.max_budget,
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

              <CommonSelect label={t('Status')} dataArray={status} has_subtitle={false} onChange={(e, value) => {
                changeRequestFilterForm('status', e.target.value);
              }} value={request_filter_form?.status} />
            </div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={request_filter_form?.from_date}
                onChange={(date) => changeRequestFilterForm('from_date', getStringFromDateObject(date))}
                label={t('From')}
              />

              <CommonDatePicker
                value={request_filter_form?.to_date}
                onChange={(date) => changeRequestFilterForm('to_date', getStringFromDateObject(date))}
                label={t('To')}
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
