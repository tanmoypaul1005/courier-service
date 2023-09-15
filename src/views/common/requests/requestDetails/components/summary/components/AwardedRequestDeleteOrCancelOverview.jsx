/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useGeneralStore from '../../../../../../../app/stores/others/generalStore';
import useRequestStore from '../../../../../../../app/stores/others/requestStore';
import { k_arcd_status, user_role as role } from '../../../../../../../app/utility/const';
import { formatDate } from '../../../../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../../../../components/button/CommonButton';
import RequestActionsModal from '../../requestDetailsTopBar/components/modals/RequestActionsModal';
import { useTranslation } from 'react-i18next';

export default function AwardedRequestDeleteOrCancelOverview() {

  const params = useParams();
  const { request_id } = params;
  const { user_role } = useGeneralStore();
  const { request_details } = useRequestStore();
  const { awarded } = request_details;
  const [request, setRequest] = useState({ title: '', comment: '', date: '' });
  const [reply, setReply] = useState({ title: '', comment: '', date: '' });
  const [show_request_actions_modal, setShowRequestActionsModal] = useState(false);
  const [action, setAction] = useState('');
  const [title, setTitle] = useState('');
  const [sub_title, setSubTitle] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (awarded?.status !== 'init') {
      switch (awarded?.status) {
        case k_arcd_status.cancel_req_customer:
          setRequest({ title: 'Cancel Request', comment: awarded?.dcr_comment, date: formatDate(awarded?.action_date) });
          setReply({ title: '', comment: '', date: '' });
          break;
        case k_arcd_status.delete_req_customer:
          setRequest({ title: 'Delete Request', comment: awarded?.dcr_comment, date: formatDate(awarded?.action_date) });
          setReply({ title: '', comment: '', date: '' });
          break;
        case k_arcd_status.cancel_req_company:
          setRequest({ title: 'Cancel Request', comment: awarded?.dcr_comment, date: formatDate(awarded?.action_date) });
          setReply({ title: '', comment: '', date: '' });
          break;
        case k_arcd_status.company_reject:
          setRequest({ title: 'Customer Request', comment: awarded?.dcr_comment, date: formatDate(awarded?.action_date) });
          setReply({ title: 'Company Disagreed', comment: awarded?.dcr_replay, date: formatDate(awarded?.replay_date) });
          break;
        case k_arcd_status.customer_reject:
          setRequest({ title: 'Company Request', comment: awarded?.dcr_comment, date: formatDate(awarded?.action_date) });
          setReply({ title: 'Customer Disagreed', comment: awarded?.dcr_replay, date: formatDate(awarded?.replay_date) });
          break;

        default:
          break;
      }

    } else if (awarded?.status !== 'init' && user_role === role.company) {


    }
  }, [request_details]);

  const defineStatus = () => {
    if (awarded?.status === k_arcd_status.cancel_req_company && user_role === role.company) return 'Waiting';
    else if ((awarded?.status === k_arcd_status.cancel_req_customer || awarded?.status === k_arcd_status.delete_req_customer) && user_role === role.customer) return 'Waiting';
    else return '';
  }

  const defineActionButtonVisibility = () => {
    if ((awarded?.status === k_arcd_status.cancel_req_customer || awarded?.status === k_arcd_status.delete_req_customer) && user_role === role.company) return true;
    else if ((awarded?.status === k_arcd_status.cancel_req_company) && user_role === role.customer) return true;
    else return false;
  }


  return (
    <>

      <div className='mt-5 p-3 border border-cMainBlue rounded flex flex-col items-start justify-start space-y-4'>

        <div className='w-full'>
          <div className='flex flex-row justify-between space-x-2 items-center w-full'>
            <div className='text-cMainBlack text-fs16 font-fw500'>{request?.title}</div>
            <div className='text-fs12 font-fw500'>
              {(awarded?.status === 'company_reject' || awarded?.status === 'customer_reject') ?
                <span className='text-cRed'>Disagreed</span> : <span className='text-cMainBlack'> {defineStatus()} </span>}
            </div>
          </div>

          <div className='flex flex-col items-start justify-start space-y-1 mt-1'>
            <div className='text-cGrey text-fs10 font-fw400'> {request?.date} </div>
            <div className='text-cMainBlack text-fs12 font-fw400'> {request?.comment} </div>
          </div>

          {
            defineActionButtonVisibility() &&
            <div className='flex flex-row justify-between space-x-2 mt-6 -mb-s17'>
              <CommonButton colorType='warning' btnLabel='Agree' className='h-s40' onClick={() => {
                setTitle('Agree');
                setSubTitle('Are you sure you want to agree on this?');
                setAction('agree_request');
                setShowRequestActionsModal(true);
              }} />

              <CommonButton colorType='danger' btnLabel='Disagree' className='h-s40' onClick={() => {
                setTitle('Disagree');
                setSubTitle('Are you sure you want to disagree on this?');
                setAction('disagree_request');
                setShowRequestActionsModal(true);
              }} />
            </div>
          }

        </div>

        {
          (awarded?.status === 'company_reject' || awarded?.status === 'customer_reject') &&
          <div className='-mb-s17'>
            <div className='flex flex-row justify-between space-x-2 items-center'>
              <div className='text-cMainBlack text-fs16 font-fw500'> {reply?.title} </div>
            </div>

            <div className='flex flex-col items-start justify-start space-y-1 mt-1'>
              <div className='text-cGrey text-fs10 font-fw400'> {reply?.date} </div>
              <div className='text-cMainBlack text-fs12 font-fw400'> {reply?.comment} </div>
            </div>
          </div>
        }


        {defineActionButtonVisibility() && <RequestActionsModal
          showModal={show_request_actions_modal}
          setShowModal={setShowRequestActionsModal}
          request_id={request_id}
          action={action}
          title={title}
          sub_title={sub_title}
        />}

      </div>
    </>
  )
}
