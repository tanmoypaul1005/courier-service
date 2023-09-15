import React from 'react'
import useCreateRequestStore from '../../../../../../../app/stores/others/createRequestStore';
import { iFullScreen } from '../../../../../../../app/utility/imageImports'
import { useTranslation } from 'react-i18next';

export default function TableHeader() {
  const { is_mass_import_form_fullscreen, setMassImportFormFullscreen } = useCreateRequestStore();
  const { t } = useTranslation();

  return (
    <div className='flex flex-row justify-between items-center w-full'>
      <div className='sub-title'>{t('Table')}</div>

      <img className='h-5 w-5 cursor-pointer' onClick={() => setMassImportFormFullscreen(!is_mass_import_form_fullscreen)} src={iFullScreen} alt="" srcset="" />

    </div>
  )
}
