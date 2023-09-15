import React, { useEffect } from 'react'
import useRequestStore from '../../../../../../../app/stores/others/requestStore';
import CommonViewComponent from '../../../../../../../components/viewer/CommonViewComponent'
import EditProposalInfoModal from './modals/EditProposalInfoModal';
import { useTranslation } from 'react-i18next';

export default function ProposalInfo({ type, in_summary = true }) {
  const { request_details } = useRequestStore();
  const [showModal, setShowModal] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'in-bidding') return setEdit(true);
    else return setEdit(false);
  }, [type])


  return (
    <>

      <div className={`p-3 mt-5 ${!in_summary ? 'border-cGrey border-[0.5px]' : 'border border-cMainBlue rounded'}`}>

        <div className='flex flex-row justify-between space-x-2 text-fs16 font-fw500 mb-2'>
          <div className={`${in_summary ? 'text-cMainBlack' : 'sub-title'}`}>{t('Proposal Info')}</div>
          {edit && <div onClick={() => setShowModal(true)} className='text-cMainBlue cp'>{t('Edit')}</div>}
        </div>

        {in_summary ? <div className='flex flex-row justify-between space-x-2 text-fs14 text-cMainBlack font-fw400 mb-2'>
          <div className=''>Budget</div>
          <div className=''>DKK {request_details?.my_bid?.budget.toLocaleString("da-DK")}</div>
        </div>
          :
          <CommonViewComponent labelText={t('Budget')} value={`DKK ${request_details?.my_bid?.budget.toLocaleString("da-DK")}`} />
        }

        <CommonViewComponent labelText={t('Description')} value={request_details?.my_bid?.details ?? 'NA'} />

      </div>

      <EditProposalInfoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
