/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CommonTable from '../../../../components/table/CommonTable';
import useFavoriteAddressStore, { getFavoriteAddress, handleFavAddressOrder } from '../../../../app/stores/others/favoriteAddressStore';
import { useEffect } from 'react';
import { k_fav_address_order_by } from '../../../../app/utility/const';
import CommonButton from '../../../../components/button/CommonButton';
import { iWhitePlus } from '../../../../app/utility/imageImports';
import { useDebounce } from 'use-debounce';
import { kuFavoriteAddressList } from '../../../../app/urls/commonUrl';
import { changePageTitle } from '../../../../app/utility/utilityFunctions';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

function FavoriteAddressTable() {

    const { t } = useTranslation();

    const { table_data, search_key, setSearchKey, take, setTake, setApiUrl, setOrder, setIsAsc, is_asc, order, setFavoriteAddressDetails, setShowFavoriteAddressDetailsModal, setAddFavoriteAddress_form, setShowAddFavoriteAddressModal } = useFavoriteAddressStore();

    const headers = [
        { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '5' },
        { isActive: order === k_fav_address_order_by.title, sort: is_asc, index: 1, name: t("Title"), onClickAction: () => { handleFavAddressOrder(k_fav_address_order_by.title, getFavoriteAddress) }, width: '25' },
        { isActive: order === k_fav_address_order_by.address, sort: is_asc, index: 2, name: t("Address"), onClickAction: () => { handleFavAddressOrder(k_fav_address_order_by.address, getFavoriteAddress) }, width: '50' },
        { isActive: order === k_fav_address_order_by.note, sort: is_asc, index: 3, name: t("Note"), onClickAction: () => { handleFavAddressOrder(k_fav_address_order_by.note, getFavoriteAddress) }, width: '40' },
    ];

    const [searchValue] = useDebounce(search_key, 500);

    const resetTable = async () => {
        if (searchValue?.length > 0) await setSearchKey('');
        await setApiUrl(kuFavoriteAddressList);
        if (take !== 10) await setTake(10);
        await setOrder(null);
        await setIsAsc(1);
        getFavoriteAddress();
    }

    const handleInitialSetup = async () => {
        resetTable();
    }

    useEffect(() => {
        changePageTitle(t('Limadi | Favorite Address'));
        handleInitialSetup();
    }, []);

    useEffect(() => { getFavoriteAddress() }, [searchValue]);

    return (
        <div>
            <CommonTable
                tableTitle={t('Favorite Addresses')}
                tableTitleClassName={'title'}
                showSearchBox={true}
                showTopRightFilter={false}
                topRightMainComponent={
                    <>
                        <CommonButton
                            onClick={async () => {
                                await setAddFavoriteAddress_form({
                                    title: "",
                                    address: "",
                                    note: "",
                                    lat: "",
                                    lng: ""
                                })
                                setShowAddFavoriteAddressModal(true)
                            }}
                            btnLabel={t('Add New')}
                            width="w-[130px]"
                            icon={iWhitePlus}
                        />
                    </>
                }
                showTakeOption={true}
                showPagination={true}
                showPageCountText={true}
                headers={headers}
                outerPadding='p-s0'
                paginationObject={table_data}

                withClearSearch={true}
                onSearchClear={()=>{setSearchKey("")}}
                searchValue={search_key}
                searchOnChange={(e) => {
                    setApiUrl(kuFavoriteAddressList);
                    setSearchKey(e.target.value);
                }}

                currentTakeAmount={take}
                withReloader={true}
                onReload={resetTable}
                takeOptionOnChange={async (e) => {
                    await setTake(e.target.value);
                    await setApiUrl(kuFavoriteAddressList);
                    getFavoriteAddress();
                }}
                paginationOnClick={async (url) => {
                    await setApiUrl(url);
                    getFavoriteAddress()
                }}

                items={
                    table_data?.data?.length > 0 ?
                        table_data?.data?.map((item, index) =>
                            <tr className='border border-collapse hover:bg-cCommonListBG cp'
                                onClick={async () => { await setFavoriteAddressDetails(item); setShowFavoriteAddressDetailsModal(true) }}>
                                <td className='border-r text-center py-2.5 table-title'>
                                    {(table_data?.current_page * 10 - 10) + index + 1}</td>
                                <td className='border-r text-center py-2.5 table-info '><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
                                <td className='border-r text-center py-2.5 table-info '><Clamp lines={2}> {item?.address ?? 'NA'}</Clamp></td>
                                <td className='border-r text-center py-2.5 table-info break-all'>
                                    <Clamp lines={2}>
                                        {item?.note ?? 'NA'}
                                    </Clamp>
                                </td>
                            </tr>
                        ) : ''
                }
            />
        </div>
    )
}

export default FavoriteAddressTable
