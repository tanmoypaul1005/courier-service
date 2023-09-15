import React from 'react'
import useCreateRequestStore from '../../../../../app/stores/others/createRequestStore'
import { create_request_steps } from '../../../../../app/utility/const';
import MassImport from './massImport/MassImport';
import PickupAndDeliveryForm from './pickupAndDeliveryForm/PickupAndDeliveryForm'
import SelectCompany from './selectCompany/SelectCompany';
import SelectShift from './selectShift/SelectShift';

export default function Content() {
  const { current_step } = useCreateRequestStore();

  return (
    <div className='w-[calc(100%-380px)] relative mt-s15'>

      {current_step === create_request_steps.pickup && <PickupAndDeliveryForm />}

      {current_step === create_request_steps.mass_import && <MassImport />}

      {current_step === create_request_steps.select_company && <SelectCompany />}

      {current_step === create_request_steps.select_shift && <SelectShift />}

    </div>

  )
}
