import React from 'react';
import { iFacebook, iLinkedIn, iTwitter } from '../../app/utility/imageImports';
import { useTranslation } from 'react-i18next';

const CommonSocialLinks = ({ item }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div>
                {item?.length ? <div className='md:mb-0 mb-s25'>
                    <span className='text-fs24 font-fw600 text-cMainBlack'>
                        {item?.find(item => item?.link !== "") ?
                            t('Social Links') : t('No Social Links')}
                    </span>
                    <div className='flex flex-wrap mt-s13'>
                        {item?.map((item, index) => (
                            <div key={index}>

                                {
                                    item?.domain.includes("facebook") && item?.link !== "" &&
                                    <a target="blank" href={item?.link?.includes("http") ? item?.link : "http://" + item?.link}>
                                        <img className='max-w-[30px] min-w-[40px] cursor-pointer mr-s16'
                                            src={iFacebook} alt="Facebook icon" />
                                    </a>
                                }

                                {
                                    item?.domain.includes("twitter") && item?.link !== "" &&
                                    <a target="blank" href={item?.link?.includes("http") ? item?.link : "http://" + item?.link}>
                                        <img className='max-w-[30px] min-w-[40px] cursor-pointer mr-s16'
                                            src={iTwitter} alt="iTwitter" />
                                    </a>
                                }

                                {
                                    item?.domain.includes("linkedin") && item?.link !== "" &&
                                    <a target="blank" href={item?.link?.includes("http") ? item?.link : "http://" + item?.link}>
                                        <img className='max-w-[30px] min-w-[40px] cursor-pointer' src={iLinkedIn} alt="LinkedIn" />
                                    </a>
                                }
                            </div>
                        ))}
                    </div>
                </div> : <span className='text-fs24 font-fw600 text-cMainBlack'>
                    {t('No Social Links')}
                </span>}
            </div>
        </div>
    );
};

export default CommonSocialLinks;