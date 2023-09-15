

import useGlobalReqStore from "../../../app/stores/company/globlaReqStore";
import useShiftStore, { } from "../../../app/stores/company/shiftStore";
import {
    iAwardedNormal,
    iAwardedSelected,
    iBiddingNormal,
    iBiddingSelected,
    iCarManagerNormal,
    iCarManagerSelected,
    iCompletedNormal,
    iCompletedSelected,
    iCreateReqNormal,
    iCreateReqSelected, iDriverManagerNormal, iDriverManagerSelected, iFavAddressNormal,
    iFavAddressSelected,
    iGlobalRequestNormal,
    iGlobalRequestSelected,
    iHistoryNormal,
    iHistorySelected,
    iHomeNormal,
    iHomeSelected,
    iInvitationNormal,
    iInvitationSelected,
    iNotPlannedNormal,
    iNotPlannedSelected,
    iOnGoingNormal,
    iOnGoingSelected,
    iReqNormal,
    iReqSelected,
    iSavedReqNormal,
    iSavedReqSelected, iSettingsNormal,
    iSettingsSelected, iShiftManagerNormal, iShiftManagerSelected
} from "../../../app/utility/imageImports";

const { resetFilterShiftList, setShiftSearchFilterChip,resetFilterForm } = useShiftStore.getState();
const { setGlobalIndexForm } = useGlobalReqStore.getState();

export const CompanySideBarList = [
    //home
    {
        onClick: () => { },
        title: "home",
        linkTo: "/",
        isActiveLink: "home",
        normalIcon: iHomeNormal,
        selectedIcon: iHomeSelected,
    },
    // request part (expandable)
    {
        onClick: () => { },
        title: "requests",

        isActiveLink: "expanded_bar",
        normalIcon: iReqNormal,
        selectedIcon: iReqSelected,
        expandedItems: [
            {
                title: "saved",
                link: "/requests/saved",
                normalIcon: iSavedReqNormal,
                selectedIcon: iSavedReqSelected,
                isActiveItem: true,
            },
            {
                title: "invitation",
                link: "/requests/invitation",
                normalIcon: iInvitationNormal,
                selectedIcon: iInvitationSelected,
                isActiveItem: true,
            },
            {
                title: "in bidding",
                link: "/requests/in-bidding",
                normalIcon: iBiddingNormal,
                selectedIcon: iBiddingSelected,
                isActiveItem: true,
            },
            {
                title: "not planned",
                link: "/requests/not-planned",
                normalIcon: iNotPlannedNormal,
                selectedIcon: iNotPlannedSelected,
                isActiveItem: true,
            },
            {
                title: "awarded",
                link: "/requests/awarded",
                normalIcon: iAwardedNormal,
                selectedIcon: iAwardedSelected,
                isActiveItem: true,
            },
            {
                title: "ongoing",
                link: "/requests/on-going",
                normalIcon: iOnGoingNormal,
                selectedIcon: iOnGoingSelected,
                isActiveItem: true,
            },
            {
                title: "completed",
                link: "/requests/completed",
                normalIcon: iCompletedNormal,
                selectedIcon: iCompletedSelected,
                isActiveItem: true,
            },
            {
                title: "history",
                link: "/requests/history",
                normalIcon: iHistoryNormal,
                selectedIcon: iHistorySelected,
                isActiveItem: true,
            },
        ],
    },

    // create request
    {
        onClick: () => {
            console.log('hello');
        },
        title: "create",
        linkTo: "/request/create",
        isActiveLink: "create",
        normalIcon: iCreateReqNormal,
        selectedIcon: iCreateReqSelected,
    },

    {
        onClick: () => {
            setGlobalIndexForm({});
        },
        title: "global request",
        linkTo: "/global-request",
        isActiveLink: "global-request",
        normalIcon: iGlobalRequestNormal,
        selectedIcon: iGlobalRequestSelected,
    },

    {
        onClick: async () => {
            if (!window.location.pathname.includes('/shift-manager'))
                localStorage.setItem('last_shift_item_id', 0);
            console.log('');
            resetFilterShiftList();
            resetFilterForm();
            setShiftSearchFilterChip([]);
            // await getAllShiftList(filterShiftList);
        },
        title: "shift manager",
        linkTo: "/shift-manager",
        isActiveLink: "shift-manager",
        normalIcon: iShiftManagerNormal,
        selectedIcon: iShiftManagerSelected,
    },

    {
        onClick: () => { },
        title: "driver manager",
        linkTo: "/driver-manager",
        isActiveLink: "driver-manager",
        normalIcon: iDriverManagerNormal,
        selectedIcon: iDriverManagerSelected,
    },

    {
        onClick: () => { },
        title: "car manager",
        linkTo: "/car-manager",
        isActiveLink: "car-manager",
        normalIcon: iCarManagerNormal,
        selectedIcon: iCarManagerSelected,
    },

    // fav address
    {
        onClick: () => { },
        title: "Favorite Addresses",
        linkTo: "/favorite-address",
        isActiveLink: "favorite-address",
        normalIcon: iFavAddressNormal,
        selectedIcon: iFavAddressSelected,
    },

    // settings
    {
        onClick: () => { },
        title: "settings",
        linkTo: "/settings",
        isActiveLink: "settings",
        normalIcon: iSettingsNormal,
        selectedIcon: iSettingsSelected,
    },

    //e      play ground    
    // {
    //     onClick: () => { },
    //     title: "Play Ground",
    //     linkTo: "/play",
    //     isActiveLink: "playground",
    //     normalIcon: iPlayGround,
    //     selectedIcon: iPlayGround,
    // },


];
export default CompanySideBarList;