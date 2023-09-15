/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import  { getProfileDetails } from '../../../../../app/stores/others/settingsStore';
import { iAddressBlack, iCvrBlack, iEmailBlack, iPhoneBlack, iWebsiteBlack } from '../../../../../app/utility/imageImports';
import { changePageTitle } from '../../../../../app/utility/utilityFunctions';
import Image from '../../../../../components/image/Image';
import RatingFiveStar from '../../../../../components/rating/RatingFiveStar';
import CommonSocialLinks from '../../../../../components/socialLinks/CommonSocialLinks';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../../../../app/stores/others/settingsStore';

const CompanyProfile = () => {

    const { profileDetails, termsData, setShowReviewModal } = useSettingsStore();

    const { t } = useTranslation();

    useEffect(() => {
        fetchProfileDetails();
        changePageTitle(t('Settings | Profile'));
    }, [])

    const fetchProfileDetails = async () => {
        await getProfileDetails();
    }

    return (

        <div>
            <div className='flex flex-col sm:flex-row sm:justify-between'>
                <div className={'text-fs28 text-cMainBlack limadi-regular'} > {t('Profile Details')}</div>
            </div>

            <div className='flex flex-row justify-start w-full mt-s8'>
                <div className='w-[185px] mr-4'>
                    <div className='flex flex-col items-center'>
                    <div className='max-w-[130px] min-w-[130px] h-[134px] border-2 border-cDisable rounded-full'>
                        <Image roundedFull={true} src={profileDetails?.image} className='w-[130px] h-[130px] rounded-full object-cover' alt="" />
                    </div>
                        <div className='flex justify-center'> <div className='flex flex-col break-all mt-s8'>
                            <div className='flex justify-center break-all text-fs16 text-cSecondaryTextColor font-fw600 mb-s4 text-center'>{profileDetails?.name}</div>
                            <div onClick={() => setShowReviewModal(true)} className='flex justify-center cursor-pointer'>
                                <RatingFiveStar rating={profileDetails?.rate ? parseFloat(profileDetails?.rate?.toFixed(1)) : 0} />
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* All SocialLinks */}
                    <div className='mt-s17'><CommonSocialLinks item={profileDetails?.social_media} /></div>
                </div>

                <div className='w-2/3'>
                    <div className=''>
                        <span className='text-fs24 font-fw600 text-cMainBlack'>{t("Contact Info")}</span>
                        <div className='text-fs14 font-fw400 text-cDarkGray mt-s13'>
                            <div className='flex items-center my-s1'>
                                <img className='mr-s8 w-s16 h-s16' src={iCvrBlack} alt="" />
                                {profileDetails?.cvr}
                            </div>

                            <div className='flex items-center mb-s1'>
                                <img className='mr-s8 w-s16 h-s16' src={iEmailBlack} alt="" />
                                <p className='break-all'>{profileDetails?.email}</p>
                            </div>

                            <div className='flex items-center'>
                                <img className='mr-s8 w-s16 h-s16' src={iPhoneBlack} alt="" />
                                {profileDetails?.phone ?

                                    <p
                                        onClick={() => {
                                            if (profileDetails?.phone) window.location = "tel:" + profileDetails?.phone;
                                        }}
                                        className='break-all' >
                                        {profileDetails?.phone} </p> : 'NA'}
                            </div>

                            <div className='flex my-s1'>
                                <img className='mr-s8' src={iAddressBlack} alt="" />
                                {profileDetails?.address ?
                                    <a target={'_blank'} rel='noreferrer'
                                        href={`http://maps.google.com/?q=${profileDetails?.address}`}>{profileDetails?.address}</a> : 'NA'}
                            </div>

                            <div className='flex items-center'>
                                <img className='mr-s8 w-s16 h-s16' src={iWebsiteBlack} alt="" />
                                {profileDetails?.website ? <a target={'_blank'}
                                    href={profileDetails?.website?.includes("http") ? profileDetails?.website : `https://${profileDetails?.website}`} rel='noreferrer'
                                    className='break-all cursor-pointer'>{profileDetails?.website}</a> : 'NA'}
                            </div>
                        </div>
                    </div>

                    <div className='my-s24'>
                        <div className='text-fs24 text-cMainBlack font-fw600 mb-s4'>{t("About Company")}</div>
                        <p className='custom-text text-fs14 text-cMainBlack font-fw400'>
                            {profileDetails?.about === "null" || profileDetails?.about === null ? 'NA' : profileDetails?.about}
                        </p>
                    </div>

                    <div>
                        <div className='text-fs24 text-cMainBlack font-fw600 mb-s4 '>{t("Company terms and conditions")}</div>
                        {termsData !== "<p><br></p>" ? <div className='break-all text-fs14 text-cMainBlack font-fw400'
                            dangerouslySetInnerHTML={{ __html: termsData }}
                        /> : 'NA'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;