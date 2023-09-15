import React from 'react'
import { useTranslation } from 'react-i18next';

export default function SummaryInfoItem({ title = 'NA', description = 'NA', className, onClick }) {
  const { t } = useTranslation();
  return (
    <div className='flex flex-row justify-between items-center text-cMainBlack w-full my-[2px] space-x-4'>
      <div className='text-sm font-fw400 overflow-clip whitespace-nowrap w-full'>{t(title)}</div>
      <div title={t(description)} onClick={onClick} className={`text-sm font-fw600 overflow-clip whitespace-nowrap text-right truncate w-full ${className}`}>{description ?? 'NA'}</div>
    </div>
  )
}
