/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import useShiftStore, { getShiftTableData, validateDateTime } from '../../../../app/stores/company/shiftStore';
import CommonModal from '../../../../components/modal/CommonModal';
import CommonSelect from '../../../../components/select/CommonSelect';
import CommonDatePicker from '../../../../components/input/CommonDatePicker';
import { formatDateV2, getStringFromDateObject } from '../../../../app/utility/utilityFunctions';
import CommonTimePicker from '../../../../components/input/CommonTimePicker';
import CommonButton from '../../../../components/button/CommonButton';
import CommonCheckbox from '../../../../components/input/CommonCheckbox';
import { useTranslation } from 'react-i18next';
import { kuShiftManagerTableData } from '../../../../app/urls/companyUrl';

export default function ShiftManagerFilter({ showModal, setShowModal }) {

  const { resetFilterFormCopy, filter_form, changeFilterForm, filterShiftCarList, resetFilterForm, updateFilterForm, filter_form_copy, updateFilterFormCopy, filterShiftDriverList,setApiUrl } = useShiftStore();

  const divRef = useRef(null);

  const { t } = useTranslation();

  const [shift_status, setShiftStatus] = useState([
    { value: 'init', title: t('Not Started') },
    { value: 'ongoing', title: t('Ongoing') },
    { value: 'complete', title: t('Completed') },
  ]);

  useEffect(() => { updateFilterForm(filter_form_copy) }, [showModal]);

  useEffect(() => { if (divRef.current) divRef.current.focus() }, []);


  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={
        <div className='flex items-baseline'>
          <div>{t('Filter')}</div>

          <div className='pl-4 text-base cursor-pointer select-none drop-shadow-sm text-cRed' onClick={async () => {
            await resetFilterFormCopy();
            await resetFilterForm();
            setApiUrl(kuShiftManagerTableData);
            getShiftTableData({
              filter: {
                start_date: "",
                end_date: "",
                start_time: "",
                end_time: "",
                plate_number: "",
                driver_id: "",
                is_maintenance: null,
                status: "",
              }
            });
            setShowModal(false);
          }}>
            {t("Clear")}
          </div>

        </div>
      }
      mainContent={
        <>
          <form className='mt-6' onSubmit={async (e) => {
            e.preventDefault();
            let x = true;
            x = await validateDateTime(filter_form?.start_date, filter_form?.start_time, filter_form?.end_date, filter_form?.end_time);
            if (!x) return;
            setApiUrl(kuShiftManagerTableData);
            await getShiftTableData({
              //(!filter_form?.start_date || filter_form?.start_date === '') ? formatDateV2() : filter_form?.start_date
              filter: {
                start_date: filter_form?.start_date ?? "",
                end_date: filter_form?.end_date,
                start_time: filter_form?.start_time,
                end_time: filter_form?.end_time,
                plate_number: filter_form?.plate_number,
                driver_id: filter_form?.driver_id,
                is_maintenance: filter_form?.is_maintenance,
                status: filter_form?.status,
              }
            });
            updateFilterFormCopy(filter_form);
            setShowModal(false);
          }}>

            <div tabIndex="0" ref={divRef} className='pt-0' ></div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonDatePicker
                value={filter_form?.start_date}
                onChange={(date) => changeFilterForm('start_date', getStringFromDateObject(date))}
                label={t('Start Date')}
              />

              <CommonDatePicker
                value={filter_form?.end_date}
                onChange={(date) => changeFilterForm('end_date', getStringFromDateObject(date))}
                label={t('End Date')}
              />
            </div>

            <div className="mt-[26px] grid grid-cols-2 items-center gap-7">
              <CommonTimePicker
                showExtendedTimeUi={false}
                label={t('Start Time')}
                init_time={filter_form?.start_time}
                onChange={(time) => changeFilterForm('start_time', time)}
              />
              <CommonTimePicker
                showExtendedTimeUi={false}
                label={t('End Time')}
                init_time={filter_form?.end_time}
                onChange={(time) => changeFilterForm('end_time', time)}
              />
            </div>

            <div className="mt-[9px] grid grid-cols-2 items-center gap-7">
              <CommonSelect label={t('Select Car/License Plate')} dataArray={filterShiftCarList?.length > 0 ? filterShiftCarList : [{ title: t('Nothing to selected'), value: null }]} has_subtitle={false} onChange={(e, value) => {
                changeFilterForm('plate_number', e.target.value);
              }} value={filter_form?.plate_number} />

              <CommonSelect label={t('Select Driver')} dataArray={filterShiftDriverList?.length > 0 ? filterShiftDriverList : [{ title: t('Nothing to selected'), value: null }]} has_subtitle={false} onChange={(e, value) => {
                changeFilterForm('driver_id', e.target.value);
              }} value={filter_form?.driver_id} />
            </div>

            <div className="mt-[31px] grid grid-cols-2 items-center gap-7">
              <CommonSelect label={t('Shift Status')} dataArray={shift_status} has_subtitle={false} onChange={(e, value) => {
                changeFilterForm('status', e.target.value);
              }} value={filter_form?.status} />

              <div className="mt-5">
                <CommonCheckbox
                  label={t('in maintenance')}
                  checked={filter_form?.is_maintenance ? true : false}
                  onChange={() => {
                    changeFilterForm('is_maintenance', filter_form?.is_maintenance ? 0 : 1);
                  }} />
              </div>

            </div>


            <div className='flex flex-row items-center justify-end w-full mt-s20'>
              <CommonButton btnLabel={t('Apply Filter')} type='submit' />
            </div>

          </form>
        </>
      }
    />
  )
}
