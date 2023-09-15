/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useCreateRequestStore from '../../../../../../app/stores/others/createRequestStore'
import { getRequestShiftPlannerList } from '../../../../../../app/stores/others/requestStore'
import { create_request_steps } from '../../../../../../app/utility/const';
import Shifts from './components/Shifts'
import { useTranslation } from 'react-i18next';

export default function SelectShift() {
  const { current_step, cr_form } = useCreateRequestStore();
  const { t } = useTranslation();


  useEffect(() => {
    if (current_step === create_request_steps.select_shift) {
      (cr_form?.pickup_start_time && cr_form?.pickup_end_time && cr_form?.pickup_date) && getRequestShiftPlannerList(cr_form?.pickup_start_time, cr_form?.pickup_end_time, cr_form?.pickup_date);
    }
  }, [current_step])

  return (
    <>
      <div className='text-cMainBlack text-fs24 font-fw500'>{t('Select Shift')}</div>

      <Shifts />

    </>
  )
}
