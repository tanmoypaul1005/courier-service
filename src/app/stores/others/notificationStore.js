import axios from "axios";
import { create } from "zustand";
import { kuGetTableViewNotification, kuNotificationSeen } from "../../urls/commonUrl";
import { formatDate, Toastr } from "../../utility/utilityFunctions";
import useGeneralStore from "./generalStore";
import useUtilityStore from "./utilityStore";

const { setLoading, setHasUnseenNotification } = useGeneralStore.getState();

const { setLoadingSearch } = useUtilityStore.getState();

const useNotificationStore = create((set) => ({

    notificationList: [],
    setNotificationList: (value) => set({ notificationList: value }),

    notificationTempList: [],
    setNotificationTempList: (value) => set({ notificationTempList: value }),

    selectedIndex: null,
    setSelectedIndex: (value) => set({ selectedIndex: value }),

    selectedNotification: {},
    setSelectedNotification: (value) => set({ selectedNotification: value }),

    notificationDetails: {},
    setNotificationDetails: (value) => set({ notificationDetails: value }),

    notification_order_by: "created_at",
    setNotification_order_by: (value) => set({ notification_order_by: value }),

    notification_take: 10,
    setNotification_take: (value) => set({ notification_take: value }),

    notificationPageUrl: "",
    setNotificationPageUrl: (value) => set({ notificationPageUrl: value }),
    //All Modal

    notificationDropDownOpen: false,
    setNotificationDropDownOpen: (value) => set({ notificationDropDownOpen: value }),

    showNotificationDetailsModal: false,
    setShowNotificationDetailsModal: (value) => set({ showNotificationDetailsModal: value }),

    // table view
    order: null,
    setOrder: (order) => {
        set({ order: order });
        return;
    },

    is_asc: 0,
    setIsAsc: (data) => {
        set({ is_asc: data });
        return;
    },

    take: 10,
    setTake: (data) => {
        set({ take: data });
        return;
    },

    search_key: '',
    setSearchKey: (key) => {
        set({ search_key: key })
        return;
    },

    api_url: kuGetTableViewNotification,
    setApiUrl: (url) => {
        set({ api_url: url })
        return;
    },

    table_data: null,
    setTableData: (data) => set({ table_data: data }),

    showDetailsModal: false,
    setShowDetailsModal: (data) => set({ showDetailsModal: data }),

}));

export default useNotificationStore;

//Get Notification
export const getNotification2 = async (isRefresh = true, url = "", search = "", order_by = false) => {
    const { is_asc, notification_order_by, notification_take, setNotificationList, setNotificationTempList, setSelectedNotification, setSelectedIndex } = useNotificationStore.getState();

    let body = {}
    if (search === "" && order_by) {
        body = {
            take: notification_take,
            order_by: notification_order_by,
            is_asc: is_asc
        }
    } else if (search !== "" && order_by) {
        body = {
            take: notification_take,
            order_by: notification_order_by,
            is_asc: is_asc,
            search: search
        }
    } else if (search !== "" && !order_by) {
        body = {
            take: notification_take,
            search: search
        }
    } else {
        body = {
            take: notification_take,
        }
    }

    try {
        if (isRefresh) {
            if (search === "") {
                setLoading(true)
            } else { setLoadingSearch(true) }
        }
        const res = await axios.get(url === "" ? kuGetTableViewNotification : url, { params: body });
        console.log('getNotification::::::', res.data);

        if (res?.data?.success) {
            setNotificationList(res?.data?.data);
            setNotificationTempList(res.data.data);
            if (res.data.data.length > 0) {
                setSelectedIndex(0)
                setSelectedNotification(res.data.data[0]);
                checkUnseenNotification(res.data.data);
            }
        } else {
            Toastr({ "message": res?.data?.message, type: 'error' });
        }
        if (isRefresh) {
            if (search === "") {
                setLoading(false)
            } else { setLoadingSearch(false) }
        }
    } catch (error) {
        console.log('getNotification Error::::::', error);
        Toastr({ "message": "An error occurred!", type: 'error' });
        if (isRefresh) {
            if (search === "") {
                setLoading(false)
            } else { setLoadingSearch(false) }
        }
        return false;
    }
};

export const getNotification = async () => {

    const { setTableData, is_asc, take, order, search_key, api_url, setNotificationList } = useNotificationStore.getState();

    let body = {
        take: take,
        search: search_key,
        order_by: order,
        is_asc: is_asc,
    };

    console.log('body', body);

    try {
        if(search_key) setLoadingSearch(true); else setLoading(true);
        const res = await axios.get(api_url ?? kuGetTableViewNotification, { params: body });
        console.log('getNotification:::', res.data);

        if (res?.data?.success) {
            setTableData(res?.data?.data);
            setNotificationList(res?.data?.data);
            if(search_key) setLoadingSearch(false); else setLoading(false);
            return true;
        } else {
            Toastr({ "message": res?.data?.message, type: 'error' });
            if(search_key) setLoadingSearch(false); else setLoading(false);
            return false;
        }
    } catch (error) {
        console.log('getNotification:::', error);
        Toastr({ "message": "An error occurred!", type: 'error' });
        if(search_key) setLoadingSearch(false); else setLoading(false);
        return false;
    }
};

export const handleNotificationOrder = async (order_by, action) => {
    const { setIsAsc, is_asc, setOrder, setApiUrl, order } = useNotificationStore.getState();
    await setOrder(order_by);
    if (order !== order_by) await setIsAsc(1);
    else await setIsAsc(is_asc ? 0 : 1);
    await setApiUrl(kuGetTableViewNotification);
    const success = await action();
    if (!success) setIsAsc(is_asc ? 0 : 1);
    if (!success && order !== order_by) setIsAsc(1);
}

// Notification seen
export const notificationSeenFn = async (id, index) => {

    const { notificationList } = useNotificationStore.getState();

    try {
        // setLoading(true)
        const body = { id: id };
        const res = await axios.post(kuNotificationSeen, body);

        console.log('notificationSeenFn::::::', res.data);

        if (res?.data?.success) {
            let x = localStorage.getItem('numOfUnreadNotification').toString();
            let y = parseInt(x);
            localStorage.setItem("numOfUnreadNotification", --y);
            setHasUnseenNotification();
            getNotification(false);
        } else {
            notificationList[index].is_seen = 0;
            Toastr({ "message": res?.data?.message, type: 'error' });
        }
    } catch (error) {
        console.log('notificationSeenFn Error::::::', error);
        Toastr({ "message": "An error occurred!", type: 'error' });
        // setLoading(false);
        return false;
    }
};

export const selectNotification = (index, is_seen) => {
    const { setSelectedIndex, setSelectedNotification, notificationList, setNotificationList } = useNotificationStore.getState();
    setSelectedIndex(0);
    setSelectedNotification(notificationList[index]);
    setNotificationList([notificationList[index], ...notificationList?.filter(i => i?.id !== notificationList[index]?.id)])
    notificationList[index].is_seen = 1;
    (is_seen === 0) && notificationSeenFn(notificationList[index].id, index);
};

export const checkUnseenNotification = (notifications) => {
    let count = 0;
    for (let index = 0; index < notifications.length; index++) {
        if (notifications[index].is_seen === 0) count++;
    }
    localStorage.setItem("numOfUnreadNotification", count);
    setHasUnseenNotification();
}

//Search Notification
export const searchNotifications = (searchValue) => {

    const { setNotificationList, notificationTempList, setSelectedIndex, setSelectedNotification } = useNotificationStore.getState();

    setLoadingSearch(true)
    setSelectedIndex("");
    setSelectedNotification("")
    // eslint-disable-next-line array-callback-return
    const result = notificationTempList.filter((item) => {
        if (item.title) {
            let title = "";
            title = item?.title ?? "";
            if (
                title.toLowerCase().includes(searchValue.toLowerCase()) ||
                item?.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                formatDate(item?.created_date)?.toLowerCase().includes(searchValue.toLowerCase())
            ) {
                return item;
            }
        }
    });
    setLoadingSearch(false)
    setNotificationList(result);
};
