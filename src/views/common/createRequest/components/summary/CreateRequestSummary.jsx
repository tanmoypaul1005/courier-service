/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useCreateRequestStore, { generateCreateRequestSummaryContent, generateCreateRequestSummaryContent2 } from '../../../../../app/stores/others/createRequestStore';
import useGeneralStore from '../../../../../app/stores/others/generalStore';
import { create_request_steps, user_role as role } from '../../../../../app/utility/const'
import Summary from '../../../../../components/utility/summary/Summary'
import Actions from './components/Actions'
import BiddingOverview from './components/BiddingOverview';

export default function CreateRequestSummary() {

  const { user_role } = useGeneralStore();
  const { current_step,setCrFullForm,cr_form } = useCreateRequestStore();

  useEffect(() => {
    setCrFullForm({...cr_form,is_mass: false})
  }, [])

  return (
    <div className='min-w-[355px] max-w-[355px] mt-s14'>
      <Summary content={generateCreateRequestSummaryContent()} content2={generateCreateRequestSummaryContent2()} />

      {(role.company === user_role && current_step === create_request_steps.select_shift) && <BiddingOverview />}

      <Actions />

      {/* <button onClick={() => {
        console.log('clicked', useCreateRequestStore.getState().cr_form);
      }} >show form</button>
      <br /> */}

    </div >
  )
}
