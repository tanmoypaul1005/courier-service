import React, { useEffect, useState } from 'react'
import useCreateRequestStore from '../../../../../app/stores/others/createRequestStore';
import { create_request_steps, create_request_type } from '../../../../../app/utility/const';
import Actions from './components/Actions'
import { useTranslation } from 'react-i18next';

export default function TitleAndActions() {

  const [step, setStep] = useState('(1 of 3)');
  const { request_type, current_step } = useCreateRequestStore();
  const { t } = useTranslation();


  useEffect(() => {
    switch (true) {
      case (request_type === create_request_type.normal && current_step === create_request_steps.pickup):
        setStep('(1 of 3)');
        break;

      case (request_type === create_request_type.normal && current_step === create_request_steps.select_company):
        setStep('(2 of 3)');
        break;
      case (request_type === create_request_type.normal && current_step === create_request_steps.select_shift):
        setStep('(2 of 3)');
        break;

      case (request_type === create_request_type.mass_import && current_step === create_request_steps.pickup):
        setStep('(1 of 4)');
        break;

      case (request_type === create_request_type.mass_import && current_step === create_request_steps.mass_import):
        setStep('(2 of 4)');
        break;

      case (request_type === create_request_type.mass_import && current_step === create_request_steps.select_company):
        setStep('(3 of 4)');
        break;

      case (request_type === create_request_type.mass_import && current_step === create_request_steps.select_shift):
        setStep('(3 of 4)');
        break;

      default:
        setStep('(1 of 3)');
        break;
    }

  }, [request_type, current_step])


  return (
    <div className={`bg-[#fffffa] h-auto flex flex-row justify-between space-x-10 items-center z-[11] mb-s8`}>

      <div className='title flex flex-row justify-start space-x-2 items-center '>
        {request_type === create_request_type.normal ? t('Create Request') : t('Mass Import')}<span className='text-fs16 ml-2'>{step}</span>
      </div>

      <Actions />

    </div>
  )
}
