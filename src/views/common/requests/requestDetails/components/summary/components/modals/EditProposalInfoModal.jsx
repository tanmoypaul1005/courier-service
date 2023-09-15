/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useRequestStore, { getRequestDetails, submitOrUpdateRequestInvitationBidding } from '../../../../../../../../app/stores/others/requestStore';
import CommonButton from '../../../../../../../../components/button/CommonButton';
import CommonInput from '../../../../../../../../components/input/CommonInput';
import CommonModal from '../../../../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

export default function EditProposalInfoModal({ showModal, setShowModal }) {
  const { place_bid_form, setPlaceBidForm, request_details, updatePlaceBidForm } = useRequestStore();
  const params = useParams();
  const { type, request_id } = params;
  const { t } = useTranslation();

  const submitForm = async (e) => {
    e.preventDefault();
    const success = await submitOrUpdateRequestInvitationBidding('update', request_details?.my_bid?.id);
    if (success) {
      setShowModal(false);
      getRequestDetails(type, request_id);
    }
  }


  useEffect(() => {
    updatePlaceBidForm({ budget: request_details?.my_bid?.budget, description: request_details?.my_bid?.details });
  }, [showModal])


  return (
    <div>
      <CommonModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={t("Update Proposal Info")}
        widthClass="w-[50vw]"
        mainContent={
          <>
            <form onSubmit={submitForm}>

              <div className='w-full pb-6 mt-4'>

                <CommonInput required={true} name={'budget'} value={place_bid_form?.budget} onChange={setPlaceBidForm} labelText={t('Budget')} className={'mb-2 mt-0'} type={'number'} max_input={8} show_asterisk={false} />
                <CommonInput required={true} className={'mt-0'} name={'description'} value={place_bid_form?.description} onChange={setPlaceBidForm} labelText={t('Description')} textarea={true} type={'text'} max_input={255} show_asterisk={false} />

              </div>

              <div className='flex flex-row justify-end items-center space-x-2 mt-4'>
                <CommonButton btnLabel={t('Submit')} type={'submit'} />
              </div>

            </form>

          </>
        }
      />
    </div>
  );
}
