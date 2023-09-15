/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useRequestStore from '../../../../app/stores/others/requestStore'
import { formatDate, formatTime } from '../../../../app/utility/utilityFunctions';
import SummaryInfoItem from '../../../utility/summary/components/SummaryInfoItem';
import { useTranslation } from 'react-i18next';

export default function ShiftSummary() {
  const { shift_details } = useRequestStore();
  const { t } = useTranslation();

  const defineStartsIn = () => {
    if (shift_details?.status === 'init') {
      return shift_details?.starts_in_raw < 0 ? t('Overdue') : shift_details?.starts_in;
    } else return t('Started');
  }
  return (
    <div className='w-full mt-1'>
      <div className='sub-title'>{t('Shift Summary')}</div>

      <div className='w-full py-s10 flex flex-col justify-start space-y-[6px]'>
        <SummaryInfoItem title={t('Starts In')} description={defineStartsIn()} />
        <SummaryInfoItem title={t('Start Date')} description={formatDate(shift_details?.start_date)} />

        <div className='flex flex-row justify-between items-center text-cMainBlack w-full my-[2px] space-x-4'>
          <div className='text-sm font-fw400 overflow-clip whitespace-nowrap w-full'>{t('Start Time')}</div>
          <div className={`text-sm font-fw600 overflow-clip whitespace-nowrap text-right truncate w-full`}>{shift_details?.start_time ? formatTime(shift_details?.start_time):"NA"}</div>
        </div>
      </div>
    </div>
  )
}
