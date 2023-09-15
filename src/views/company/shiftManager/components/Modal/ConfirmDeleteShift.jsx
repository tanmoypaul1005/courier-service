import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useShiftStore, { deleteShift } from '../../../../../app/stores/company/shiftStore'
import CommonButton from '../../../../../components/button/CommonButton';
import CommonModal from '../../../../../components/modal/CommonModal'
import { useTranslation } from 'react-i18next';

const ConfirmDeleteShift = () => {
    const { showDeleteShiftModal, setShowDeleteShiftModal } = useShiftStore();
    const { shift_id } = useParams();

    const navigateTo = useNavigate();
    const { t } = useTranslation ();

    return (
        <div>
            <CommonModal
                showModal={showDeleteShiftModal}
                setShowModal={setShowDeleteShiftModal}
                modalTitle={t('delete shift')}
                mainContent={
                    <>
                        <div className="pt-5">
                           {t("Are you sure you want to delete this shift?")}
                        </div>

                        <div className="pt-5 flex flex-row-reverse">
                            <CommonButton
                                colorType='danger'
                                btnLabel={t('Delete')} onClick={async () => {
                                    let delSuccess = await deleteShift(shift_id);
                                    if (delSuccess) {
                                        navigateTo('/shift-manager');
                                        setShowDeleteShiftModal(false);
                                    }
                                }} />
                        </div>
                    </>
                }
            />
        </div>
    )
}

export default ConfirmDeleteShift