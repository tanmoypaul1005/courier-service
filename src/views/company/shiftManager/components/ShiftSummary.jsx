import React from 'react';
import useShiftStore from '../../../../app/stores/company/shiftStore';
import { formatDate, formatTimeHourMinutes } from '../../../../app/utility/utilityFunctions';
import SecondaryTitle from '../../../../components/title/SecondaryTitle';
import { useTranslation } from 'react-i18next';

//todo:: use summary component
const ShiftSummary = () => {

  const { shiftDetailsData } = useShiftStore();

  const { t } = useTranslation();

  return (
    <>
      <SecondaryTitle title='summary' />
      <div className='w-[400px] bg-cCommonListBG p-2.5 space-y-2'>
        <SummaryItem title={t('driver name')} data={shiftDetailsData?.driver_user?.name} />
        <SummaryItem title={t('license plate')} data={shiftDetailsData?.car?.car_license_plate_number} />
        <SummaryItem title={t('start date')} data={formatDate(shiftDetailsData?.start_date)} />
        <SummaryItem title={t('end date')} data={formatDate(shiftDetailsData?.end_date)} />
        <SummaryItem title={t('start time')} data={formatTimeHourMinutes(shiftDetailsData?.start_time ? shiftDetailsData?.start_time : "00:00:00") + ' - ' + formatTimeHourMinutes(shiftDetailsData?.end_time ? shiftDetailsData?.end_time : "00:00:00")} />
        <SummaryItem title={t('requests')} data={(shiftDetailsData?.length ?? 0) + ' requests'} />
        <SummaryItem title={t('stops')} data={(shiftDetailsData?.stops_count ?? 0) + ' stops'} />
        <SummaryItem title={t('packages')} data={(shiftDetailsData?.products_count ?? 0) + ' packages'} />

        {/* <div>
          <div className='font-medium'>Shift Instructions</div>
          <div className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam pariatur maxime nostrum architecto cupiditate mollitia beatae ea culpa id minima. Labore, dicta neque et quas iusto odit perferendis ullam quae?</div>
        </div> */}
      </div>
    </>
  )
}

export default ShiftSummary

const SummaryItem = ({ title = '', data = '' }) => {
  return (
    <div className='w-full flex items-center justify-between text-xs capitalize'>
      <div>{title}</div>
      <div className='font-semibold '>{data}</div>
    </div>
  )
}