/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useFavoriteCompaniesStore, {  searchFavCompany } from '../../../app/stores/customer/favoriteCompaniesStore';
import { useDebounce } from 'use-debounce';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import FavoriteCompaniesTable from './tables/FavoriteCompaniesTable';
import { useTranslation } from 'react-i18next';

const FavoriteCompanies = () => {

    const { searchValueFavoriteCompany, setSearchValueFavoriteCompany } = useFavoriteCompaniesStore();

    const { t } = useTranslation();

    useEffect(() => {
        changePageTitle(t('Limadi | Favorite Companies'));
        setSearchValueFavoriteCompany("");
    }, [])

    const [searchValue] = useDebounce(searchValueFavoriteCompany, 500);
    useEffect(() => {
        searchFavCompany(searchValue)
    }, [searchValue])


    return (
        <div>
            <div className=''>
                {/* <div className='flex flex-col sm:flex-row sm:justify-between sm:flex-wrap md:flex-nowrap'>
                    <CommonTitle title="Favorite Companies" count={favoriteCompanyList?.length} withReloader={true}
                        onReload={() => {
                            setSearchValueFavoriteCompany("");
                            getFavoriteCompany();
                        }} />
                    <div className='flex flex-col md:flex-row md:justify-between mt-s16 md:mt-0'>
                        <CommonSearchBox
                            value={searchValueFavoriteCompany}
                            onChange={(e) => { setSearchValueFavoriteCompany(e.target.value) }}
                        />
                        <div className='mt-s16 md:mt-0 md:ml-s10 '>
                            <CommonButton
                                onClick={() => {
                                    setShowAddFavoriteCompaniesModal(true)
                                    setSearchValueNotFavoriteCompany("")
                                }}
                                btnLabel='Add New'
                                icon={iWhitePlus}
                                width="w-[130px]" /></div>
                    </div>
                </div> */}

                <FavoriteCompaniesTable />

                {/* {favoriteCompanyList?.length ? <div className="grid grid-cols-12 gap-2 mt-s20 md:gap-8 2xl:gap-8">
                    <div className="order-last col-span-12 lg:col-span-4 lg:order-first mt-s20 lg:mt-0">
                        <div className="flex-col">
                            {favoriteCompanyList?.map((item, index) => (
                                <div className='mb-s20'>
                                    <CommonListItem
                                        onClick={async () => {
                                            await selectFavoriteCompany(item, index)
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                        }}
                                        imgCover={true}
                                        key={index}
                                        title={item?.name}
                                        subTitleOne={item?.address}
                                        subTitleTwo=""
                                        selected={item?.id === selectedFavId}
                                        withImage={true}
                                        imagePath={item?.image}
                                        imagePathDummy={iFavCompanyGray}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-8">
                        <div className="">
                            <FavoriteCompaniesDetails />
                        </div>
                    </div>
                </div> : <CommonEmptyData
                    title='No Favorite Companies Found !'
                    button={false}
                    details='There is no Favorite Companies available now.'
                />} */}
            </div>
        </div>
    );
};

export default FavoriteCompanies;