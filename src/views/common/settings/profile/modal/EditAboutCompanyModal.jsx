import React, { useEffect } from 'react'
import { useState } from 'react';
import useSettingsStore from '../../../../../app/stores/others/settingsStore';
import CommonButton from '../../../../../components/button/CommonButton';
import CommonInput from '../../../../../components/input/CommonInput';
import CommonModal from '../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';


function EditAboutCompanyModal() {

    const { showAboutCompanyModal, setShowAboutCompanyModal, editCompanyProfile_form, setEditCompanyProfile_form, profileDetails } = useSettingsStore();

    const [about, setAbout] = useState("");

    const { t } = useTranslation();

    useEffect(() => {
        setAbout(profileDetails?.about ?? "")
    }, [profileDetails])


    return (
        <div>
            <CommonModal
                showModal={showAboutCompanyModal}
                setShowModal={setShowAboutCompanyModal}
                modalTitle={t("Edit About Company")}
                mainContent={
                    <>
                        <div className='mt-s20'>
                            <CommonInput
                                textarea={true}
                                labelText={t('About Company')}
                                name={'about'}
                                type='text'
                                max_input={255}
                                value={about}
                                onChange={(e) => {
                                    setAbout(e.target.value)
                                }}
                            />

                            <div className='flex justify-end mt-s50'>
                                <CommonButton
                                    isDisabled={about ? false : true}
                                    onClick={() => {
                                        setEditCompanyProfile_form({ ...editCompanyProfile_form, about: about })
                                        setShowAboutCompanyModal(false)
                                    }} btnLabel={t('Submit')} /></div>
                        </div>
                    </>
                }

            />
        </div>
    )
}

export default EditAboutCompanyModal;
