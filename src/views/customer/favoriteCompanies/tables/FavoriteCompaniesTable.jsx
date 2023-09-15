/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CommonTable from '../../../../components/table/CommonTable';
import useFavoriteCompaniesStore, { getCompanyDetails, getFavoriteCompany, handleFavAddressOrder } from '../../../../app/stores/customer/favoriteCompaniesStore';
import RatingFiveStar from '../../../../components/rating/RatingFiveStar';
import { useEffect } from 'react';
import { k_fav_company_order_by } from '../../../../app/utility/const';
import CommonButton from '../../../../components/button/CommonButton';
import { iWhitePlus } from '../../../../app/utility/imageImports';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../../../app/stores/others/settingsStore';

const FavoriteCompaniesTable = () => {

    const {
        setSearchValueNotFavoriteCompany,
        favoriteCompanyList,
        setCompany_take,
        setShowFavCompanyModal,
        favCompany_order_by,
        is_asc,
        setShowAddFavoriteCompaniesModal,
        company_take, searchValueFavoriteCompany,
        setSearchValueFavoriteCompany,
        setFavCompanyPageUrl,
        setFavCompany_order_by
    } = useFavoriteCompaniesStore();

    const {setSelectedCompanyId}=useSettingsStore();

    const [searchValue] = useDebounce(searchValueFavoriteCompany, 500);

    const { t } = useTranslation();

    useEffect(() => {
        fetchData()
    }, [searchValue])


    const fetchData = async () => {
        await setCompany_take(10)
        if (searchValue === "") {
            await setFavCompany_order_by("updated_at")
            setSearchValueFavoriteCompany("")
            getFavoriteCompany();
        } else {
            getFavoriteCompany("", searchValue, favCompany_order_by === "updated_at" ? false : true);
        }

    }

    const resetTable = async () => {
        await setCompany_take(10);
        await setFavCompany_order_by("updated_at")
        await setSearchValueFavoriteCompany("")
        getFavoriteCompany();
    }

    const headers = [
        { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '5' },
        { isActive: favCompany_order_by === k_fav_company_order_by.name, sort: is_asc, index: 1, name: t("Company Name"), onClickAction: () => { handleFavAddressOrder(k_fav_company_order_by.name) }, width: '30' },
        { isActive: favCompany_order_by === k_fav_company_order_by.city, sort: is_asc, index: 2, name: t("City"), onClickAction: () => { handleFavAddressOrder(k_fav_company_order_by.city) }, width: '10' },
        { isActive: favCompany_order_by === k_fav_company_order_by.email, sort: is_asc, index: 3, name: t("Email"), onClickAction: () => { handleFavAddressOrder(k_fav_company_order_by.email) }, width: '25' },
        { isActive: favCompany_order_by === k_fav_company_order_by.phone, sort: is_asc, index: 4, name: t("Phone"), onClickAction: () => { handleFavAddressOrder(k_fav_company_order_by.phone) }, width: '20' },
        { isActive: favCompany_order_by === k_fav_company_order_by.rate, sort: is_asc, index: 5, name: t("Rating"), onClickAction: () => { handleFavAddressOrder(k_fav_company_order_by.rate) }, width: '10' },
    ];

    return (
        <div>
            <CommonTable
                tableTitle={t('Favorite Companies')}
                tableTitleClassName={'title'}
                showSearchBox={true}
                showTopRightFilter={false}
                topRightMainComponent={<>
                    <CommonButton
                        onClick={() => {
                            setShowAddFavoriteCompaniesModal(true)
                            setSearchValueNotFavoriteCompany("")
                        }}
                        btnLabel={t('Add New')}
                        icon={iWhitePlus}
                        width="w-[130px]" />
                </>}
                showTakeOption={true}
                showPagination={true}
                showPageCountText={true}
                headers={headers}
                outerPadding='p-s0'
                paginationObject={favoriteCompanyList}

                withClearSearch={true}
                onSearchClear={()=>{setSearchValueFavoriteCompany("")}}
                searchValue={searchValueFavoriteCompany}
                searchOnChange={(e) => {setFavCompanyPageUrl("");setSearchValueFavoriteCompany(e.target.value);}}

                currentTakeAmount={company_take}
                withReloader={true}
                onReload={resetTable}
                takeOptionOnChange={async (e) => {
                    setFavCompanyPageUrl("")
                    await setCompany_take(e.target.value);
                    await getFavoriteCompany("")
                }}
                paginationOnClick={async (url) => {
                    setFavCompanyPageUrl(url)
                    getFavoriteCompany(url);
                }}

                items={
                    favoriteCompanyList?.data?.length > 0 ?
                        favoriteCompanyList?.data?.map((item, index) =>
                            <tr className='border border-collapse hover:bg-cCommonListBG cp'
                                onClick={async () => {
                                    await getCompanyDetails(item?.id)
                                    setSelectedCompanyId(item?.company_id)
                                    setShowFavCompanyModal(true)
                                }}>
                                <td className='border-r text-center py-2.5 table-title'>
                                    {(favoriteCompanyList?.current_page * 10 - 10) + index + 1}
                                </td>
                                <td className='border-r text-center py-2.5 table-info '>{item?.name ?? 'NA'}</td>
                                <td className='border-r text-center py-2.5 table-info '>{item?.city ?? 'NA'}</td>
                                <td className='border-r text-center py-2.5 table-info '>{item?.email ?? 'NA'}</td>
                                <td className='border-r text-center py-2.5 table-info '>{item?.phone ?? 'NA'}</td>
                                <td className='border-r text-center py-2.5 table-info  flex justify-center'><RatingFiveStar rating={parseFloat(item?.rate?.toFixed(1)) ?? 0} /></td>
                            </tr>
                        ) : <tr className='w-full'>
                            <th colSpan={5} className="w-full info py-s20">
                                {t("No matching records found!")}
                            </th>
                        </tr>
                }
            />
        </div>
    );
};

export default FavoriteCompaniesTable;