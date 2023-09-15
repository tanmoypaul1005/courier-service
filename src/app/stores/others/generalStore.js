import axios from 'axios';
import { create } from 'zustand';
import { kuSetDeviceToken, } from '../../urls/commonUrl';
import { user_role } from '../../utility/const';
// import { Toastr } from '../../utility/utilityFunctions';
// import { t } from 'i18next';
// import { Toastr } from '../../utility/utilityFunctions';

const useGeneralStore = create((set, get) => ({

    home_info: null,
    setHomeInfo: (data) => set({ home_info: data }),
    isLoading: false,
    setLoading: (status) => set({ isLoading: status }),
    isLoadingSearch: false,
    setLoadingSearch: (status) => set({ isLoadingSearch: status }),
    test_data: null,
    setTestData: (data) => set({ test_data: data }),
    loaded: false,
    setLoaded: (data) => set({ loaded: data }),
    user_role: user_role.customer,
    setUserRole: (data) => set({ user_role: data }),
    show_shift_details_and_plan_modal: false,
    setShowShiftDetailsAndPlanModal: (data) => set({ show_shift_details_and_plan_modal: data }),
    showFavAddress: false,
    setShowFavAddress: (status) => set({ showFavAddress: status }),

    numOfUnreadNotification: 0,
    setHasUnseenNotification: () => {
        let count = localStorage.getItem('numOfUnreadNotification');
        set({ numOfUnreadNotification: count ? parseInt(count) : 0 })
    },

    isOnline: false,
    setIsOnline: (isOnline) => {
        // !get().isOnline && isOnline && Toastr({ message: t("You Are Online"), type: 'success' })
        // get().isOnline && !isOnline && Toastr({ message: t("You Are Offline"), type: 'warning' })
        set({ isOnline: isOnline })
    },
    path_record: { current: null, old: null },
    setPathRecord: (data) => {
        let x = get().path_record;

        if (!x?.current) {
            x.current = data;
        } else {
            x.old = x.current;
            x.current = data;
        }
        set({ path_record: x });
        return;
    },

    company_city: '',
    setCompanyCity: (city) => set((state) => (state.company_city = city)),
}))


export const setFirebaseDeviceToken = async (token) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post(kuSetDeviceToken, { user_id: user?.id, device_token: token });
        // console.table("Set Firebase Device Token: ", res.data);
        if (res.data.success) {
            localStorage.setItem("device_token", token);
        } else {
            // ToastrLoading(res.data.message, "stop", "error");
        }
    } catch (err) {
        console.log(err);
        // ToastrLoading("An error occurred!", "stop", "error");
    }
}


export const formatSearchAddressV2 = (data = [], has_postal_code = true) => {
    // console.log('formatSearchAddressV2', data);
    let temp_address = [];
    data.forEach((d) => {
        let x = d.address;
        let y = '';
        x?.street ? y += x.street + (x?.houseNumber ? ' ' : ', ') : y += '';
        x?.houseNumber ? y += x.houseNumber + ', ' : y += '';
        (has_postal_code && x?.postalCode) ? y += x.postalCode + ', ' : y += '';
        x?.city ? y += x.city + ', ' : y += '';
        x?.countryName ? y += x.countryName + ', ' : y += '';
        let count = y.split(',').length - 1;
        if (count > 0) y = y.substring(0, y.length - 2);
        (y.length !== 0) && temp_address.push({ ...d, title: y });
    })
    // console.log('temp_address', temp_address);
    return temp_address;
}

export const suggestionFormat = (x) => {
    // console.log('suggestionFormat', x);
    // console.log('suggestionFormat', x.street);
    let y = '';
    x?.street ? y += x.street + (x?.houseNumber ? ' ' : ', ') : y += '';
    x?.houseNumber ? y += x.houseNumber + ', ' : y += '';
    x?.city ? y += x.city + ', ' : y += '';
    x?.countryName ? y += x.countryName + ', ' : y += '';
    (x?.postalCode) ? y += x.postalCode + ', ' : y += '';
    let count = y.split(',').length - 1;
    if (count > 0) y = y.substring(0, y.length - 2);
    return y;
}





export default useGeneralStore;