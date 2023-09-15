import React from 'react'
import { iUserAvatar } from '../../../../../../../../../app/utility/imageImports'
import RequestDetailsTextTitle from '../../RequestDetailsTextTitle'
import { useTranslation } from 'react-i18next';
import Image from '../../../../../../../../../components/image/Image';

export default function CustomerProfile({ data }) {
  const { t } = useTranslation();
  return (
    <div className='border-cGrey border-[0.5px] p-3'>
      <div className='pb-s8'>  <RequestDetailsTextTitle title={t(`Customer Profile`)} /> </div>

      <div className='relative flex flex-row justify-between space-x-4  text-fs14 font-fw400'>
        <div className='relative flex flex-row items-center justify-start w-full space-x-3'>

          <Image className='object-cover rounded-full h-s60 w-s60' src={data?.image} dummyImage={iUserAvatar}/>

          <div className='flex flex-col items-start justify-start'>
            <div className='max-w-full whitespace-nowrap overflow-clip text-fs16 font-fw500'>{data?.name ?? 'NA'}</div>

            <div className='max-w-full whitespace-nowrap overflow-clip'>{data?.email ?? 'NA'}</div>

            <div className='max-w-full whitespace-nowrap overflow-clip'>{data?.phone ?? 'NA'}</div>
          </div>

        </div>

      </div>
    </div>
  )
}
