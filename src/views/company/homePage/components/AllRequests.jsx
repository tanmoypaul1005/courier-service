import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useCommonHomeStore, { getCommonHomeIndex, searchCommonHomeReqList } from '../../../../app/stores/others/commonHomeStore';
import useGeneralStore from '../../../../app/stores/others/generalStore';
import { user_role as role } from '../../../../app/utility/const';
import { iAwardedNormal, iBiddingNormal, iCompletedNormal, iHistoryNormal, iInvitationNormal, iNotPlannedNormal, iOnGoingNormal, iSavedReq } from '../../../../app/utility/imageImports';
import { checkPastTime, formatDate, formatDateOrTime, formatTime } from '../../../../app/utility/utilityFunctions';
import CommonSearchBox from '../../../../components/input/CommonSearchBox';
import CommonListItem from '../../../../components/listItems/CommonListItem';
import RatingFiveStar from '../../../../components/rating/RatingFiveStar';
import CommonEmptyData from '../../../../components/emptyData/CommonEmptyData';
import useLayoutStore from '../../../../app/stores/others/layoutStore';

const AllRequests = () => {

    const { homeReqList, searchHomeReqList, setSearchHomeReqList } = useCommonHomeStore();
    const navigateTo = useNavigate();
    const { user_role } = useGeneralStore.getState();
    const { setShowExpandedSidebarItem } = useLayoutStore();


    const HandleIconReq = (item) => {
        if (item?.status === 'invitation') {
            return iInvitationNormal;
        } else if (item?.status === 'in_bidding') {
            return iBiddingNormal;
        } else if (item?.status === 'awarded' && item?.awarded_bidding.is_planned) {
            return iAwardedNormal;
        } else if (item?.status === 'awarded' && !item?.awarded_bidding.is_planned) {
            return iNotPlannedNormal;
        } else if (item?.status === 'ongoing') {
            return iOnGoingNormal;
        } else if (item?.status === 'complete') {
            return iCompletedNormal;
        } else if (item?.status === 'history') {
            return iHistoryNormal;
        } else {
            return iSavedReq;
        }

    }

    const HandleRequestSubtitleOne = (item) => {
        if (item?.status === 'invitation' || item?.status === 'in_bidding' || item?.status === 'awarded') {
            return `${item?.stops_count ?? 0} ${(item?.stops_count ?? 0) > 1 ? 'stops' : 'stop'} (${item?.products_count ?? 0} ${(item?.products_count ?? 0) > 1 ? 'packages' : 'package'})`;
        } else if (item?.status === 'ongoing' || item?.status === 'complete' || item?.status === 'history') {
            return `${item?.stops_complete_count ?? 0}/${item?.stops_count ?? 0} ${item?.stops_complete_count > 1 ? 'stops' : 'stop'} completed`;
        } else {
            return 'Saved in ' + (item?.status === 'init' ? 'pickup' : item?.status);
        }

    }

    const HandleRequestSubtitleTwo = (data) => {
        if (data?.status === 'invitation' || data?.status === 'in_bidding') {
            const x = checkPastTime(data?.pickup_starts_time, data?.pickup_starts_at);
            if (x) return 'Bidding closed';
            else return `Bid Ends on ${formatDate(data?.pickup_starts_at) ?? '--'}, ${formatTime(data?.pickup_starts_time) ?? '--'}`;
        } else if (data?.status === 'awarded' && data?.awarded_bidding.is_planned) {
            return `Starts on ${formatDate(data?.pickup_starts_at)}, ${formatDateOrTime(data?.pickup_starts_at, 'time')}`;
        } else if (data?.status === 'awarded' && !data?.awarded_bidding.is_planned) {
            return `Starts on ${formatDate(data?.pickup_starts_at)}, ${formatDateOrTime(data?.pickup_starts_at, 'time')}`;
        } else if (data?.status === 'ongoing') {
            if (data?.pickup_starts_in_raw <= 0) return 'Will be completed soon'
            else return `Exp. complete on ${formatDate(data?.req_expected_complete_at,) ?? '--'}, ${formatDateOrTime(data?.req_expected_complete_at) ?? '--'}`;
        } else if (data?.status === 'complete' || data?.status === 'history') {
            return `Completed on ${formatDate(data?.last_complete_stop_at) ?? '--'}, ${formatDateOrTime(data?.last_complete_stop_at) ?? '--'}`;
        } else {
            return `Last saved on ${formatDate(data?.last_updated) ?? '--'}`;
        }


    }

    const HandleRequestItemTopRightInfo = (data) => {

        if (data?.status === 'in_bidding') {
            return user_role === role.customer ? (`DKK ${data?.min_budget ?? 0} - ${data?.min_budget ?? 0}`) : `DKK ${data?.my_bid ?? 0}`;
        } else if (data?.status === 'awarded' && data?.awarded_bidding.is_planned) {
            return `DKK ${data?.awarded_bidding?.budget}`;
        } else if (data?.status === 'awarded' && !data?.awarded_bidding.is_planned) {
            return `DKK ${data?.awarded_bidding?.budget}`;
        } else if (data?.status === 'history' && user_role === role.customer) {
            return <RatingFiveStar />;
        }

    }

    const HandleRequestItemTopRightInfoType = (data) => {
        if (data?.status === 'history' && user_role === role.customer) {
            return 'accent';
        }
        else return null;

    }

    const handleNavigateTo = (data) => {
        if (data?.status === 'invitation') {
            navigateTo(`/requests/saved/details/${data?.id}`);
        } else if (data?.status === 'in_bidding') {
            navigateTo(`/requests/in-bidding/details/${data?.id}`);
        } else if (data?.status === 'awarded' && data?.awarded_bidding.is_planned) {
            navigateTo(`/requests/awarded/details/${data?.id}`);
        } else if (data?.status === 'awarded' && !data?.awarded_bidding.is_planned) {
            navigateTo(`/requests/not-planned/details/${data?.id}`);
        } else if (data?.status === 'ongoing') {
            navigateTo(`/requests/on-going/details/${data?.id}`);
        } else if (data?.status === 'complete') {
            navigateTo(`/requests/completed/details/${data?.id}`);
        } else if (data?.status === 'history') {
            navigateTo(`/requests/history/details/${data?.id}`);
        } else navigateTo(`/requests/saved/details/${data?.id}`);

        setShowExpandedSidebarItem(true);
    }

    const checkIsSubtitleOneRed = (item) => {
        if (item?.status === 'complete' || item?.status === 'history') {
            if (item?.stops_complete_count !== item?.stops_count) return true;
            else return false;
        }
    }

    const [searchValue] = useDebounce(searchHomeReqList, 500);

    useEffect(() => {
        if (searchValue) searchCommonHomeReqList(searchValue);
        else getCommonHomeIndex();

    }, [searchValue]);

    return (
        <div className='mt-7'>
            {/* Bidding Title & Search start */}
            <div className='flex justify-between items-center w-full mb-4'>
                <div className='sub-title'>All Requests ( {homeReqList?.length ?? 0} ) </div>

                <CommonSearchBox
                    value={searchHomeReqList}
                    onChange={async (e) => {
                        setSearchHomeReqList(e.target.value);
                    }}
                    onSearchClear={() => { }}
                    withClearSearch={false}
                />
            </div>

            {/* Bidding Title & Search end */}

            {/* In Bidding */}
            {homeReqList?.length > 0 ? <div className='flex justify-center '>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-8'>
                    {

                        homeReqList.map((item, index) => (
                            <div className=''>
                                <CommonListItem
                                    key={index}
                                    onClick={() => { handleNavigateTo(item) }}

                                    title={item?.title ?? 'NA'}
                                    subTitleOne={HandleRequestSubtitleOne(item)}
                                    subTitleOneRed={checkIsSubtitleOneRed(item)}
                                    subTitleTwo={HandleRequestSubtitleTwo(item)}

                                    iconNormal={HandleIconReq(item)}
                                    iconSelected={HandleIconReq(item)}

                                    topRightComponent={HandleRequestItemTopRightInfo(item)}
                                    topRightComponentType={HandleRequestItemTopRightInfoType(item)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div> :
                <CommonEmptyData title='Request Not Available' details='No request available, please create first.' button={true}
                    onClick={() => navigateTo('/request/create')} />
            }
        </div>
    );
};

export default AllRequests;