import React from 'react'
import { useParams } from 'react-router-dom'
import { checkIsShowPickupOrDeliveryStatus, definePickupAndDeliveryStatus } from '../../../../../../../app/stores/others/requestStore'
import { formatDate, formatTime } from '../../../../../../../app/utility/utilityFunctions'
import ImageViewer from '../../../../../../../components/image/ImageViewer'
import CommonViewComponent from '../../../../../../../components/viewer/CommonViewComponent'
import RequestDetailsTextTitle from './RequestDetailsTextTitle'
import PickupOverview from './deliveries/components/PickupOverview'
import { useTranslation } from 'react-i18next'

export default function Pickup({ data }) {
  const params = useParams();
  const { type } = params;
  const { t } = useTranslation();

  return (
    <>
      <div className='space-y-2 w-[calc(100%-380px)]  border-cGrey border-[0.5px] p-3'>
        <RequestDetailsTextTitle
          title={t('Pickup Overview')}
          is_show_delivery_status={checkIsShowPickupOrDeliveryStatus(data?.pickup_status, type)}
          is_delivered={data?.pickup_status === 'delivered' ? true : false}
          status={data?.pickup_status}
          date_time={definePickupAndDeliveryStatus(data, 'pickup')}
        />

        <CommonViewComponent labelText={t('Title')} value={data?.title} />
        <CommonViewComponent labelText={t('Type of Transportation')} value={data?.transport_type} />
        <CommonViewComponent labelText={t('Pickup Address')} value={data?.pickup_address} />

        <CommonViewComponent labelText={t('Pickup Date')} value={formatDate(data?.pickup_date)} />
        <CommonViewComponent labelText={t('Pickup Time')} value={formatTime(data?.pickup_start_time)} />

        <CommonViewComponent labelText={t('Comment')} value={data?.pickup_comment ?? 'NA'} />

        {data?.pickup_attachment && <ImageViewer src={data?.pickup_attachment} label={t('Attachment')} />}

        {((type === 'on-going' || type === 'history' || type === 'completed')) &&
         <PickupOverview comment={data?.pickup_driver_comment} attachment={data?.pickup_driver_attachment} signature={data?.pickup_driver_signature} />}
      </div>
    </>
  )
}
