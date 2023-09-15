import React from 'react';
import useCarStore, { deleteCar } from '../../../../app/stores/company/carStore';
import CommonButton from '../../../../components/button/CommonButton';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const CarDeleteModal = () => {

    const { showCarDeleteModal, setShowCarDeleteModal, carDetails, setShowEditCarModal } = useCarStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showCarDeleteModal}
                setShowModal={setShowCarDeleteModal}
                modalTitle={t("Delete Car")}
                mainContent={
                    <>
                        <div className='mt-s20'>{t("Are you sure you want to delete this car?")}</div>

                        <div className='flex justify-end mt-s20'>
                            <CommonButton
                                onClick={async () => {
                                    let delSuccess = await deleteCar(carDetails?.id);
                                    if (delSuccess) { setShowCarDeleteModal(false); setShowEditCarModal(false); }
                                }}
                                btnLabel={t('Confirm')}
                                colorType='danger'
                            />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default CarDeleteModal;