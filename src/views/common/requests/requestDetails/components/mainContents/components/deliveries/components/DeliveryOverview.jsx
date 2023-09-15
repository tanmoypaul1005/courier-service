import React from 'react'
import ImageViewer from '../../../../../../../../../components/image/ImageViewer'
import CommonViewComponent from '../../../../../../../../../components/viewer/CommonViewComponent'
import RequestDetailsTextTitle from '../../RequestDetailsTextTitle'
import { useTranslation } from 'react-i18next';

export default function DeliveryOverview({ stop, index }) {
  const { t } = useTranslation();

  return (
    <>
      <RequestDetailsTextTitle title={`${t('Delivery')} ${index + 1} ${t('Overview')}`} className={'text-fs16 font-fw500'} />

      <CommonViewComponent
        labelText={t('Driver Comment')}
        value={stop?.driver_comment ?? 'NA'}
        className='my-[20px]'
      />

      <div className='flex flex-row justify-start items-center my-s20 space-x-5'>

        {stop?.driver_attachment && <ImageViewer src={stop?.driver_attachment} label={t('Attachment')} />}
        {stop?.driver_signature && <ImageViewer src={stop?.driver_signature} label={t('Signature')} is_signature={true} />}

      </div>

    </>
  )
}
