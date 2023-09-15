import React from 'react'
import { useNavigate } from 'react-router-dom';
import useRequestStore, { requestAction } from '../../../../../../../../app/stores/others/requestStore';
import CommonButton from '../../../../../../../../components/button/CommonButton';
import CommonInput from '../../../../../../../../components/input/CommonInput';
import CommonModal from '../../../../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

export default function RequestActionsModal({ showModal, setShowModal, title, sub_title, request_id, action }) {
  const navigateTo = useNavigate();
  const [comment, setComment] = React.useState('');
  const { request_details } = useRequestStore();
  const { t } = useTranslation();

  const submitForm = async (e) => {
    e.preventDefault();
    const success = await requestAction(request_id, action, comment);
    if (success) setShowModal(false);
    navigateTo(-1);
    setComment('');
  }

  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={t(title)}
      widthClass="w-[50vw]"
      mainContent={
        <>
          <div className='mt-s20 pb-s10'>{sub_title}</div>

          <form onSubmit={submitForm}>

            {(action === 'delete' && request_details?.start_in > 2) ? <></> : <CommonInput className={'my-3'} name={'comment'} value={comment} onChange={(e) => setComment(e.target.value)} labelText={t('Reason')} textarea={true} type={'text'} max_input={255} required={true} show_asterisk={false} />}

            <div className='flex justify-end mt-s30'>
              <CommonButton onClick={async () => {

              }}
                btnLabel={t('Confirm')}
                colorType='danger'
                width='w-[100px]'
                type='submit'
              />

            </div>

          </form>
        </>
      }
    />
  )
}
