import React from 'react'
import useCreateRequestStore from '../../../../../../../app/stores/others/createRequestStore';
import { iMassImportTable } from '../../../../../../../app/utility/imageImports';
import CommonButton from '../../../../../../../components/button/CommonButton';
import { user_role as role } from '../../../../../../../app/utility/const';
import useGeneralStore from '../../../../../../../app/stores/others/generalStore';
import { useTranslation } from 'react-i18next';


export default function InitialView() {
  const { setShowGenerateTableModal } = useCreateRequestStore();
  const { user_role } = useGeneralStore();
  const { t } = useTranslation();

  return (<div className='px-[60px] flex flex-col justify-center items-center py-24'>

    <img className='mb-5 opacity-30' src={iMassImportTable} alt="table" />

    <CommonButton
      onClick={() => setShowGenerateTableModal(true)}
      btnLabel={'Generate Table'}
      className='text-fs16 font-fw500'
    />

    <div className='text-cBodyText text-fs14 font-fw400 text-center mt-3'>
      {t('For massive upload please click on')} <span className='text-cMainBlack text-fs14 font-fw600'>{t('Generate Table')}</span> {t('button to create a custom table as you need. The table row is fixed in')} <span className='text-cMainBlack text-fs14 font-fw600'> {user_role === role.company ? 7 : 5} {t('COLUMNS')}</span>. {t('But you can add ROW’s as much as you need and can remove any ROW any time.')}
    </div>


  </div>)
}