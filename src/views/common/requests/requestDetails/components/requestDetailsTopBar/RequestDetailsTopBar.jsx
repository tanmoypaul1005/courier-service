import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRequest } from "../../../../../../app/stores/others/createRequestStore";
import useGeneralStore from "../../../../../../app/stores/others/generalStore";
import useRequestStore, { setRequestDetailsPageTitle } from "../../../../../../app/stores/others/requestStore";
import { k_arcd_status, user_role as role } from "../../../../../../app/utility/const";
import { iShare, iShareBlue } from "../../../../../../app/utility/imageImports";
import { Toastr } from "../../../../../../app/utility/utilityFunctions";
import ActionButton from "../../../../../../components/button/ActionButton";
import CommonButton from "../../../../../../components/button/CommonButton";
import CommonButtonOutlined from "../../../../../../components/button/CommonButtonOutlined";
import ShiftDetailsAndPlanModal from "../../../../../../components/modal/shiftDetailsAndPlanModal.jsx/ShiftDetailsAndPlanModal";
import CommonTopTitleSection from "../../../../../../components/title/CommonTopTitleSection";
import AcknowledgeRequestModal from "../summary/components/modals/AcknowledgeRequestModal";
import CancelInBiddingRequest from "./components/modals/CancelInBiddingRequest";
import RatingAndReviewModal from "./components/modals/RatingAndReviewModal";
import RequestActionsModal from "./components/modals/RequestActionsModal";
import RequestDeleteConfirmModal from "./components/modals/RequestDeleteConfirmModal";
import ConfirmBiddingRequestEditModal from "./components/modals/ConfirmBiddingRequestEditModal";
import { useTranslation } from "react-i18next";

export default function RequestDetailsTopBar() {
  const params = useParams();
  const { request_id, type } = params;
  const navigateTo = useNavigate();
  const { user_role } = useGeneralStore();
  const { request_details } = useRequestStore();
  const { awarded } = request_details;
  const { t } = useTranslation();

  const [show_request_delete_confirm_modal, setShowRequestDeleteConfirmModal] = useState(false);
  const [show_delete_bidding_request_modal, setShowDeleteBiddingRequestModal] = useState(false);
  const [show_request_actions_modal, setShowRequestActionsModal] = useState(false);
  const [show_acknowledge_request_modal, setShowAcknowledgeRequestModal] = useState(false);
  const [show_rating_and_review_modal, setShowRatingAndReviewModal] = useState(false);
  const [show_edit_bidding_request_confirm_modal, setShowEditBiddingRequestConfirmModal] = useState(false);
  const [action, setAction] = useState('');
  const [title, setTitle] = useState('');
  const [sub_title, setSubTitle] = useState('');

  const start_time = request_details?.pickup_start_time;
  const end_time = request_details?.pickup_end_time;
  const start_date = request_details?.pickup_date;
  const [show_plan_tool_modal, setShowPlanToolModal] = useState(false);

  return (
    <>
      <CommonTopTitleSection
        title={`${setRequestDetailsPageTitle(type)} ${t('Request Details')}`}
        withBackLink={-1}
        rightSideComponent={
          <>
            {
              type === 'saved' && <div className='flex items-center space-x-3'>
                <CommonButtonOutlined onClick={() => setShowRequestDeleteConfirmModal(true)} btnLabel={t('Delete')} colorType='danger' />
                <CommonButton onClick={async () => {
                  navigateTo(`/request/edit/${request_id}`)
                }} btnLabel={t('Continue')} />
              </div>
            }

            {
              (user_role === role.company && type === 'in-bidding')
              && <CommonButton onClick={() => setShowDeleteBiddingRequestModal(true)} btnLabel={t('Cancel')} colorType='danger' />
            }

            {
              (user_role === role.customer && type === 'in-bidding') && <div className='flex flex-row items-center space-x-3'>
                <CommonButtonOutlined onClick={() => setShowRequestDeleteConfirmModal(true)} btnLabel={t('Delete')} colorType='danger' />
                <CommonButton onClick={() => { setShowEditBiddingRequestConfirmModal(true) }} btnLabel={t('Edit')} />
              </div>
            }

            {
              (user_role === role.customer && type === 'awarded') && request_details?.start_in >=2 ?
              <div className='flex items-center space-x-3'>
                {/* //todo:: implement share */}
                <ShareButton />

                <>
                  {
                    awarded?.status === k_arcd_status.init &&
                    <ActionButton
                      label={t("Actions")}
                      width="w-[105px]"
                      dataArray={[
                        {
                          title: t("Cancel"), action: () => {
                            setTitle(t('Cancel Request'));
                            setSubTitle(t('Are you sure want to cancel this request?'));
                            setAction(('cancel'));
                            setShowRequestActionsModal(true);
                          }
                        },
                        {
                          title: t("Delete"), action: () => {
                            setTitle(t('Delete Request'));
                            setSubTitle(t('Are you sure you want to delete this request?'));
                            setAction(('delete'));
                            setShowRequestActionsModal(true);
                          }
                        }
                      ]
                      }
                    />
                  }
                </>

              </div>:""
            }

            {
              (user_role === role.company && type === 'not-planned') ?
              <div className='flex items-center space-x-3'>

                {awarded?.status === k_arcd_status.init && request_details?.start_in >=2  && <CommonButtonOutlined onClick={() => {
                  setTitle(t('Cancel Request'));
                  setSubTitle(t('Are you sure want to cancel this request?'));
                  setAction(('reject'));
                  setShowRequestActionsModal(true);
                }} btnLabel={t('Cancel')} colorType="danger" />}

                {awarded?.status === k_arcd_status.init && <CommonButton onClick={() => { setShowPlanToolModal(true) }} btnLabel={t('Plan Tool')} />}

              </div>: ""
            }

            {
              (user_role === role.company && type === 'awarded') &&
              <div className='flex items-center space-x-3'>
                {/* //todo:: implement share */}
                <ShareButton />

                {(awarded?.status === k_arcd_status.init && request_details?.user?.role !== role.company) 
                && request_details?.start_in >= 2 && request_details?.user?.role === "private"  ?
                  <CommonButtonOutlined onClick={() => {
                    setTitle(t('Cancel Request'));
                    setSubTitle(t('Are you sure want to cancel this request?'));
                    setAction(('reject'));
                    setShowRequestActionsModal(true);
                  }} btnLabel={t('Cancel')} colorType="danger" />:""
                }

                {awarded?.status === k_arcd_status.init && request_details?.user?.role === role.company &&
                  <ActionButton
                    label={t("Actions")}
                    width="w-[105px]"
                    dataArray={[
                      {
                        title: t("Edit"), action: async () => {
                          const res = await editRequest(request_id);
                          res && navigateTo(`/request/edit/${request_id}`)
                        }
                      },
                      {
                        title: t("Delete"), action: () => {
                          setShowRequestDeleteConfirmModal(true);
                        }
                      }
                    ]
                    }
                  />
                }

              </div>
            }

            {/* //todo:: implement share */}
            {type === 'on-going' && <ShareButton />}

            {
              (user_role === role.company && type === 'completed') &&
              <div className='flex items-center space-x-3'>
                {/* //todo:: implement share */}
                <ShareOutLineButton />

                <CommonButton btnLabel={t("Acknowledge")} onClick={() => setShowAcknowledgeRequestModal(true)} />

              </div>
            }

            {(user_role === role.company && type === 'history') && <ShareButton />}

            {(user_role === role.customer && type === 'history' && request_details?.status === 'complete') && <ShareButton />}
            {(user_role === role.customer && type === 'history' && request_details?.status === 'history' && request_details?.is_rated) ? <ShareButton /> : <></>}

            {
              (user_role === role.customer && type === 'history' && !request_details?.is_rated && request_details?.status === 'history') &&
              <div className='flex items-center space-x-3'>
                {/* //todo:: implement share */}
                <ShareOutLineButton />

                <CommonButton btnLabel={t("Review")} onClick={() => setShowRatingAndReviewModal(true)} />

              </div>
            }
          </>
        }
      />

      <RequestDeleteConfirmModal showModal={show_request_delete_confirm_modal} setShowModal={setShowRequestDeleteConfirmModal} request_id={request_id} />
      <CancelInBiddingRequest showModal={show_delete_bidding_request_modal} setShowModal={setShowDeleteBiddingRequestModal} request_id={request_id} />

      <RequestActionsModal
        showModal={show_request_actions_modal}
        setShowModal={setShowRequestActionsModal}
        request_id={request_id}
        action={action}
        title={title}
        sub_title={sub_title}
      />

      <AcknowledgeRequestModal
        showModal={show_acknowledge_request_modal}
        setShowModal={setShowAcknowledgeRequestModal}
        request_id={request_id}
      />

      <RatingAndReviewModal
        showModal={show_rating_and_review_modal}
        setShowModal={setShowRatingAndReviewModal}
        request_id={request_id}
      />

      {(start_time && start_date && end_time) && <ShiftDetailsAndPlanModal
        title={t('Plan Tool')}
        showModal={show_plan_tool_modal}
        setShowModal={setShowPlanToolModal}
        start_time={start_time}
        end_time={end_time}
        start_date={start_date}
        request_id={request_id}
        set_plan={true}
      />}

      <ConfirmBiddingRequestEditModal showModal={show_edit_bidding_request_confirm_modal} setShowModal={setShowEditBiddingRequestConfirmModal} onConfirm={async () => {
        const res = await editRequest(request_id);
        res && navigateTo(`/request/edit/${request_id}`)
      }} />



    </>
  )
}


const ShareButton = () => {
  const { t } = useTranslation();
  return (
    <CommonButton onClick={() => { Toastr({ message: t('Coming soon'), type: 'info' }); }} btnLabel={t('Share')} icon={iShare} />
  );
}

const ShareOutLineButton = () => {
  const { t } = useTranslation();
  return (
    <CommonButtonOutlined onClick={() => { Toastr({ message: t('Coming soon'), type: 'info' }); }} btnLabel={t('Share')} iconLeft={iShare} iconLeftHover={iShareBlue} />
  );
}