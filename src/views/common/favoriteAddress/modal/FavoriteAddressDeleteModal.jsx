import React from 'react';
import useFavoriteAddressStore, { deleteFavoriteAddress } from '../../../../app/stores/others/favoriteAddressStore';
import CommonButton from '../../../../components/button/CommonButton';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const FavoriteAddressDeleteModal = () => {

    const {
        setShowFavoriteAddressDeleteModal,
        showFavoriteAddressDeleteModal,
        selectedFavoriteAddressDeleteId,
        setSelectedFavoriteAddressDeleteId,
        setShowFavoriteAddressDetailsModal
    } = useFavoriteAddressStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showFavoriteAddressDeleteModal}
                setShowModal={setShowFavoriteAddressDeleteModal}
                modalTitle={t("Delete Favorite Address")}
                mainContent={
                    <>
                        <div className='mt-s20 '>{t("Are you sure you want to delete this address?")}</div>

                        <div className='flex justify-end mt-s20'>
                            <CommonButton onClick={async () => {
                                const successDeleteFavAddress = await deleteFavoriteAddress(selectedFavoriteAddressDeleteId);

                                if (successDeleteFavAddress) {
                                    setShowFavoriteAddressDeleteModal(false);
                                    setTimeout(() => {
                                        setShowFavoriteAddressDetailsModal(false)
                                    }, 300);
                                    setSelectedFavoriteAddressDeleteId("")
                                }

                            }} btnLabel={t('Confirm')} colorType='danger' />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default FavoriteAddressDeleteModal;