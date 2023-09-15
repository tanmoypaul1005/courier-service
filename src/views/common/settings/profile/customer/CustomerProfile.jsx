/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useSettingsStore, { getProfileDetails } from '../../../../../app/stores/others/settingsStore';
import { iAddressBlack, iEmailBlack, iPhoneBlack } from '../../../../../app/utility/imageImports';
import { changePageTitle } from '../../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../../components/button/CommonButton';
import Image from '../../../../../components/image/Image';
import SettingsTitle from '../../SettingsTitle';
import { useTranslation } from 'react-i18next';

const CustomerProfile = () => {

    const { setShowProfileEditModal, profileDetails } = useSettingsStore();

    const { t } = useTranslation();

    useEffect(() => {
        fetchProfileDetails();
        changePageTitle(t('Settings | Profile'));
    }, [])

    const fetchProfileDetails = async () => {
        await getProfileDetails()
    }

    return (
        <>
            <SettingsTitle title={t("Profile Details")} />
            <div className='flex flex-col lg:flex-row sm:justify-between text-fs14 font-fw400 text-cDarkGray'>
                <div className='mr-s30 flex justify-center items-center '>
                    <div className="">

                        <div className='max-w-[160px] min-w-[160px] h-[164px] border-2 border-cDisable rounded-full'>
                            <Image src={profileDetails?.image} roundedFull={true} className='w-[160px] h-[160px]' />
                        </div>

                        <div className='flex justify-center items-center mt-s8'>
                            <div className='text-cMainBlack font-fw600 break-all text-center'>{profileDetails?.name}</div>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-s20 lg:mt-0'>
                    <span className='text-fs24 font-fw600 text-cMainBlack mb-s16'>
                        {t("Contact Info")}
                    </span>

                    <div className='my-s2 text-cDarkGray flex items-center'>
                        <img src={iEmailBlack} className="mr-s8 w-s16 h-s16" alt="" />
                        <p className='font-fw600'>{profileDetails?.email}</p>
                    </div>
                    <div className='text-cDarkGray flex items-center font-fw600'>
                        <img src={iPhoneBlack} className="mr-s8 w-s16 h-s16" alt="" />
                        {profileDetails?.phone ? profileDetails?.phone : 'NA'}
                    </div>
                    <div className='my-s2 text-cDarkGray flex items-center font-fw600'>
                        <img src={iAddressBlack} className="mr-s8 " alt="" />
                        {profileDetails?.address ?
                            <a target={'_blank'} rel='noreferrer'
                                href={`http://maps.google.com/?q=${profileDetails?.address}`}>{profileDetails?.address}</a> : 'NA'}
                    </div>

                    <div className='flex flex-col sm:flex-row sm:justify-end mt-s20'>
                        <div className=""><CommonButton onClick={() => { setShowProfileEditModal(true) }} btnLabel={t('Edit')} width='w-[100px]' /></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerProfile;