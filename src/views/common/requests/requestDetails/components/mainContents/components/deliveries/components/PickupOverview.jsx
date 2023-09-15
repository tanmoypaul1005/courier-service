import React from 'react'
import ImageViewer from '../../../../../../../../../components/image/ImageViewer'
import CommonViewComponent from '../../../../../../../../../components/viewer/CommonViewComponent'
import RequestDetailsTextTitle from '../../RequestDetailsTextTitle'
import { useTranslation } from 'react-i18next';

export default function PickupOverview({ comment, attachment, signature }) {
  const { t } = useTranslation();
  return (
    <>
      {
        (comment || attachment || signature) ? <>
          <RequestDetailsTextTitle title={t(`Pickup Overview`)} className={'text-fs16 font-fw500'} />

          <CommonViewComponent
            labelText={t('Driver Comment')}
            value={comment ?? 'NA'}
            className='my-[20px]'
          />

          <div className='flex flex-row justify-start items-center my-s20 space-x-5'>

            {attachment && <ImageViewer src={attachment} label={t('Attachment')} />}
            {signature && <ImageViewer src={signature} label={t('Signature')} is_signature={true} />}

          </div>

        </>
          :
          <></>
      }
    </>
  )
}
