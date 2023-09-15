import React from 'react'
import { useNavigate } from 'react-router-dom';
import useCreateRequestStore, { countAllStopsProducts, saveRequest } from '../../../../app/stores/others/createRequestStore';
import useGeneralStore from '../../../../app/stores/others/generalStore';
import { create_request_type, k_cr_actions, user_role as role } from '../../../../app/utility/const';
import { formatDate, formatTime } from '../../../../app/utility/utilityFunctions';
import SlideToSubmit from '../../../../components/input/SlideToSubmit';
import CommonModal from '../../../../components/modal/CommonModal'
import SummaryInfoItem from '../../../../components/utility/summary/components/SummaryInfoItem';
import { useTranslation } from 'react-i18next';
import SliderToSubmit from '../../../../components/input/SliderToSubmit';

export default function RequestConfirmModal() {
  const { is_show_request_confirm_modal, setShowRequestConfirmModal, request_type, cr_form } = useCreateRequestStore();
  const { user_role } = useGeneralStore();
  const navigateTo = useNavigate();
  const { t } = useTranslation();


  return (
    <CommonModal
      showModal={is_show_request_confirm_modal}
      setShowModal={setShowRequestConfirmModal}
      widthClass='w-[65vw] max-w-[670px]'
      modalTitle={`${t('Create Request')} (${request_type === create_request_type.normal ? '3 of 3' : '4 of 4'})`}
      mainContent={
        <>
          <div className='mt-s12'>
            <div className='font-fw500 text-fs24 text-cMainBlack'>{t('Summary')}</div>

            <div className='w-full py-s10 flex flex-col justify-start space-y-[6px]'>
              <SummaryInfoItem title={t('Title')} description={cr_form?.title} />
              <SummaryInfoItem title={t('Transportation')} description={cr_form?.transport_type} />
              <SummaryInfoItem title={t('Pickup Date')} description={formatDate(cr_form?.pickup_date)} />
              <SummaryInfoItem title={t('Pickup Time')} description={(formatTime(cr_form?.pickup_start_time) ?? '--') + ' - ' + (formatTime(cr_form?.pickup_end_time) ?? '--')} />
              <SummaryInfoItem title={t('Delivery Overview')} description={`${cr_form?.stops?.length} ${t('Stops')} (${countAllStopsProducts(cr_form?.stops)} ${t('Packages')})`} />
              <hr />

              {user_role === role.company ? <>
                <SummaryInfoItem title={t('Driver Name')} description={cr_form?.shift_plan?.driver_user?.name} />
                <SummaryInfoItem title={t('Vehicle Number')} description={cr_form?.shift_plan?.car?.car_license_plate_number} />
              </> : <></>}

              {user_role === role.customer ? <>
                <SummaryInfoItem title={t('Direct Invite')} description={cr_form?.invitation_ids?.length ?? 0} />
                <SummaryInfoItem title={t('Global Invite')} description={cr_form?.is_global ? t('Submitted') : t('Not Submitted')} />
              </> : <></>}

            </div>

            <div className='mt-s6'>

              <SliderToSubmit width={630} onSubmission={async (data) => {
                if (data) {
                  const res = await saveRequest(k_cr_actions.submit);
                  setShowRequestConfirmModal(false);

                  if (res) {
                    if (user_role === role.company) navigateTo('/requests/awarded');
                    if (user_role === role.customer) navigateTo('/requests/in-bidding');
                    setTimeout(() => {
                      window.scrollTo({
                        top: document.documentElement.scrollHeight - window.innerHeight,
                        behavior: "smooth"
                      });
                    }, 1000);
                  }
                }

              }} />
            </div>
          </div>
        </>
      }

    />
  )
}
