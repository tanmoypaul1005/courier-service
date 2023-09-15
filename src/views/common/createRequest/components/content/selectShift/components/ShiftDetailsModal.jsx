import React from 'react'
import useCreateRequestStore from '../../../../../../../app/stores/others/createRequestStore';
import useRequestStore from '../../../../../../../app/stores/others/requestStore';
import CommonModal from '../../../../../../../components/modal/CommonModal';
import FastAndAdvanceCalculations from '../../../../../../../components/modal/shiftDetailsAndPlanModal.jsx/components/FastAndAdvanceCalculations';
import ShiftSummary from '../../../../../../../components/modal/shiftDetailsAndPlanModal.jsx/components/ShiftSummary';
import Stops from '../../../../../../../components/modal/shiftDetailsAndPlanModal.jsx/components/Stops';
import { useTranslation } from 'react-i18next';

export default function ShiftDetailsModal({ showModal, setShowModal, selected_shift_index }) {
  const { available_shifts, is_fast_calculation } = useRequestStore();
  const { cr_form } = useCreateRequestStore();
  const { t } = useTranslation();

  return (
    <>
      <CommonModal
        heightMax='max-h-[calc(100vh-30px)]'
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={t('Shift Details')}
        widthClass='w-[65vw] max-w-[670px]'
        mainContent={
          <div className='pr-1 max-h-[calc(100vh-160px)] overflow-y-auto'>

            {
              (selected_shift_index !== null) &&
              <div className='w-full relative flex flex-col items-start space-y-7 pl-1'>
                <ShiftSummary />
                <FastAndAdvanceCalculations shift_id={available_shifts[selected_shift_index]?.id} p_request_id={cr_form?.id} />
              </div>
            }


            {!is_fast_calculation && <Stops />}


          </div>
        }
      />
    </>
  )
}
