/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCommonHomeStore from '../../../../app/stores/others/commonHomeStore';
import { iBlackCross, iRightArrowVector, iWhiteAdd } from '../../../../app/utility/imageImports';
import CommonHomePageCard from '../../../../components/card/CommonHomePageCard';
import { k_home_card_types } from '../../../../app/utility/const';
import { useTranslation } from 'react-i18next';


const TopHeader = () => {
    const { homePageData, selectedCard, setSelectedCard } = useCommonHomeStore();

    const [topbarData, setTopbarData] = useState({ title: '', link: "", });

    const [request, setRequest] = useState(true);

    const navigateTo = useNavigate();
    const { t } = useTranslation();

    const handleBarClick = (linkFlow = true) => {
        if (linkFlow)
            navigateTo("/request/create");
        else
            setRequest(false);
    }

    useEffect(() => {
        if (!homePageData?.is_create_request)
            setTopbarData({ title: t('Create your first request'), link: '/request/create' });
        else
            setTopbarData({ title: '', link: '' });

    }, [homePageData]);

    return (
        <div className='mb-s10'>

            {topbarData?.title && request ?
                <div className=' rounded-br8 flex justify-between z-10 overflow-hidden cursor-pointer'>
                    <div onClick={() => { handleBarClick(true) }} className='pl-s15 w-full flex items-center py-s10 bg-cLightSkyBlue'>
                        <span className='text-fs16 font-fw500 text-cCustomerBlack'>{t('Create your first request')}</span>
                        <img src={iRightArrowVector} alt="" className='w-s28 ml-s15' />
                    </div>
                    <img onClick={() => { handleBarClick(false) }} src={iBlackCross} alt="" className='bg-cLightSkyBlue px-3 z-50' />
                </div>
                : ""
            }

            {/* Home PageCard start */}

            <div className={`title ${topbarData?.title && request ? 'my-6' : 'mb-[22px]'}`}>{t('Home')}</div>

            <div className='items-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4 lg:gap-4 xl:gap-7 2xl:gap-12'>

                    <div className='h-s120 mb-s20 '>
                        <CommonHomePageCard
                            onClick={() => {
                                setSelectedCard(k_home_card_types.in_bidding);
                            }}
                            title={t("In Bidding")}
                            count={homePageData?.in_bidding_count ?? 0}
                            selected={selectedCard === k_home_card_types.in_bidding}
                        />
                    </div>

                    <div className='h-s120 mb-s20 '>
                        <CommonHomePageCard
                            onClick={() => {
                                setSelectedCard(k_home_card_types.awarded);
                            }}
                            title={t("Awarded")}
                            count={homePageData?.awarded_count ?? 0}
                            selected={selectedCard === k_home_card_types.awarded}
                        />
                    </div>

                    <div className='h-s120 mb-s20 '>
                        <CommonHomePageCard
                            onClick={() => {
                                setSelectedCard(k_home_card_types.ongoing);
                            }}
                            title={t("Ongoing")}
                            count={homePageData?.ongoing_count ?? 0}
                            selected={selectedCard === k_home_card_types.ongoing}
                        />
                    </div>

                    <div className='h-s116'> <div onClick={() => navigateTo('/request/create')} className='bg-cMainBlue rounded-br5 flex justify-center h-s120 cursor-pointer'>
                        <div className='flex flex-col justify-center items-center p-s15'>
                            <span className='text-cMainWhite text-fs16 text-fw500'>{t('Create Request')}</span>
                            <img src={iWhiteAdd} alt="" className='w-s30 h-s30 mt-s12 cursor-pointer' />
                        </div>
                    </div></div>
                </div>
            </div>
            {/* Home PageCard end */}


        </div>
    );
};

export default TopHeader;