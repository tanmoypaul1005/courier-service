/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CommonModal from './CommonModal';
import { iAddressBlack, iAwardedWhite, iCvrBlack, iEmailBlack, iFavCompanyNormal, iFavoriteIcon, iPhoneBlack, iWebsiteBlack } from '../../app/utility/imageImports';
import RatingFiveStar from '../rating/RatingFiveStar';
import { Checkbox } from '@mui/material';
import CommonButton from '../button/CommonButton';
import useFavoriteCompaniesStore, { getCompanyDetails } from '../../app/stores/customer/favoriteCompaniesStore';
import CommonViewComponent from '../viewer/CommonViewComponent';
import CommonSocialLinks from '../socialLinks/CommonSocialLinks';
import useRequestStore, { awardRequest } from '../../app/stores/others/requestStore';
import { useNavigate } from 'react-router-dom';
import { k_request_paths } from '../../app/utility/const';
import Image from '../image/Image';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../app/stores/others/settingsStore';
import { kuGetRequestsNew } from '../../app/urls/commonUrl';

const CompanyDetailsModal = ({ showModal, setShowModal, company_id, bidding_info, bidding_details = true }) => {

    const { company_details } = useFavoriteCompaniesStore();
    const { setShowReviewModal,setSelectedCompanyId } = useSettingsStore();
    const {setRequestApiUrl}=useRequestStore();
    const [checked, setChecked] = React.useState(false);
    const navigateTo = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        (showModal && company_id) && getCompanyDetails(company_id);
    }, [showModal]);

    return (
        <div>
            <CommonModal
                showModal={showModal}
                setShowModal={setShowModal}
                modalTitle={t("Company Details")}
                widthClass='w-[860px]'
                mainContent={
                    <>
                        <div className='mt-s20'>
                            <div className='grid grid-cols-12 gap-3'>

                                <div className='col-span-12 md:col-span-5'>
                                    <div className='flex flex-col items-center justify-center p-2 space-y-1'>
                                        <div className='relative'>
                                            {/* <Image src={company_details?.image} dummyImage={iFavCompanyNormal} alt="" className='object-cover  w-[150px] h-[150px] rounded-full' /> */}
                                            <div className={`max-w-[160px] min-w-[160px] h-s160 rounded-full ring-1 ring-cGrey flex justify-center items-center`}>
                                                <Image
                                                    src={company_details?.image}
                                                    dummyImage={iFavCompanyNormal}
                                                    className='max-w-[150px] min-w-[150px] h-s150 bg-cover bg-center rounded-full bg-clip-border'
                                                    alt=""
                                                />
                                            </div>
                                            {company_details?.is_favorite &&
                                                <div className='p-[6px] shadow-md bg-slate-50 rounded-full absolute top-3 right-3'>
                                                    <img className="" src={iFavoriteIcon} alt="" />
                                                </div>
                                            }
                                        </div>
                                        <div className='text-center break-all text-fs14 text-cSecondaryTextColor font-fw600'>{company_details?.name}</div>

                                        <div className='cursor-pointer' onClick={() => { 
                                            setSelectedCompanyId(company_details?.id)
                                            setShowReviewModal(true)
                                            }}>
                                            <RatingFiveStar rating={company_details?.rating?parseFloat(company_details?.rating?.toFixed(1)):0} />
                                        </div>

                                    </div>


                                    <div className='mt-s30'>
                                        <span className='text-fs24 font-fw500 text-cMainBlack'>{t('Contact Us')}</span>
                                        <div className='break-all text-fs14 font-fw400 text-cDarkGray mt-s12 overflow-clip'>

                                            <div className='flex items-center my-s1'>
                                                <img className='mr-s8 w-s16 h-s16' src={iCvrBlack} alt="" />
                                                {company_details?.cvr ? company_details?.cvr : 'NA'}
                                            </div>

                                            <div className='flex items-center cursor-pointer mb-s1'>
                                                <img className='mr-s8 w-s16 h-s16' src={iEmailBlack} alt="" />
                                                <div onClick={() => {
                                                    if (company_details?.email) window.location = "mailto:" + company_details?.email;
                                                }} className='w-full break-all cursor-pointer'>{company_details?.email ?? 'NA'}</div>
                                            </div>

                                            <div className='flex items-center'>
                                                <img className='mr-s8 w-s16 h-s16' src={iPhoneBlack} alt="" />
                                                {company_details?.phone ?
                                                    <p
                                                        onClick={() => {
                                                            if (company_details?.phone) window.location = "tel:" + company_details?.phone;
                                                        }}
                                                        className='break-all cursor-pointer'>{company_details?.phone} </p> : 'NA'}
                                            </div>

                                            <div className='flex my-s1'>
                                                <img className='mr-s8' src={iAddressBlack} alt="" />
                                                {company_details?.address ?
                                                    <a target={'_blank'} rel='noreferrer'
                                                        href={`http://maps.google.com/?q=${company_details?.address}`}>{company_details?.address}</a> : 'NA'}
                                            </div>

                                            <div className='flex items-center'>
                                                <img className='mr-s8 w-s16 h-s16' src={iWebsiteBlack} alt="" />
                                                {company_details?.website ? <a target={'_blank'}
                                                    href={company_details?.website?.includes("http") ? company_details?.website : `https://${company_details?.website}`} rel='noreferrer'
                                                    className='break-all cursor-pointer'>{company_details?.website}</a> : 'NA'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-s25 md:mb-0 mb-s25'>
                                        <CommonSocialLinks item={company_details?.social_media} />
                                    </div>
                                </div>


                                <div className='col-span-12 md:col-span-7'>
                                    {bidding_details && <div className=''>
                                        <div className='text-fs25 font-fw600 text-cMainBlack'>{t('Bidding Details')}</div>
                                        <div className='flex justify-between text-fs16 text-cMainBlack font-fw600 mt-s10 mb-s8'>
                                            <span>{t('Budget')}</span>
                                            <span>{'DKK ' + bidding_info?.budget.toLocaleString("da-DK")}</span>
                                        </div>

                                        <CommonViewComponent labelText={t('Description')} value={bidding_info?.details} />

                                        <div className='flex justify-between mt-s20'><div className='flex'>
                                            <Checkbox
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                            size='small'
                                            sx={{
                                                color: '',
                                                padding: '0',
                                                paddingRight: '10px',
                                                backgroundColor: 'transparent !important',
                                                '&.Mui-checked': {
                                                    color: '#4CAF50',
                                                },
                                            }}
                                        />
                                            <div className='flex items-center justify-center break-all text-fs12 font-fw400'><span className='text-cGrey mr-s5 cp' onClick={() => setChecked(!checked)}>{t('I agree with all')}</span><span className='text-cGrey '>  {t('company terms and conditions.')} </span></div>
                                        </div>
                                            <CommonButton
                                                isDisabled={!checked}
                                                icon={iAwardedWhite}
                                                btnLabel={t('Award')}
                                                smallSize={true}
                                                width="W-[106px]"
                                                onClick={async () => {
                                                    const success = await awardRequest(bidding_info?.id, navigateTo);
                                                    if (success) {
                                                        setShowModal(false);
                                                        setRequestApiUrl(kuGetRequestsNew);
                                                        navigateTo(k_request_paths.awarded);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>}


                                    <div>
                                        <div className='text-fs24 font-fw600 text-cMainBlack mt-s25 mb-s5'>{t('About Company')}</div>
                                        <div className='custom-text text-fs14 font-fw400 text-cMainBlack'> {company_details?.about ?? 'NA'}  </div>
                                    </div>

                                    <div>
                                        <div className='text-fs24 font-fw600 text-cMainBlack mt-s25 mb-s5'>{t('Company terms and conditions')}</div>
                                        {company_details?.terms_condition ? <div className='custom-text text-fs14 text-cMainBlack font-fw400 h-auto max-h-[300px] overflow-y-auto'
                                            dangerouslySetInnerHTML={{ __html: company_details?.terms_condition?.terms_condition }}
                                        /> : <div className='text-fs14 text-cMainBlack font-fw400'>NA</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default CompanyDetailsModal;