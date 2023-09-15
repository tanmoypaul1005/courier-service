import React, { useEffect, useState } from 'react';
import useCarStore from '../../../app/stores/company/carStore';
import { iCar } from '../../../app/utility/imageImports';
import { formatDate } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../components/button/CommonButtonOutlined';
import Image from '../../../components/image/Image';
import { useTranslation } from 'react-i18next';

const CarDetails = () => {

    const { setShowEditCarModal, setShowCarLicensePackageModal, carDetails, setCarLicenseRenewID } = useCarStore();

    const [textColor, setTextColor] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        switch (carDetails?.license_status) {
            case 'expired':
                setTextColor('text-cRed');
                break;
            case 'rejected':
                setTextColor('text-cRed');
                break;
            case 'no_license':
                setTextColor('text-cRed');
                break;

            case 'pending':
                setTextColor('text-cBrand');
                break;
            case 'expire_warning':
                setTextColor('text-cBrand');
                break;
            case 'processing':
                setTextColor('text-cBrand');
                break;
            case 'active':
                setTextColor('text-cSuccess');
                break;

            default:
                break;
        }
    }, [carDetails?.license_status]);

    return (
        <>{!carDetails ?
            <div className='flex items-center justify-center h-[20vh] text-xl'>
                {t("Select list item to view details.")}
            </div>
            :
            <div
                onClick={() => { console.log('car details', carDetails); }}
                className=''>
                <div className='flex items-baseline space-x-1'>
                    <span className='text-cMainBlack text-fs24 font-fw600'>{t("Car Details")}</span>

                    <div className={`${textColor} text-base font-fw600 capitalize`}>
                        ({carDetails?.license_status === 'no_license' ? 'No License' : carDetails?.license_status === "expire_warning" ? "about to expire" : carDetails?.license_status})
                    </div>
                </div>


                <div className='flex flex-wrap md:flex-nowrap mt-s16'>
                    <div className='max-w-[160px] min-w-[160px]'>
                        <Image dummyImage={iCar} src={carDetails?.image} roundedFull={true} className='w-[160px] h-[160px]' />
                    </div>


                    <div className="w-full mt-s20 md:mt-0 md:ml-s30">

                        {carDetails?.license_name ?
                            <div className='pb-4'>
                                <div className='text-cMainBlack text-fs24 font-fw600'>{t("License info")}</div>
                                <div className='text-cMainBlack text-fs14'>
                                    <span className='font-fw600'>{t("License Name")}: </span>
                                    <span className='font-fw500'>{carDetails?.license_name ? carDetails?.license_name : 'NA'}</span>
                                </div>
                                <div className='text-cMainBlack text-fs14 my-s2'>
                                    <span className='font-fw600'>{t("License Active On")}: </span>
                                    <span className='font-fw500'>{carDetails?.license_start_raw ? 
                                    formatDate(carDetails?.license_start_raw) : 'NA'}</span>
                                </div>

                                <div className='flex items-center text-cMainBlack text-fs14'>
                                    <div className='font-fw600'>{t("License Expire On")}: </div>
                                    <div className='font-fw500 pl-1'>{carDetails?.license_end_raw? 
                                    formatDate(carDetails?.license_end_raw) : 'NA'}</div>
                                    {/* {carDetails?.license_status === 'expire_warning' ?
                                            <div className='flex items-center pl-3'>
                                                <div onClick={() => setShowCarLicensePackageModal(true)} className='text-cBrand font-semibold drop-shadow-sm cursor-pointer select-none'>
                                                    Renew license!
                                                </div>
                                            </div> : ""} */}
                                </div>
                                {/* <div className='text-cMainBlack text-fs14 mt-s2'>
                                <span className='font-fw600'>Application Note : </span>
                                <span className='font-fw500'>{carDetails?.license_description ? carDetails?.license_description : 'NA'}</span>
                            </div> */}
                            </div>
                            : ""
                        }

                        <div>
                            <div className='text-cMainBlack text-fs24 font-fw600 mb-s8'>{t("Basic Info")}</div>

                            <div className='text-cMainBlack text-fs14 mb-s2'>
                                <span className='font-fw600'>{t("Car Name")}: </span>
                                <span className='font-fw500 break-all '>{carDetails?.name ? carDetails?.name : 'NA'}</span>
                            </div>

                            <div className='text-cMainBlack text-fs14'>
                                <span className='font-fw600'>{t("License Plate")}: </span>
                                <span className='font-fw500'>{carDetails?.car_license_plate_number ? carDetails?.car_license_plate_number : 'NA'}</span>
                            </div>

                            <div className='text-cMainBlack text-fs14'>
                                <span className='font-fw600'>{t("Car Specification")}: </span>
                                <span className='font-fw500 break-all'>{carDetails?.comment ?? 'NA'}</span>
                            </div>
                        </div>


                        <div className='flex flex-row items-center justify-end space-x-3 mt-s20'>

                            {/*b             edit button */}
                            <div>
                                {carDetails?.license_status === 'active' || carDetails?.license_status === 'processing' ?
                                    <CommonButton
                                        onClick={() => { setShowEditCarModal(true) }}
                                        btnLabel={t('Edit')}
                                        width='w-[100px]'
                                    />
                                    :
                                    <CommonButtonOutlined
                                        btnLabel={t('Edit')}
                                        width='w-[100px]'
                                        onClick={() => { setShowEditCarModal(true) }}
                                    />
                                }
                            </div>

                            {/*e         license button */}
                            <div>
                                {
                                    carDetails?.license_status === 'expire_warning' || carDetails?.license_status === 'expired' ?
                                        <CommonButton
                                            onClick={() => {
                                                setShowCarLicensePackageModal(true);
                                                setCarLicenseRenewID(carDetails?.license_id);
                                            }}
                                            btnLabel={t('Renew License')}
                                        />
                                        : carDetails?.license_status === 'no_license' ?
                                            <CommonButton
                                                onClick={() => {
                                                    setShowCarLicensePackageModal(true);
                                                    setCarLicenseRenewID(carDetails?.license_id);
                                                }}
                                                btnLabel={t('Apply for License')}
                                            />
                                            : carDetails?.license_status === 'rejected' ?
                                                <CommonButton
                                                    onClick={() => {
                                                        setShowCarLicensePackageModal(true);
                                                        setCarLicenseRenewID(carDetails?.license_id);
                                                    }}
                                                    btnLabel={t('Apply Again')}
                                                />
                                                : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default CarDetails;