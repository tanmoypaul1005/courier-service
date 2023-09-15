import { useLocation, useNavigate } from 'react-router-dom';
import { defineAccentType, defineIsDangerStatus } from '../../../../app/stores/others/requestStore';
import React, { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useCommonHomeStore, { getCommonHomeIndex, searchCommonHomeReqList } from '../../../../app/stores/others/commonHomeStore';
import { iAwarded, iBiddingNormal, iOnGoingNormal } from '../../../../app/utility/imageImports';
import { formatDate, getTimeFromDate } from '../../../../app/utility/utilityFunctions';
import CommonSearchBox from '../../../../components/input/CommonSearchBox';
import CommonListItem from '../../../../components/listItems/CommonListItem';
import NoBidding from './NoBidding';
import useLayoutStore from '../../../../app/stores/others/layoutStore';

const ReqListArea = () => {
    const { homeReqListCustomer, selectedReqType, searchHomeReqList, setSearchHomeReqList } = useCommonHomeStore();
    const navigateTo = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { setShowExpandedSidebarItem } = useLayoutStore();

    const [searchValue] = useDebounce(searchHomeReqList, 500);

    useEffect(() => {
        if (searchValue) searchCommonHomeReqList(searchValue);
        else getCommonHomeIndex();

    }, [searchValue]);

    return (
        <div>
            {/* Bidding Title & Search start */}

            <div className='flex justify-between items-center mb-4'>
                <div className='sub-title'>In Bidding</div>
                <CommonSearchBox
                    value={searchHomeReqList}
                    onChange={async (e) => {
                        setSearchHomeReqList(e.target.value);
                    }}
                    withClearSearch={true}
                // value={searchText}
                />
            </div>

            {/* Bidding Title & Search end */}

            {/* In Bidding */}
            <div className='flex justify-center '>
                {
                    homeReqListCustomer?.length > 0 ?
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-8'>
                            {homeReqListCustomer.map((item, index) => (
                                <CommonListItem
                                    key={index}
                                    iconNormal={selectedReqType === 0 ? iBiddingNormal : selectedReqType === 1 ? iAwarded : iOnGoingNormal}

                                    title={item?.title}
                                    subTitleOne={selectedReqType === 2 ? (item?.stops_complete_count ?? 0) + ' stops out of ' + (item?.stops_count ?? 0) + ' completed' : item?.stops_count + ' Stops ( ' + item?.products_count + ' Packages )'}
                                    subTitleTwo={selectedReqType === 0 ? 'Bid Ends at ' + item?.pickup_starts_time + ', ' + formatDate(item?.pickup_starts_date) : selectedReqType === 1 ? 'Start ' + item?.pickup_starts_time + ' - p_e_time, ' + formatDate(item?.pickup_starts_date) : 'Exp. Completed On: ' + formatDate(item?.last_complete_stop_at) + ', ' + getTimeFromDate(item?.last_complete_stop_at)}

                                    topRightComponent={'DKK ' + item?.min_budget?.toLocaleString("da-DK") + ' - ' + item?.max_budget?.toLocaleString("da-DK")}
                                    onClick={() => {
                                        navigateTo(`requests/in-bidding/details/${item?.id}`);
                                        setShowExpandedSidebarItem(true);
                                    }}
                                    accentType={defineAccentType(item, path)}
                                    isDanger={defineIsDangerStatus(item, path)}
                                />
                            ))}
                        </div>

                        : <NoBidding />
                }
            </div>
        </div >
    );
};

export default ReqListArea;