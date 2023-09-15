import React from 'react'
import useCreateRequestStore, { clearCrForm, saveRequest } from '../../../../../../app/stores/others/createRequestStore';
import CommonButton from '../../../../../../components/button/CommonButton';
import ActionButton from '../../../../../../components/button/ActionButton';
import { create_request_steps, create_request_type, k_cr_actions } from '../../../../../../app/utility/const';
import { iMassImport } from '../../../../../../app/utility/imageImports';
import { deleteRequest } from '../../../../../../app/stores/others/requestStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../../../../../app/stores/others/settingsStore';

export default function Actions() {
  const { request_type, setCreateRequestType, current_step, cr_form, resetCreateRequest, setCurrentSetup, changeCrForm } = useCreateRequestStore();
  const navigateTo = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { app_lang_code } = useSettingsStore()


  const actionDataArray = cr_form?.id ? [
    { title: t('Save'), action: () => saveRequest(k_cr_actions.save) },
    { title: t('Clear'), action: () => clearCrForm() },
    {
      title: t('Delete'), action: async () => {
        const res = await deleteRequest(cr_form?.id);
        if (res) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setCurrentSetup(create_request_steps.pickup);
          resetCreateRequest();
          navigateTo('/request/create');
        }
      }
    }
  ] : [
    { title: t('Save'), action: () => saveRequest(k_cr_actions.save) },
    { title: t('Clear'), action: () => clearCrForm() },
  ];

  return (
    <div className='flex flex-row justify-end space-x-3'>
      {
        request_type === create_request_type.normal ?
          ((current_step === create_request_steps.pickup) && (location.pathname.includes('/request/create'))) &&
          <CommonButton
            btnLabel={t('Mass Import')}
            icon={iMassImport}
            mediumSize={true}
            onClick={() => {
              if (request_type === create_request_type.normal) {
                setCreateRequestType(create_request_type.mass_import);
                changeCrForm('is_mass', 1);
              }

              if (request_type === create_request_type.mass_import) {
                setCreateRequestType(create_request_type.normal);
                changeCrForm('is_mass', 0);
              }

            }}
            colorType={(request_type === create_request_type.normal && current_step === create_request_steps.pickup) ? 'primary' : 'basic'}
          /> : ""}
      {
        request_type === create_request_type.mass_import ?
          ((current_step === create_request_steps.pickup) && (location.pathname.includes('/request/create'))) &&
          <CommonButton
            onClick={() => {
              setCurrentSetup(create_request_steps.pickup)
              setCreateRequestType(create_request_type.normal);
              changeCrForm('is_mass', 0);
            }}
            btnLabel={t('Standard request')} /> : ""
      }

      <ActionButton
        width={app_lang_code === 'en' ? 'w-[100px]' : 'w-[125px]'}
        label={t('Actions')}
        dataArray={actionDataArray}
      />
    </div>
  )
}
