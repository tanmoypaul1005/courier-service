import React from 'react'
import { iGLobe } from '../../../../../../../app/utility/imageImports'
import { useTranslation } from 'react-i18next';

export default function SubmittedForGlobal() {
  const { t } = useTranslation();
  return (
    <div className='flex flex-row justify-start p-3 space-x-3 bg-cMainBlue rounded-br4 items-center'>
      <img src={iGLobe} alt="" srcset="" />

      <div className='flex flex-col items-start justify-center space-y-1'>
        <div className='text-cMainWhite text-fs16 font-fw600'>{t('Submitted For Global')}</div>
        <div className='text-cMainWhite text-fs11 font-fw400'>{t('This request will be available to all active companies within Limadi communities')}</div>
      </div>

    </div>
  )
}
