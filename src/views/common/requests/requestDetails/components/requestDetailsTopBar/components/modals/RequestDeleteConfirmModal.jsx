import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRequest } from '../../../../../../../../app/stores/others/requestStore';
import CommonButton from '../../../../../../../../components/button/CommonButton';
import CommonModal from '../../../../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const RequestDeleteConfirmModal = ({ request_id, showModal, setShowModal }) => {
  const navigateTo = useNavigate();
  const { t } = useTranslation();


  return (
    <>
      <CommonModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={t("Delete Request")}
        widthClass="w-[50vw]"
        mainContent={
          <>
            <div className='mt-s20 '>{t('Do you want to delete this request?')}</div>

            <div className='flex justify-end mt-s20'>

              <CommonButton onClick={async () => {
                const success = await deleteRequest(request_id);
                if (success) setShowModal(false);
                navigateTo(-1);
              }}
                btnLabel={t('Delete')}
                colorType='danger'
                width='w-[100px]'
              />

            </div>
          </>
        }
      />
    </>
  );
};

export default RequestDeleteConfirmModal;