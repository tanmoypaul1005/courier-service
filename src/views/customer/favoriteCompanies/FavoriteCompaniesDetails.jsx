import React from 'react';
import useFavoriteCompaniesStore from '../../../app/stores/customer/favoriteCompaniesStore';
import { iAddressBlack, iCvrBlack, iEmailBlack, iFavCompanyGray, iPhoneBlack, iWebsiteBlack } from '../../../app/utility/imageImports';
import CommonButton from '../../../components/button/CommonButton';
import Image from '../../../components/image/Image';
import RatingFiveStar from '../../../components/rating/RatingFiveStar';
import CommonSocialLinks from '../../../components/socialLinks/CommonSocialLinks';
import CommonTitle from '../../../components/title/CommonTitle';
import { useTranslation } from 'react-i18next';

const FavoriteCompaniesDetails = () => {

    const { favoriteCompanyDetails, setSelectedNotFavId, setShowRemoveFavoriteCompanyModal } = useFavoriteCompaniesStore();

    const { t } = useTranslation();

    return (
        <div>
            {favoriteCompanyDetails?.cvr ? <div>
                <div className='flex flex-col sm:flex-row sm:justify-between'>
                    <CommonTitle title={t('Company Details')} />
                </div>

                <div className='flex flex-wrap md:flex-nowrap mt-s16'>
                    <div className=''>
                        <div className='flex-col mr-s30'>
                            <Image src={favoriteCompanyDetails?.image} dummyImage={iFavCompanyGray} className=' max-w-[160px] min-w-[160px] h-s160 rounded-full object-cover' alt="" />

                            <div className='flex justify-center'> <div className='flex flex-col mt-s8'>
                                <div className='flex justify-center text-fs16 text-cSecondaryTextColor font-fw600 mb-s4'>
                                    {favoriteCompanyDetails?.name ? favoriteCompanyDetails?.name : 'NA'}</div>
                                <div className='flex justify-center'>
                                    <RatingFiveStar rating={favoriteCompanyDetails?.rating ? parseFloat(favoriteCompanyDetails?.rating?.toFixed(1)) : 0} /></div>
                            </div>
                            </div>
                        </div>


                        <div className='mt-s21'>
                            <CommonSocialLinks item={favoriteCompanyDetails?.social_media} />
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className=''>
                            <span className='text-fs24 font-fw600 text-cMainBlack'>{("Contact Info")}</span>
                            <div className='text-fs14 font-fw400 text-cDarkGray mt-s9'>
                                <div className='flex items-center my-s1'>
                                    <img className='mr-s8 w-s16 h-s16' src={iCvrBlack} alt="" />
                                    {favoriteCompanyDetails?.cvr ? favoriteCompanyDetails?.cvr : 'NA'}
                                </div>

                                <div className='flex items-center mb-s1 cursor-pointer'>
                                    <img className='mr-s8 w-s16 h-s16' src={iEmailBlack} alt="" />
                                    <div onClick={() => {
                                        if (favoriteCompanyDetails?.email) window.location = "mailto:" + favoriteCompanyDetails?.email;
                                    }} className='cursor-pointer break-all  w-full'>{favoriteCompanyDetails?.email ?? 'NA'}</div>
                                </div>

                                <div className='flex items-center'>
                                    <img className='mr-s8 w-s16 h-s16' src={iPhoneBlack} alt="" />
                                    {favoriteCompanyDetails?.phone ?
                                        <p
                                            onClick={() => {
                                                if (favoriteCompanyDetails?.phone) window.location = "tel:" + favoriteCompanyDetails?.phone;
                                            }}
                                            className='break-all cursor-pointer'>{favoriteCompanyDetails?.phone} </p> : 'NA'}
                                </div>

                                <div className='flex my-s1'>
                                    <img className='mr-s8' src={iAddressBlack} alt="" />
                                    {favoriteCompanyDetails?.address ?
                                        <a target={'_blank'} rel='noreferrer'
                                            href={`http://maps.google.com/?q=${favoriteCompanyDetails?.address}`}>{favoriteCompanyDetails?.address}</a> : 'NA'}
                                </div>

                                <div className='flex items-center'>
                                    <img className='mr-s8 w-s16 h-s16' src={iWebsiteBlack} alt="" />
                                    {favoriteCompanyDetails?.website ? <a target={'_blank'}
                                        href={favoriteCompanyDetails?.website?.includes("http") ? favoriteCompanyDetails?.website : `https://${favoriteCompanyDetails?.website}`} rel='noreferrer'
                                        className='break-all cursor-pointer'>{favoriteCompanyDetails?.website}</a> : 'NA'}
                                </div>
                            </div>
                        </div>

                        <div className='my-s24'>
                            <div className='text-fs24 text-cMainBlack font-fw600 mb-s4'>{t("About Company")}</div>
                            <p className='custom-text text-fs14 text-cMainBlack font-fw400'>
                                {favoriteCompanyDetails?.about === "null" || favoriteCompanyDetails?.about === null ? 'NA' : favoriteCompanyDetails?.about}
                            </p>
                        </div>

                        <div>
                            <div className='text-fs24 text-cMainBlack font-fw600 mb-s4 '>{t("Company terms and conditions")}</div>
                            {favoriteCompanyDetails?.terms_condition ? favoriteCompanyDetails?.terms_condition?.terms_condition !== "<p><br></p>" ? <div className='break-all text-fs14 text-cMainBlack font-fw400'
                                dangerouslySetInnerHTML={{ __html: favoriteCompanyDetails?.terms_condition?.terms_condition }}
                            /> : 'NA' : 'NA'}
                        </div>
                    </div>
                </div>

                <div className='flex justify-end mt-s20'>
                    <CommonButton
                        onClick={async () => {
                            await setSelectedNotFavId(favoriteCompanyDetails?.id);
                            await setShowRemoveFavoriteCompanyModal(true)
                        }}
                        btnLabel={t('Remove')} colorType='danger' />
                </div>
            </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
                {t("Select list item to view details.")}
            </div>}
        </div>
    );
};

export default FavoriteCompaniesDetails;