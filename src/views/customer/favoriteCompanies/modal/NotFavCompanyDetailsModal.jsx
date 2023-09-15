import React from 'react';
import useFavoriteCompaniesStore from '../../../../app/stores/customer/favoriteCompaniesStore';
import { iAddressBlack, iCvrBlack, iEmailBlack, iFavCompanyGray, iPhoneBlack, iWebsiteBlack } from '../../../../app/utility/imageImports';
import Image from '../../../../components/image/Image';
import CommonModal from '../../../../components/modal/CommonModal';
import RatingFiveStar from '../../../../components/rating/RatingFiveStar';
import CommonSocialLinks from '../../../../components/socialLinks/CommonSocialLinks';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../../../app/stores/others/settingsStore';

const NotFavCompanyDetailsModal = () => {

    const { setShowCompanyDetailsModal, showCompanyDetailsModal, notFavoriteCompanyDetails } = useFavoriteCompaniesStore();

    const {setShowReviewModal,setSelectedCompanyId}=useSettingsStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showCompanyDetailsModal}
                setShowModal={setShowCompanyDetailsModal}
                modalTitle={t("Company Details")}
                mainContent={
                    <>
                        <div>
                            {notFavoriteCompanyDetails?.cvr ? <div>

                                <div className='flex flex-wrap md:flex-nowrap mt-s16'>
                                    <div className=''>
                                        <div className='flex-col mr-s30'>
                                            <Image src={notFavoriteCompanyDetails?.image} dummyImage={iFavCompanyGray} className=' max-w-[160px] min-w-[160px] h-s160 rounded-full object-cover' alt="" />

                                            <div className='flex justify-center'> <div className='flex flex-col mt-s8'>
                                                <div className='flex justify-center text-fs16 text-cSecondaryTextColor font-fw600 mb-s4'>
                                                    {notFavoriteCompanyDetails?.name ? notFavoriteCompanyDetails?.name : 'NA'}</div>
                                                <div onClick={()=>{setSelectedCompanyId(notFavoriteCompanyDetails?.id);setShowReviewModal(true)}} className='flex justify-center cursor-pointer'>
                                                    <RatingFiveStar rating={notFavoriteCompanyDetails?.rating ? Math.round(notFavoriteCompanyDetails?.rating) : 0} /></div>
                                            </div>
                                            </div>
                                        </div>


                                        <div className='mt-s22'>
                                            <CommonSocialLinks item={notFavoriteCompanyDetails?.social_media} />
                                        </div>
                                    </div>

                                    <div className='w-full'>
                                        <div className=''>
                                            <span className='text-fs24 font-fw600 text-cMainBlack'>{t("Contact Info")}</span>
                                            <div className='text-fs14 font-fw400 text-cDarkGray mt-s9'>
                                                <div className='flex items-center my-s1'>
                                                    <img className='mr-s8 w-s16 h-s16' src={iCvrBlack} alt="" />
                                                    {notFavoriteCompanyDetails?.cvr ? notFavoriteCompanyDetails?.cvr : 'NA'}
                                                </div>

                                                <div className='flex items-center mb-s1'>
                                                    <img className='mr-s8 w-s16 h-s16' src={iEmailBlack} alt="" />
                                                    <div onClick={() => {
                                                        if (notFavoriteCompanyDetails?.email) window.location = "mailto:" + notFavoriteCompanyDetails?.email;
                                                    }} className='cursor-pointer break-all  w-full'>{notFavoriteCompanyDetails?.email ?? 'NA'}</div>
                                                </div>

                                                <div className='flex items-center'>
                                                    <img className='mr-s8 w-s16 h-s16' src={iPhoneBlack} alt="" />
                                                    {notFavoriteCompanyDetails?.phone ?
                                                        <p
                                                            onClick={() => {
                                                                if (notFavoriteCompanyDetails?.phone) window.location = "tel:" + notFavoriteCompanyDetails?.phone;
                                                            }}
                                                            className='break-all cursor-pointer'>{notFavoriteCompanyDetails?.phone} </p> : 'NA'}
                                                </div>

                                                <div className='flex my-s1'>
                                                    <img className='mr-s8' src={iAddressBlack} alt="" />
                                                    {notFavoriteCompanyDetails?.address ?
                                                        <a target={'_blank'} rel='noreferrer'
                                                            href={`http://maps.google.com/?q=${notFavoriteCompanyDetails?.address}`}>{notFavoriteCompanyDetails?.address}</a> : 'NA'}
                                                </div>

                                                <div className='flex items-center'>
                                                    <img className='mr-s8 w-s16 h-s16' src={iWebsiteBlack} alt="" />
                                                    {notFavoriteCompanyDetails?.website ? <a target={'_blank'}
                                                        href={notFavoriteCompanyDetails?.website?.includes("http") ? notFavoriteCompanyDetails?.website : `https://${notFavoriteCompanyDetails?.website}`} rel='noreferrer'
                                                        className='break-all cursor-pointer'>{notFavoriteCompanyDetails?.website}</a> : 'NA'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='my-s24'>
                                            <div className='text-fs24 text-cMainBlack font-fw600 mb-s4'>{t("About Company")}</div>
                                            <p className='custom-text text-fs14 text-cMainBlack font-fw400'>
                                                {notFavoriteCompanyDetails?.about === "null" || notFavoriteCompanyDetails?.about === null ? 'NA' : notFavoriteCompanyDetails?.about}
                                            </p>
                                        </div>

                                        <div>
                                            <div className='text-fs24 text-cMainBlack font-fw600 mb-s4'>{t("Company terms and conditions")}</div>
                                           
                                            {notFavoriteCompanyDetails?.terms_condition ? <div className='break-all text-fs14 text-cMainBlack font-fw400 h-auto max-h-[300px] overflow-y-auto'
                                            dangerouslySetInnerHTML={{ __html: notFavoriteCompanyDetails?.terms_condition?.terms_condition }}
                                        /> : <div className='text-fs14 text-cMainBlack font-fw400'>NA</div>}
                                        </div>
                                    </div>
                                </div>

                            </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
                                {t("Select list item to view details.")}
                            </div>}
                        </div>

                    </>
                }
            />
        </div>
    );
};

export default NotFavCompanyDetailsModal;