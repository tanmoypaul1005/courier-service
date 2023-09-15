import React from 'react';
import useFavoriteCompaniesStore, { addFavoriteCompany } from '../../../../app/stores/customer/favoriteCompaniesStore';
import CommonButton from '../../../../components/button/CommonButton';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const RemoveFavoriteCompanyModal = () => {

    const { setShowFavCompanyModal, setShowRemoveFavoriteCompanyModal, showRemoveFavoriteCompanyModal, setSelectedNotFavId } = useFavoriteCompaniesStore()

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showRemoveFavoriteCompanyModal}
                setShowModal={setShowRemoveFavoriteCompanyModal}
                modalTitle={t("Confirmation")}
                mainContent={
                    <>
                        <div className='my-s20'>{t("Are you sure you want to remove this company from favorite?")}</div>
                        <div className='flex justify-end'>
                            <CommonButton colorType="danger" btnLabel={t('Confirm')}
                                onClick={async () => {
                                    const success = await addFavoriteCompany();
                                    if (success) {
                                        setSelectedNotFavId(null)
                                        setShowRemoveFavoriteCompanyModal(false);
                                        setTimeout(() => {
                                            setShowFavCompanyModal(false)
                                        }, 300);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default RemoveFavoriteCompanyModal;