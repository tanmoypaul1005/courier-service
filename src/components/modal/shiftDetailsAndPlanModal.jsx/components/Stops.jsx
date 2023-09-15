import React from 'react'
import useRequestStore from '../../../../app/stores/others/requestStore';
import { formatDateOrTime, calculateDistance } from '../../../../app/utility/utilityFunctions';
import CommonEmptyData from '../../../emptyData/CommonEmptyData';
import CommonStopsList from '../../../listItems/CommonStopsList'
import { useTranslation } from 'react-i18next';

export default function Stops() {
  const { advanceCalculationData } = useRequestStore();
  const { t } = useTranslation();

  return (
    <div>
      <div className='sub-title mb-3 mt-6'>Stops</div>
      <div className='grid grid-cols-1 lg-xl:gap-7 gap-y-7'>
        {
          advanceCalculationData?.stop_list?.length > 0 ?
            advanceCalculationData?.stop_list?.map((item, index) => (
              <div className='max-w-[535px] min-w-[535px]'>
              <CommonStopsList
                title={item?.stop_details?.title}
                subTitleOne={`${item?.stop_products} ${t('Packages')}`}
                subTitleTwo={`${item?.stop_details?.address}`}
                accentBorderType={'default'}
                routeType={item?.stop_details?.type}
                circleColorType={item?.is_time_fit ? 'warning' : 'danger'}
                count={item?.stop_index}
                time={item?.is_time_fit ? formatDateOrTime(item?.stop_approx_time) : '00:00'}
                totalKm={item?.is_time_fit ? (calculateDistance(item?.stop_distance).distance + ' ' + t(calculateDistance(item?.stop_distance).unit)) : '0 KM'}
                topRightComponent={!item?.is_time_fit ? t('Time Conflict') : ""}
                topRightComponentType={'danger'}
                title_max_width='500'
              />
              </div>
            ))
            :
            <CommonEmptyData title={t('No Stops Available')} />
        }
      </div>
    </div>
  )
}
