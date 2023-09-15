import { Rating } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useRequestStore, { writeReview } from '../../../../../../../../app/stores/others/requestStore';
import CommonButton from '../../../../../../../../components/button/CommonButton';
import CommonInput from '../../../../../../../../components/input/CommonInput';
import CommonModal from '../../../../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

export default function RatingAndReviewModal({ showModal, setShowModal, request_id }) {
  const navigateTo = useNavigate();
  const [comment, setComment] = useState('');
  const { request_details } = useRequestStore();
  const [rating, setRating] = useState(1);
  const { t } = useTranslation();

  const submitForm = async (e) => {
    e.preventDefault();
    // console.log('data', rating, comment);
    // return;
    const success = await writeReview(request_id, request_details?.awarded?.company_user_id, rating, comment); //id, reqData.awarded.company_user_id, rating, review
    if (success) setShowModal(false);
    navigateTo(-1);
    setComment('');
  }



  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={t("Rate Our Company")}
      widthClass="w-[50vw]"
      mainContent={
        <>
          <div className='mt-s20 pb-s10'>{t('We Love to hear from you! How is your experience?')}</div>

          <form onSubmit={submitForm}>

            <div className='flex justify-center mb-5'>
              <Rating
                name="size-large"
                size="large"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
              />

            </div>

            <CommonInput className={'my-3'} name={'comment'} value={comment} onChange={(e) => setComment(e.target.value)} labelText={t('Review')} textarea={true} type={'text'} max_input={255} required={false} rows={3} max_rows={5} show_asterisk={false} />

            <div className='flex justify-end mt-s30'>
              <CommonButton onClick={async () => {

              }}
                btnLabel={t('Submit')}
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
