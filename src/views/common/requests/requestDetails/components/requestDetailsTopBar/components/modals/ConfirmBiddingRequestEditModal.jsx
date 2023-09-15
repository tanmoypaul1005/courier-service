import React from 'react'
import CommonModal from '../../../../../../../../components/modal/CommonModal'
import CommonButton from '../../../../../../../../components/button/CommonButton'
import { useTranslation } from 'react-i18next';

export default function ConfirmBiddingRequestEditModal({ showModal, setShowModal, onConfirm }) {
  const { t } = useTranslation();
  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={t("Edit Request")}
      widthClass="w-[35vw]"
      mainContent={
        <>
          <div className='mt-s20 '>{t('Do you want to edit this request?')}</div>

          <div className='flex justify-end mt-s20'>
            <CommonButton onClick={onConfirm} btnLabel={t('Confirm')} width='w-[100px]' />
          </div>
        </>
      }
    />
  )
}
