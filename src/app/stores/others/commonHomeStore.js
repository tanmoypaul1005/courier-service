import axios from 'axios';
import { create } from 'zustand';
import { kuCommonHome, kuGetRequests } from '../../urls/commonUrl';
import { Toastr } from '../../utility/utilityFunctions';
import useGeneralStore from './generalStore';
import useUtilityStore from './utilityStore';
import { k_home_card_types } from '../../utility/const';

const { setLoading } = useGeneralStore.getState();
const { setLoadingSearch } = useUtilityStore.getState();

const useCommonHomeStore = create((set, get) => ({
    // value storing
    homePageData: {},
    setHomePageData: (value) => set({ homePageData: value }),

    homeReqList: [],
    setHomeReqList: (data) => {
        const { saved, invitation, in_bidding, awarded, ongoing, complete, history } = data;
        let not_planned = [];
        let planned = [];
        awarded.forEach((item) => {
            if (item.awarded_bidding.is_planned) planned.push(item);
            else not_planned.push(item);
        });

        set({ homeReqList: [...saved, ...invitation, ...in_bidding, ...not_planned, ...planned, ...ongoing, ...complete, ...history] });
    },

    //for local search only
    homeReqListCustomer: [],
    setHomeReqListCustomer: (data) => {
        const { in_bidding } = data;
        set({ homeReqListCustomer: [...in_bidding] });
    },

    selectedReqType: 0,
    setSelectedReqType: (value) => set({ selectedReqType: value }),

    searchHomeReqList: '',
    setSearchHomeReqList: (value) => set({ searchHomeReqList: value }),



    home_location_points: [],
    setHomeLocationPoints: (data) => set({ home_location_points: data }),

    selectedCard: k_home_card_types.in_bidding,
    setSelectedCard: (value) => set({ selectedCard: value }),

}));


export default useCommonHomeStore;


// get common home index
export const getCommonHomeIndex = async (withLoading = true, getReqType = 0) => {
    const { setHomePageData } = useCommonHomeStore.getState();
    const { user_role } = useGeneralStore.getState();
    try {
        if (withLoading)
            setLoading(true);

        const res = await axios.get(kuCommonHome, { params: { is_web: 1 } });
        console.log("getCommonHomeIndex res.data: ", res.data);
        if (res.data.success) {
            await getCommonHomeReqList(user_role === 'company' ? 99 : getReqType, false);
            setHomePageData(res?.data?.data);
            setLoading(false);
            generateHomeLocationPoints(res?.data?.data);
            return true;
        } else {
            console.warn('warning: ', res?.data);
            Toastr({ message: res.data.message });
            setLoading(false);
            return false;
        }
    } catch (err) {
        console.error("getCommonHomeIndex: ", err);
        Toastr({ message: "An error occurred!" });
        setLoading(false);
        return false;
    }
};

//get request list
export const getCommonHomeReqList = async (getReqType = 0, withLoading = true) => {
    // req types and mode: 0 = in bidding, 1 = awarded and 2 = on going
    const { setHomeReqList, setHomeReqListCustomer } = useCommonHomeStore.getState();
    try {
        if (withLoading)
            setLoading(true);

        const res = await axios.get(kuGetRequests);
        console.log("getCommonHomeReqList res.data: ", res.data);
        if (res.data.success) {
            setHomeReqList(res.data?.data);
            setHomeReqListCustomer(res.data?.data);

            setLoading(false);
            return true;
        } else {
            console.warn('warning: ', res?.data);
            Toastr({ message: res.data.message });
            setLoading(false);
            return false;
        }
    } catch (err) {
        console.error("getCommonHomeReqList: ", err);
        Toastr({ message: "An error occurred!" });
        setLoading(false);
        return false;
    }
}

//search request list
export const searchCommonHomeReqList = async (searchKey) => {
    // req types and mode: 0 = in bidding, 1 = awarded and 2 = on going
    const { setHomeReqList, setHomeReqListCustomer } = useCommonHomeStore.getState();
    try {
        // if (withLoading)
        setLoadingSearch(true);

        const res = await axios.get(kuGetRequests, { params: { search: searchKey } });
        console.log("searchCommonHomeReqList res.data: ", res.data);
        if (res.data.success) {
            setHomeReqList(res.data?.data);
            setHomeReqListCustomer(res.data?.data);

            setLoadingSearch(false);
            return true;
        } else {
            console.warn('warning: ', res?.data);
            Toastr({ message: res.data.message });
            setLoadingSearch(false);
            return false;
        }
    } catch (err) {
        console.error("searchCommonHomeReqList: ", err);
        Toastr({ message: "An error occurred!" });
        setLoadingSearch(false);
        return false;
    }
}

const generateHomeLocationPoints = (data) => {
    let home_location_points = []
    if (data?.ongoing_track_shift?.length > 0) {
        data.ongoing_track_shift.forEach((shift) => {
            home_location_points.push({ pickup_lat: shift.lat, pickup_lng: shift.lng })
        })
    } else {
        if (data.user.lat !== null) home_location_points.push({ pickup_lat: data.user.lat, pickup_lng: data.user.lng })
        // else home_location_points.push({ pickup_lat: 55.747781, pickup_lng: 12.3043962 })
    }

    useCommonHomeStore.getState().setHomeLocationPoints(home_location_points)
}
