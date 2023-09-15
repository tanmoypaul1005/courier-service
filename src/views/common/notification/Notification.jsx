/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useNotificationStore, { getNotification, handleNotificationOrder, notificationSeenFn } from '../../../app/stores/others/notificationStore';
import { formatDate, changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonTable from '../../../components/table/CommonTable';
import { kuGetTableViewNotification } from '../../../app/urls/commonUrl';
import { k_Notification_order_by } from '../../../app/utility/const';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

const Notification = () => {

    const { t } = useTranslation();

    const { table_data, search_key, setSearchKey, take, setTake, setApiUrl, setOrder, setIsAsc, is_asc, order, setNotificationDetails, setShowNotificationDetailsModal } = useNotificationStore();

    const [searchValue] = useDebounce(search_key, 500);

    const headers = [
        { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '5' },
        { isActive: order === k_Notification_order_by.title, sort: is_asc, index: 1, name: t("Title"), onClickAction: () => { handleNotificationOrder(k_Notification_order_by.title, getNotification) }, width: '35' },
        { isActive: order === k_Notification_order_by.details, sort: is_asc, index: 2, name: t("Details"), onClickAction: () => { handleNotificationOrder(k_Notification_order_by.details, getNotification) }, width: '30' },
        { isActive: order === k_Notification_order_by.created_date, sort: is_asc, index: 3, name: t("Date & Time"), onClickAction: () => { handleNotificationOrder(k_Notification_order_by.created_date, getNotification) }, width: '20' },
        { isActive: order === k_Notification_order_by.status, sort: is_asc, index: 4, name: t("Status"), onClickAction: () => { handleNotificationOrder(k_Notification_order_by.status, getNotification) }, width: '10' },
    ];

    const resetTable = async () => {
        if (searchValue?.length > 0) await setSearchKey('');
        await setApiUrl(kuGetTableViewNotification);
        if (take !== 10) await setTake(10);
        await setOrder(null);
        await setIsAsc(0);
        getNotification();
    }

    const handleInitialSetup = async () => {
        resetTable();
    }

    useEffect(() => {
        changePageTitle(t('Limadi | Notification'))
        handleInitialSetup();
    }, []);

    useEffect(() => { getNotification() }, [searchValue]);

    return (
        <div>
            <CommonTable
                tableTitle={t('Notification')}
                tableTitleClassName={'title'}
                showSearchBox={true}
                showTopRightFilter={false}
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
                    setApiUrl(kuGetTableViewNotification);
                    setSearchKey(e.target.value);
                }}

                currentTakeAmount={take}
                withReloader={true}
                onReload={resetTable}
                takeOptionOnChange={async (e) => {
                    await setTake(e.target.value);
                    await setApiUrl(kuGetTableViewNotification);
                    getNotification();
                }}
                paginationOnClick={async (url) => {
                    await setApiUrl(url);
                    getNotification()
                }}

                items={
                    table_data?.data?.length > 0 ?
                        table_data?.data?.map((item, index) =>
                            <tr className='border border-collapse hover:bg-cCommonListBG cp'
                                onClick={async () => {
                                    notificationSeenFn(item?.id);
                                    setNotificationDetails(item);
                                    setShowNotificationDetailsModal(true)
                                }}>
                                <td className='border-r text-center py-2.5 table-title'>
                                {(table_data?.current_page * 10 - 10) + index + 1}
                                </td>
                                <td className='border-r text-center py-2.5 table-info '><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
                                <td className='border-r text-center py-2.5 table-info '><Clamp lines={2}> {item?.description ?? 'NA'}</Clamp></td>
                                <td className='border-r text-center py-2.5 table-info '>{item?.created_date && item?.created_time ? `${formatDate(item?.created_date)}, ${item?.created_time}` : 'NA'}</td>
                                <td className='border-r text-center py-2.5 table-info capitalize'>{item?.status ?? 'NA'}</td>
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

export default Notification;