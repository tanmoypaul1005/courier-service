/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import useGlobalReqStore, {
    getGlobalRequestList,
    linkGlobalReqFilterChipWithApi,
} from '../../../../app/stores/company/globlaReqStore';
import { iFilterBlue, iFilterWhite, iGlobeIcon } from '../../../../app/utility/imageImports';
import { changePageTitle, formatDate } from '../../../../app/utility/utilityFunctions';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import SearchFilterChip from '../../../../components/chip/SearchFilterChip';
import CommonEmptyData from '../../../../components/emptyData/CommonEmptyData';
import CommonSearchBox from '../../../../components/input/CommonSearchBox';
import CommonListItem from '../../../../components/listItems/CommonListItem';
import CommonTopTitleSection from '../../../../components/title/CommonTopTitleSection';
import GlobalRequestTable from '../GlobalRequestTable';
import { useTranslation } from 'react-i18next';

const GlobalRequestHome = () => {
    const {
        setShowFilterGlobalReqModal,
        globalRequestList,
        globalIndexForm,
        resetGlobalIndexForm,
        globalReqChipList,
        setGlobalReqChipList,
        setGlobalReqFilterSelectedCity,
        setGlobalIndexForm,
        globalReqFilterMode,
        setGlobalReqFilterMode,
        setGlobalReqFilterSelectedTransport,
    } = useGlobalReqStore();

    const { t } = useTranslation ();

    const navigateTo = useNavigate();

    const [searchValue] = useDebounce(globalIndexForm.search_text, 300);

    useEffect(() => {
        changePageTitle(t('Limadi | Global Request'));
        // setGlobalReqCurrentPage(1);
        // getGlobalRequestList(globalIndexForm, true);
        // getGlobalReqDataList();
    }, []);

    useEffect(() => {
        // getGlobalRequestList(globalIndexForm, false, true);
    }, [searchValue]);

    return (
        <>
            <div
                className='hidden'
                onClick={() => {

                }} >

                <CommonTopTitleSection title={`${t("Global Requests")} ( ` + (globalRequestList?.length ?? 0) + ' )'}
                    rightSideComponent={
                        <div>
                            <div className='flex lg:flex-row flex-col lg:items-center items-start space-y-2 lg:space-y-0 lg:space-x-3'>
                                <CommonSearchBox
                                    value={globalIndexForm?.search_text}
                                    onChange={(e) => {
                                        setGlobalIndexForm({ ...globalIndexForm, search_type: "search", search_text: e.target.value })
                                    }}

                                />
                                <CommonButtonOutlined onClick={() => setShowFilterGlobalReqModal(true)} btnLabel={t('Filter')} iconLeft={iFilterWhite} iconLeftHover={iFilterBlue} />
                            </div>
                        </div>
                    }
                    withReloader={true}
                    onReload={() => {
                        // setGlobalReqCurrentPage(1);
                        setGlobalIndexForm({ search_text: "" });
                        getGlobalRequestList({}, true, false);
                    }}
                />

                {(!globalReqFilterMode && globalIndexForm?.search_text) ? <div className="pb-6 limadi-medium text-2xl">Showing Search Results for '{searchValue}':</div> : ""}

                {/* b           chip list area */}
                {(globalReqChipList?.length > 0 && globalReqFilterMode) ?
                    <div className="pb-6 flex flex-wrap space-y-2 items-baseline space-x-2">
                        {globalReqChipList?.map(([key, value], index) =>
                            (key === 'search_text' || key === 'is_web' || key === 'search_type') ?
                                ""
                                : (key === 'city' && value && value?.length > 0) ?
                                    value?.map((city_item, city_index) =>
                                        <SearchFilterChip
                                            onCloseChip={() => {
                                                linkGlobalReqFilterChipWithApi(key, city_item);
                                            }}
                                            key={city_index}
                                            title={city_item}
                                        />)
                                    :
                                    <SearchFilterChip
                                        onCloseChip={() => {
                                            linkGlobalReqFilterChipWithApi(key);
                                        }}
                                        key={index}
                                        title={value ?? "NA"}
                                    />
                        )}

                        {/*r        chip list clear button logic */}
                        {globalReqChipList?.length === 1
                            && (globalReqChipList[0][0] === 'search_text' || globalReqChipList[0][0] === "is_web" || (globalReqChipList[1][0] === "city" && globalReqChipList[1][1]?.length > 0)) ? "" :
                            <div className='pb-0'>
                                {globalReqFilterMode ? <SearchFilterChip
                                    onCloseChip={async () => {
                                        console.log("CLEARING FILTERS WITHOUT SEARCH BOX .....");
                                        // setShiftFilterMode(false);
                                        if (globalIndexForm?.search_text)
                                            setGlobalIndexForm({
                                                is_web: 1,
                                                search_text: globalIndexForm?.search_text,
                                                search_type: globalIndexForm?.search_type,
                                                city: [],
                                                transport_type: '', // "Home Delivery",
                                                start_date: '',
                                                start_time: '',
                                                end_date: '',
                                                end_time: '',
                                            });
                                        else resetGlobalIndexForm();

                                        let apiCallSuccess = await getGlobalRequestList(globalIndexForm?.search_text ? { ...globalIndexForm } : { is_web: 1 }, true);
                                        if (apiCallSuccess) {
                                            setGlobalReqFilterSelectedTransport('');
                                            setGlobalReqFilterSelectedCity([]);
                                            setGlobalReqChipList([]);
                                            setGlobalReqFilterMode(false);
                                        }
                                    }}
                                    clearChip={true}
                                /> : ""}
                            </div>
                        }
                    </div>
                    : ""
                }


                {globalRequestList?.length > 0 ?
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-8 pb-5">
                        {globalRequestList?.map((item, index) =>
                            <CommonListItem
                                onClick={() => navigateTo("details/" + item?.id)}
                                iconNormal={iGlobeIcon}
                                title={item?.title ?? ''}
                                subTitleOne={item?.stops_count + (item?.stops_count > 1 ? ' Stops (' : ' Stop (') + item?.products_count + (item?.products_count > 1 ? ' Packages)' : ' Package)')}
                                subTitleTwo={'Bid Ends on ' + formatDate(item?.pickup_starts_date) + ', ' + item?.pickup_starts_time}
                            />
                        )}
                    </div>
                    : <div className='w-full flex justify-center items-center'>
                         <CommonEmptyData title={t('No Data Found')} details={t('Try again with different filters / search or reload.')} /> </div>
                }
            </div>

            <GlobalRequestTable tableTitleClassName={'title'} />
        </>
    )
}

export default GlobalRequestHome