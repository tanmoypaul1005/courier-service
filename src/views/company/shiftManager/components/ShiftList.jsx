/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useShiftStore, { getAllShiftList, handleChipArray, linkSearchFilterChipWithApi } from '../../../../app/stores/company/shiftStore';
import { iFilterBlue, iFilterWhite, iInMaintenance, iWhitePlus } from '../../../../app/utility/imageImports';
import { formatDate, removeSecFromDeliveryTime } from '../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import SearchFilterChip from '../../../../components/chip/SearchFilterChip';
import CommonEmptyData from '../../../../components/emptyData/CommonEmptyData';
import CommonSearchBox from '../../../../components/input/CommonSearchBox';
import CommonListItem from '../../../../components/listItems/CommonListItem';
import CommonTopTitleSection from '../../../../components/title/CommonTopTitleSection';
import SecondaryTitle from '../../../../components/title/SecondaryTitle';
import ShiftManagerTable from '../ShiftManagerTable';
import { useTranslation } from 'react-i18next';

const ShiftList = () => {
    const navigateTo = useNavigate();
    const {
        setShowAddShiftModal,
        setShowFilterShiftModal,
        allShiftList,
        shiftSearchFilterChip,
        setShiftSearchFilterChip,
        filterShiftList,
        setFilterShiftList,
        resetFilterShiftList,
        setShiftFilterMode,
        shiftFilterMode,
        filterForm,
        setAllShiftCarList,
        setAllShiftDriverList,
    } = useShiftStore();

    let currentDate = filterForm?.start_date
        ? new Date(filterForm?.start_date)
        : new Date();
    const futureDate = new Date(
        currentDate.getTime() + 10 * 24 * 60 * 60 * 1000
    );

    const { t } = useTranslation();

    // const [debouncedSearchKey] = useDebounce(filterShiftList?.search, 500);

    // const entries = Object.entries(allShiftList);
    const totalShiftValues = Object.values(allShiftList);
    const totalShiftCount = totalShiftValues.reduce((acc, subArr) => acc + subArr.length, 0);
    // const firstTenShifts = entries.slice(0, 10);

    const map = new Map(Object.entries(allShiftList));
    const sortedEntries = Array.from(map).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    // const firstTenShifts = sortedEntries.slice(0, 10);

    const fetchAndExtractData = async () => {
        // await getAllShiftList(filterShiftList);
    }




    return (
        <>
            <div className='hidden'>

                {/*e             top part */}
                <CommonTopTitleSection
                    counter={totalShiftCount ?? 0}
                    title={t("Shift Manager")}
                    withReloader={true}
                    onReload={() => {
                        localStorage.setItem('last_shift_item_id', 0);
                        setShiftFilterMode(false);
                        resetFilterShiftList();

                        fetchAndExtractData();
                    }}
                    rightSideComponent={
                        <div className='flex 2lg:flex-row flex-col 2lg:items-center items-baseline space-y-2.5 2lg:space-y-0 2lg:space-x-2.5'>

                            <CommonSearchBox
                                value={filterShiftList?.search}
                                onChange={(e) => {
                                    setFilterShiftList({ ...filterShiftList, search: e.target.value });
                                }}
                            />


                            <div className='flex items-center space-x-2.5'>
                                <CommonButtonOutlined btnLabel={t('filter')} onClick={() => setShowFilterShiftModal(true)} iconLeft={iFilterWhite} iconLeftHover={iFilterBlue} />
                                <CommonButton
                                    icon={iWhitePlus}
                                    btnLabel={t('add shift')}
                                    onClick={() => {
                                        setAllShiftCarList([]);
                                        setAllShiftDriverList([]);

                                        setShowAddShiftModal(true)
                                    }} />
                            </div>
                        </div>
                    }
                />

                {/* search / filter chip list and clear button */}

                {filterShiftList?.search && !shiftFilterMode ?
                    <div
                        className='text-2xl limadi-medium pb-4'
                    >{t("Search results from")} {filterShiftList?.start_date ?? formatDate(new Date())} to {filterShiftList?.end_date ?? formatDate(futureDate)} </div>
                    : ""}


                {shiftSearchFilterChip?.length > 0 && shiftFilterMode ?
                    <div className="flex flex-wrap space-y-2 items-baseline space-x-2">
                        {shiftSearchFilterChip?.map(([key, value], index) =>
                            value && (key !== 'search' && key !== 'type' && key !== "is_maintenance_req") ?
                                <SearchFilterChip
                                    onCloseChip={() => {
                                        linkSearchFilterChipWithApi(key);
                                        let newChipArray = handleChipArray(shiftSearchFilterChip, index, '');
                                        // console.log('after close item, new chip array: ', newChipArray);
                                        // console.log('after close item, filterShiftList: ', filterShiftList);
                                        setShiftSearchFilterChip(newChipArray);
                                    }}
                                    key={index}
                                    title={value === 'not_started' ? 'not started' : value === 'started' ? 'ongoing' : value === 'init' ? 'not started' : value === 'complete' ? 'completed' : value}
                                /> : ""
                        )}

                        {/*p        chip list clear button logic */}
                        {shiftSearchFilterChip?.length === 1 && shiftSearchFilterChip[0][0] === 'search' && (shiftSearchFilterChip[0][0] !== 'type') && shiftSearchFilterChip[0][0] === "is_maintenance_req" ? "" :
                            <div className='pb-5'>
                                <SearchFilterChip
                                    onCloseChip={async () => {
                                        console.log("CLEARING FILTERS WITHOUT SEARCH BOX .....");
                                        setShiftFilterMode(false);
                                        setFilterShiftList({
                                            start_date: null,
                                            start_time: null,
                                            end_date: null,
                                            end_time: null,
                                            plate_number: "",
                                            driver_name: "",
                                            is_maintenance: null,
                                            search: filterShiftList?.search,
                                        });

                                        setShiftSearchFilterChip([]);
                                        await getAllShiftList({
                                            start_date: null,
                                            start_time: null,
                                            end_date: null,
                                            end_time: null,
                                            plate_number: "",
                                            driver_name: "",
                                            is_maintenance: null,
                                            search: filterShiftList?.search,
                                        });
                                    }}
                                    clearChip={true}
                                />
                            </div>
                        }
                    </div>
                    : ""
                }

                {/*l            main list area starts */}
                <>
                    {
                        sortedEntries?.length ?
                            sortedEntries.map(([key, value]) => (
                                <div key={key}>
                                    <SecondaryTitle title={formatDate(new Date(key))} />
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-8 pb-5">
                                        {
                                            value?.map((item, index) =>
                                                <CommonListItem
                                                    selected={parseInt(localStorage?.getItem('last_shift_item_id')) === item?.id}
                                                    borderColor={'#F89818'}
                                                    key={index}
                                                    withImage={item?.is_maintenance ? false : true}
                                                    imagePath={item?.driver_user?.image}
                                                    title={item?.is_maintenance ? "In Maintenance" : item?.driver_user?.name ? item?.driver_user?.name : "NA"}
                                                    // title={item?.driver_user?.name ?? "In Maintenance"}
                                                    subTitleOne={item?.car?.car_license_plate_number ?? 'NA'}
                                                    subTitleTwo={formatDate(item?.start_date) + ", " + removeSecFromDeliveryTime(item?.start_time) + " - " + removeSecFromDeliveryTime(item?.end_time)}
                                                    // subTitleTwo='Schedule 11. Jan 2023, 08:00 - 17:00'
                                                    iconNormal={iInMaintenance}
                                                    iconSelected={iInMaintenance}
                                                    onClick={() => {
                                                        localStorage.setItem('last_shift_item_id', item?.id);
                                                        navigateTo('details/' + item?.id);
                                                    }}

                                                    accentType={
                                                        item?.is_maintenance === 1 ? '' :
                                                            item?.status === 'init' ? 'danger'
                                                                : ''
                                                        // item?.status === 'ongoing' ? 'warning'
                                                    }

                                                    topRightComponent={
                                                        item?.is_maintenance === 1 ? 'In Maintenance' :
                                                            item?.status === 'init' ? 'not started'
                                                                : item?.status === 'complete' ? 'Completed'
                                                                    : item?.status
                                                    }
                                                    topRightComponentType={
                                                        item?.is_maintenance === 1 ? 'warning' :
                                                            item?.status === 'init' ? 'danger'
                                                                :
                                                                item?.status === 'ongoing' ? 'warning'
                                                                    :
                                                                    item?.status === 'complete' ? 'success'
                                                                        :
                                                                        item?.status === 'break' ? 'base'
                                                                            :
                                                                            ""
                                                    }
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                            : <CommonEmptyData
                                title={t('No shift found')}
                                details={t('Try again with different filters / search')}
                            />
                    }
                </>
            </div>

            <ShiftManagerTable tableTitleClassName='title' />
        </>
    )
}

export default ShiftList