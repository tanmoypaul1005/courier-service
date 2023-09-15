import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useCarStore, { updateOrApplyForLicense } from '../../../../app/stores/company/carStore';
import { getStringFromDateObject } from '../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import CommonDatePicker from '../../../../components/input/CommonDatePicker';
import CommonInput from '../../../../components/input/CommonInput';
import CommonModal from '../../../../components/modal/CommonModal';
import LicenseCard from '../LicenseCard';
import { useTranslation } from 'react-i18next';

const CarLicensePackageModal = () => {

    const {
        showCarLicensePackageModal,
        setShowCarLicensePackageModal,
        allCarLicenseList,
        carDetails,
        licenseAddUpdateForm,
        setLicenseAddUpdateForm,
        resetLicenseAddUpdateForm,
        carLicenseRenewID,
        showCarLicenseSkip,
        setShowCarLicenseSkip,
        newAddedCarID,
        setShowDetailsModal,
    } = useCarStore();
    const [selectedLicensePack, setSelectedLicensePack] = useState(0);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const { t } = useTranslation();

    const checkLicenseExists = (license_id) => {
        // return 
        return allCarLicenseList.find(license => license.id === license_id);
    }

    useEffect(() => {
        if (showCarLicensePackageModal) {
            setLicenseAddUpdateForm({
                ...licenseAddUpdateForm,
                id: newAddedCarID ? newAddedCarID : carDetails?.id,
                license_id: checkLicenseExists(carLicenseRenewID) ? carLicenseRenewID : allCarLicenseList[0]?.id,
                license_start: '',
                purchase_license_comment: '',
            });
            setTermsAccepted(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCarLicensePackageModal]);

    return (
        <div>
            <CommonModal
                showModal={showCarLicensePackageModal}
                setShowModal={setShowCarLicensePackageModal}
                modalOnHide={() => setShowCarLicenseSkip(false)}
                onCloseModal={() => {setShowDetailsModal(true)}}
                modalTitle={t("Choose License Package")}
                mainContent={
                    <>
                        <div
                            onClick={() => { console.log('licenseAddUpdateForm data:::', licenseAddUpdateForm); }}
                            className='mt-s20'
                        >
                            <div className='flex flex-col items-center space-y-5 overflow-x-auto pb-s10 md:flex-row md:justify-center md:space-y-0 md:space-x-5 '>

                                {
                                    allCarLicenseList.map((item, index) =>
                                        <LicenseCard
                                            key={index}
                                            onClick={() => {
                                                setSelectedLicensePack(index);
                                                setLicenseAddUpdateForm({ ...licenseAddUpdateForm, license_id: item?.id });
                                            }}
                                            active={licenseAddUpdateForm?.license_id === item?.id}
                                            number={item?.number}
                                            amount={item?.price}
                                        />
                                    )
                                }

                            </div>

                            <div className='font-fw500 text-fs24 text-cMainBlack mt-s10'>{t("License Description")}</div>
                            <div className='break-all font-fw640 text-fs14 text-cMainBlack mt-s4'>{allCarLicenseList[selectedLicensePack]?.description}</div>
                            <form onSubmit={(e) => e.preventDefault()} >
                                <div className='mb-s20 mt-s10'>
                                    <CommonDatePicker
                                        // onError={(error) => console.log(error)}
                                        label={t('License Start Date')}
                                        placeholder=''
                                        //required={true}
                                        autoFocus={false}
                                        value={licenseAddUpdateForm?.license_start}
                                        // value={licenseAddUpdateForm?.license_start === '' ? getStringFromDateObject(new Date()) : licenseAddUpdateForm?.license_start}
                                        allowPastDate={false}
                                        onChange={(e) => {
                                            // console.log('license start date', e);
                                            setLicenseAddUpdateForm({ ...licenseAddUpdateForm, license_start: getStringFromDateObject(e) });
                                        }}
                                    />
                                </div>
                                <div className='mb-s20'>

                                    <CommonInput
                                        labelText={t('Application Note')}
                                        value={licenseAddUpdateForm?.purchase_license_comment}
                                         textarea={true}
                                         max_input={255}
                                         onChange={(e) => {
                                            if (e.target.value !== " ") {
                                                const trimmedValue = e.target.value.replace(/\s+/g, " ");
                                                setLicenseAddUpdateForm({ ...licenseAddUpdateForm,
                                                    purchase_license_comment: trimmedValue });
                                            }

                                        }} />
                                </div>

                                <FormControlLabel
                                    control={
                                        <Checkbox defaultChecked={false} checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} required={true} />
                                    }
                                    label={
                                        <div>{t("I agree with all")} <a className='text-cMainBlue' href="https://limadi.dk/TermsAndCondition.html" target="_blank" rel="noopener noreferrer">{t("Terms & Conditions")}</a></div>
                                    }
                                />

                                <div className='flex items-center justify-end space-x-4'>
                                    {showCarLicenseSkip ? <CommonButtonOutlined onClick={() => { setShowCarLicensePackageModal(false) }} btnLabel={t('Skip')} /> : ""}

                                    <CommonButton
                                        onClick={async () => {
                                            // console.log('license add update form', licenseAddUpdateForm);
                                            let purchaseSuccess = false;
                                            if (licenseAddUpdateForm?.license_start && licenseAddUpdateForm?.license_id && termsAccepted)
                                                purchaseSuccess = await updateOrApplyForLicense(licenseAddUpdateForm, (showCarLicenseSkip === true || carDetails?.license_id === null) ? false : carDetails?.license_status === "expire_warning" ? true : false);

                                            if (purchaseSuccess) {
                                                setTermsAccepted(false);
                                                resetLicenseAddUpdateForm();
                                                setShowCarLicensePackageModal(false);
                                            }
                                        }}

                                        colorType={(licenseAddUpdateForm?.license_start && licenseAddUpdateForm?.license_id && termsAccepted && licenseAddUpdateForm?.purchase_license_comment) ? "primary" : "disable"}
                                        isDisabled={!(licenseAddUpdateForm?.license_start && licenseAddUpdateForm?.license_id && termsAccepted && licenseAddUpdateForm?.purchase_license_comment) ? true : false}
                                        type='submit'
                                        width="w-[170px]"
                                        btnLabel={t("Submit")}
                                    />
                                </div>
                            </form>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default CarLicensePackageModal;