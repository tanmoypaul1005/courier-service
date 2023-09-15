import { Rating } from '@mui/material'
import React from 'react'
import { base_url_src } from '../../../../../../../../../app/utility/const'
import { iUserAvatar } from '../../../../../../../../../app/utility/imageImports'
import CommonViewComponent from '../../../../../../../../../components/viewer/CommonViewComponent'
import RequestDetailsTextTitle from '../../RequestDetailsTextTitle'
import { useTranslation } from 'react-i18next'
import useSettingsStore from '../../../../../../../../../app/stores/others/settingsStore'

export default function BiddingDetails({ data }) {
  const { awarded, awarded_company } = data;
  const { t } = useTranslation();

  const {setShowReviewModal,setSelectedCompanyId}=useSettingsStore();

  return (
    <div className='border-cGrey border-[0.5px] flex flex-col justify-start items-start p-3'>
      <div className=''>  <RequestDetailsTextTitle title={t(`Bidding Details`)} /> </div>

      <div className='flex flex-row justify-between space-x-1 relative text-fs14 font-fw400'>
        <div className='flex flex-row justify-start space-x-2  w-full relative'>
          <img
            className='rounded-full h-s50 w-s50 object-fill' src={awarded_company?.image ? (base_url_src + awarded_company?.image) : iUserAvatar} alt=""
            onError={(e) => { e.target.onerror = null; e.target.src = iUserAvatar; }}
          />

          <div className='flex flex-col justify-start items-start'>
            <div title={awarded_company?.name} className=' relative text-fs16 font-fw500 ml-1'>{awarded_company?.name ?? 'NA'}</div>
            <div 
            className='cursor-pointer'
              onClick={() => { setSelectedCompanyId(awarded_company?.id); setShowReviewModal(true) }}
            >
              <Rating
                name="size-large"
                size="medium"
                value={Math.round(awarded_company?.rate) ?? 0}
                readOnly={true}
                datatype={'number'}
              />
            </div>
          </div>
        </div>
      </div>



      <div className='my-2'>
        <CommonViewComponent
          labelText={t('Budget')}
          value={`DKK ${awarded?.budget?.toLocaleString("da-DK") ?? 'NA'}`}
        />
      </div>

      <CommonViewComponent
        labelText={t('Comment')}
        value={awarded?.details}
      />

    </div>
  )
}
