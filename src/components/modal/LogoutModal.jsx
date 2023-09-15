import React from 'react';
import { logout } from '../../app/stores/others/authStore';
import useUtilityStore from '../../app/stores/others/utilityStore';
import CommonButton from '../button/CommonButton';
import CommonModal from './CommonModal';
import { useTranslation } from 'react-i18next';

const LogoutModal = () => {

    const { showLogoutModal, setShowLogoutModal } = useUtilityStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showLogoutModal}
                setShowModal={setShowLogoutModal}
                modalTitle={t("Logout")}
                widthClass="w-[35vw]"
                mainContent={
                    <>
                        <div className='mt-s20 '>{t("Do you want to Logout")}?</div>

                        <div className='flex justify-end mt-s20'>
                            {/* <CommonButton onClick={() => {
                                setShowLogoutModal(false)
                            }} btnLabel='No' width='w-[100px]' /> */}

                            <CommonButton onClick={() => {
                                const success = logout()
                                if (success) {
                                    setShowLogoutModal(false)
                                }
                            }} btnLabel={t('Logout')} colorType='danger' width='w-[100px]' />
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default LogoutModal;