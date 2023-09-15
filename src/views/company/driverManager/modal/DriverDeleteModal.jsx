import React from 'react';
import useDriverStore, { deleteDriver } from '../../../../app/stores/company/driverStore';
import CommonButton from '../../../../components/button/CommonButton';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const DriverDeleteModal = () => {

    const { showDriverDeleteModal, setShowDriverDeleteModal, setSelectedDriverDeleteId, setShowDetailsModal } = useDriverStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showDriverDeleteModal}
                setShowModal={setShowDriverDeleteModal}
                modalTitle={t("Delete Driver")}
                mainContent={
                    <>
                        <div className='mt-s20'>{t("Are you sure you want to delete this driver account?")}</div>

                        <div className='flex justify-end mt-s20'>
                            <CommonButton onClick={async () => {
                                const success = await deleteDriver();
                                if (success) {
                                    setSelectedDriverDeleteId("")
                                    setShowDriverDeleteModal(false);
                                    setShowDetailsModal(false);
                                }

                            }} btnLabel={t('Confirm')} colorType='danger' />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default DriverDeleteModal;