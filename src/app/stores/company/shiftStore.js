import axios from "axios";
import { create } from "zustand";
import { kuAddNewShift, kuAllCarsAndDriversList, kuAllShift, kuDeleteShift, kuFilterCarsAndDriversList, kuGetShiftRouteList, kuShiftDetails, kuShiftManagerTableData, kuUpdateShift } from "../../urls/companyUrl";
import { formatDate, formatDateV2, formatTime, formatTimeHourMinutes, getStringFromDateObject, removeEmpty, Toastr } from "../../utility/utilityFunctions";
import useGeneralStore from "../others/generalStore";
import useUtilityStore from "../others/utilityStore";
import { t } from "i18next";

const { setLoading } = useGeneralStore.getState();
const { setLoadingSearch } = useUtilityStore.getState();

const useShiftStore = create((set, get) => ({
  // value storing
  shiftFilterMode: false,
  setShiftFilterMode: (value) => set({ shiftFilterMode: value }),

  allShiftList: false,
  setAllShiftList: (value) => set({ allShiftList: value }),

  showCustomStopModal: false,
  setShowCustomStopModal: (value) => set({ showCustomStopModal: value }),

  customStopModalData: {},
  setCustomStopModalData: (value) => set({ customStopModalData: value }),

  filterShiftCarList: [],
  setFilterShiftCarList: (value) => set({ filterShiftCarList: value }),

  allShiftCarList: [],
  setAllShiftCarList: (value) => set({ allShiftCarList: value }),

  filterShiftDriverList: [],
  setFilterShiftDriverList: (value) => set({ filterShiftDriverList: value }),

  allShiftDriverList: [],
  setAllShiftDriverList: (value) => set({ allShiftDriverList: value }),

  shiftSearchFilterChip: [],
  setShiftSearchFilterChip: (value) => set({ shiftSearchFilterChip: value }),

  shiftRouteList: [],
  setShiftRouteList: (value) => set({ shiftRouteList: value }),

  shiftDetailsData: {},
  setShiftDetailsData: (value) => set({ shiftDetailsData: value }),

  shiftUpdateData: {
    id: "",
    driver_user_id: "",
    car_id: "",
    car_license_plate_number: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    comment: "",
    is_maintenance: "",
  },
  setShiftUpdateData: async (value) => {
    await set({ shiftUpdateData: value })
    return;
  },

  changeShiftUpdateData: async (name, value) => {
    await set({ shiftUpdateData: { ...get().shiftUpdateData, [name]: value } });
    return;
  },
  resetShiftUpdateData: () => set({
    shiftUpdateData: {
      id: "",
      driver_user_id: "",
      car_id: "",
      car_license_plate_number: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      comment: "",
      is_maintenance: "",
    }
  }),

  selectedDriver: "",
  setSelectedDriver: (value) => set({ selectedDriver: value }),

  addShiftForm: {
    driver_user_id: "",
    car_id: null,
    car_license_plate_number: '',
    start_date: null,
    end_date: '',
    start_time: null,
    end_time: null,
    comment: null,
    is_maintenance: false,
  },
  setAddShiftForm: async (value) => {
    await set({ addShiftForm: value })
    return;
  },
  resetAddShiftForm: () =>
    set({
      addShiftForm: {
        driver_user_id: "",
        car_id: null,
        car_license_plate_number: '',
        start_date: null,
        end_date: '',
        start_time: null,
        end_time: null,
        comment: null,
        is_maintenance: false,
        is_maintenance_req: false,
      },
    }),

  filterShiftList: {
    start_date: null,
    start_time: null,
    end_date: null,
    end_time: null,
    plate_number: "",
    driver_name: "",
    is_maintenance: null,
    is_maintenance_req: null,
    search: "",
    type: "",
    status: "",
  },
  setFilterShiftList: (value) => set({ filterShiftList: value }),
  resetFilterShiftList: () => {
    console.log("RESET FILTER DATA");
    useShiftStore.getState().setSelectedDriver("");
    set({
      filterShiftList: {
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        plate_number: "",
        driver_name: "",
        is_maintenance: null,
        search: "",
        type: "",
        status: "",
      },
    });
  },

  // modal states
  showAddShiftModal: false,
  setShowAddShiftModal: (value) => set({ showAddShiftModal: value }),

  showEditShiftModal: false,
  setShowEditShiftModal: (value) => set({ showEditShiftModal: value }),

  showDeleteShiftModal: false,
  setShowDeleteShiftModal: (value) => set({ showDeleteShiftModal: value }),

  showFilterShiftModal: false,
  setShowFilterShiftModal: (value) => set({ showFilterShiftModal: value }),

  // table view
  order: null,
  setOrder: (order) => {
    set({ order: order });
    return;
  },

  is_asc: 1,
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

  api_url: kuShiftManagerTableData,
  setApiUrl: (url) => {
    set({ api_url: url })
    return;
  },

  shift_table_data: null,
  setShiftTableData: (data) => set({ shift_table_data: data }),

  showDetailsModal: false,
  setShowDetailsModal: (data) => set({ showDetailsModal: data }),

  filter_form: {
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    plate_number: "",
    driver_id: '',
    status: '',
    is_maintenance: null,
  },
  setFilterForm: (e) => set({ filter_form: { ...get().filter_form, [e.target.name]: e.target.value } }),
  changeFilterForm: (name, value) => set({ filter_form: { ...get().filter_form, [name]: value } }),
  updateFilterForm: (data) => {
    set({ filter_form: data });
    return;
  },
  resetFilterForm: (is_planned) => {
    set({
      filter_form: {
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        plate_number: "",
        driver_id: '',
        status: '',
        is_maintenance: null,
      }
    })
    return;
  },

  filter_form_copy: {
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    plate_number: "",
    driver_id: '',
    status: '',
    is_maintenance: null,
  },
  updateFilterFormCopy: (data) => {
    set({ filter_form_copy: data });
    return;
  },
  resetFilterFormCopy: () => {
    set({
      filter_form_copy: {
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        plate_number: "",
        driver_id: '',
        status: '',
        is_maintenance: null,
      }
    })
    return;
  },
}));

export default useShiftStore;

//e      helper functions........


const carArrayCheckAndPush = (car_id) => {
  const { allShiftCarList, shiftDetailsData, setAllShiftCarList } = useShiftStore.getState();
  const result = allShiftCarList.find(item => item.id === car_id);

  if (result) {
    console.log('car found !', result);
    // let t_array = [...allShiftCarList];
    // t_array.push(result);
    // setAllShiftCarList(t_array);
    return;
  } else {
    let t_array = [...allShiftCarList];
    let t_car_item = {
      title: shiftDetailsData?.car?.name + '/' + shiftDetailsData?.car?.car_license_plate_number,
      value: shiftDetailsData?.car?.car_license_plate_number,
      id: car_id,
    };
    t_array.push(t_car_item);
    setAllShiftCarList(t_array);
    // console.log('new item set to : ', t_car_item);
  }
}

const driverArrayCheckAndPush = (driver_user_id) => {
  const { allShiftDriverList, setAllShiftDriverList, shiftDetailsData } = useShiftStore.getState();

  const result = allShiftDriverList.find(obj => obj.value === driver_user_id);
  if (result) {
    console.log('driver found !', result);
    // let t_array = [...allShiftDriverList];
    // t_array.push(result);
    // setAllShiftDriverList(t_array);
    return;
  } else {
    let t_array = [...allShiftDriverList];
    let t_car_item = {
      title: shiftDetailsData?.driver_user?.name,
      value: driver_user_id,
    };
    t_array.push(t_car_item);
    setAllShiftDriverList(t_array);
  }
}

// linkSearchFilterChipWithApi
export const linkSearchFilterChipWithApi = async (parameter) => {
  const { setFilterShiftList, filterShiftList, setSelectedDriver } = useShiftStore.getState();
  console.log("linkSearchFilterChipWithApi parameter :", parameter);

  switch (parameter) {
    case "start_date":
      setFilterShiftList({ ...filterShiftList, start_date: null });
      getAllShiftList({ ...filterShiftList, start_date: null }, "", true);
      break;

    case "start_time":
      setFilterShiftList({ ...filterShiftList, start_time: null });
      getAllShiftList({ ...filterShiftList, start_time: null }, "", true);
      break;

    case "end_date":
      setFilterShiftList({ ...filterShiftList, end_date: null });
      getAllShiftList({ ...filterShiftList, end_date: null }, "", true);
      break;

    case "end_time":
      setFilterShiftList({ ...filterShiftList, end_time: null });
      getAllShiftList({ ...filterShiftList, end_time: null }, "", true);
      break;

    case "plate_number":
      setFilterShiftList({ ...filterShiftList, plate_number: "" });
      getAllShiftList({ ...filterShiftList, plate_number: "" }, "", true);
      break;

    case "driver_name":
      setFilterShiftList({ ...filterShiftList, driver_name: "" });
      setSelectedDriver("");
      getAllShiftList({ ...filterShiftList, driver_name: "" }, "", true);
      break;

    case "is_maintenance":
      setFilterShiftList({ ...filterShiftList, is_maintenance: null });
      getAllShiftList({ ...filterShiftList, is_maintenance: null }, "", true);
      break;

    case "search":
      setFilterShiftList({ ...filterShiftList, search: "" });
      getAllShiftList({ ...filterShiftList, search: "" }, "", true);
      break;

    case "status":
      let t_filter_obj = { ...filterShiftList, status: "", type: "" };
      delete t_filter_obj['is_maintenance_req'];
      delete t_filter_obj['type'];
      console.log("t_filter_obj :", t_filter_obj);
      setFilterShiftList(t_filter_obj);

      getAllShiftList(t_filter_obj, "", true);

      break;

    default:
      break;
  }
};

//handle chip for search and filter
export const handleChipArray = (dataArray, indexToUpdate, newData) => {
  dataArray[indexToUpdate] = newData; //if any data is required to be updated specifically

  // remove any empty valued entries from the array
  return dataArray.filter(function ([key, item]) {
    return item !== undefined && item !== null && item !== "" && item !== false;
  });
  // return dataArray
};

export const FormatCarsArrayForSelectionList = (dataArray) => { //todo:: camel case
  let formattedArray = [];
  dataArray.map((item) => formattedArray.push({ title: item?.name + " / " + item?.car_license_plate_number, value: item?.car_license_plate_number, id: item?.id, }));

  return formattedArray;
};
export const FormatDriversArrayForSelectionList = (dataArray) => {
  let formattedArray = [];
  dataArray.map((item) => formattedArray.push({ title: item?.name, value: item?.id, }));

  return formattedArray;
};

// ==================================================================
//                       api functions........
// ==================================================================

//g      get shift list   
export const getAllShiftList = async (
  filterForm = {},
  search = "",
  chipLinked = false
) => {
  const { setAllShiftList, setShiftSearchFilterChip, setShiftFilterMode, setShiftRouteList } =
    useShiftStore.getState();
  try {
    if (search) setLoadingSearch(true);
    else setLoading(true);

    let isFiltering = false;
    let isMaintenanceReq = false;
    let t_is_maintenance = 0;
    if (filterForm?.is_maintenance_req) {
      isMaintenanceReq = filterForm?.is_maintenance_req;
      t_is_maintenance = filterForm?.is_maintenance ? 1 : 0;
    }

    // [ parameters and examples: ]

    // "start_date": "2022-06-30",
    // "start_time": "09:00",
    // "is_maintenance": 0
    // "end_date": "30-04-2022"
    // "end_time": "15:00"
    // "plate_number": "6843184",
    // "driver_name": "Mephisto",
    // "status": "init",
    // "type": "history"

    if (
      filterForm?.start_date ||
      filterForm?.start_time ||
      filterForm?.end_date ||
      filterForm?.end_time ||
      filterForm?.plate_number ||
      filterForm?.driver_name ||
      filterForm?.status ||
      filterForm?.type ||
      filterForm?.is_maintenance_req ||
      filterForm?.is_maintenance
    ) {
      setShiftFilterMode(true);
      isFiltering = true;
    }
    else setShiftFilterMode(false);

    let res = {};
    let body = {};
    if (filterForm || search) {
      // console.log("filterForm:::", filterForm);
      let currentDate = filterForm?.start_date ? new Date(filterForm?.start_date) : new Date();
      const futureDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);

      let yesterday = new Date(); //to compare if the start/end date is a past date and send type=history if a past start/end date is passed
      yesterday.setDate(new Date().getDate() - 1);

      body = {
        start_date: isFiltering ? filterForm?.start_date : getStringFromDateObject(new Date()),
        start_time: isFiltering ? filterForm?.start_time : "",
        end_date: isFiltering ? filterForm?.end_date : getStringFromDateObject(futureDate),
        end_time: isFiltering ? filterForm?.end_time : "",
        plate_number: isFiltering ? filterForm?.plate_number : "",
        driver_name: isFiltering ? filterForm?.driver_name : "",
        status: isFiltering ? filterForm?.status : "",
        type: ((new Date(filterForm?.start_date) <= new Date(yesterday)) || (new Date(filterForm?.end_date) <= new Date(yesterday))) && isFiltering ? "history" : "",
        is_maintenance: isFiltering ? filterForm?.is_maintenance ? 1 : 0 : "",
        search: filterForm?.search,
      };

      // return setLoading(false);
      body = removeEmpty(body);
      // return      

      // body = { ...body, type: "history" };
      console.log("shift INDEX body:::", body);
      res = await axios.get(kuAllShift, { params: isMaintenanceReq ? { ...body, is_maintenance: t_is_maintenance } : body });  //to filter by not started we need both status:init and is_maintenance:0 that's why kept this parameter (isMaintenanceReq) to process it exclusively
    }

    console.log("getAllShiftList: ", res.data);
    if (res.data.success) {

      //e     set/update chip array 
      let chip_array = [];
      chip_array = Object.entries(removeEmpty(filterForm));
      chip_array = handleChipArray(chip_array);
      // console.log("chip_array:::", chip_array);
      setShiftSearchFilterChip(chip_array);

      setAllShiftList(res.data.data);

      // get the filter resources
      getAllShiftCarsAndDriversList(null, null, null, null, false);

      setLoading(false);
      setLoadingSearch(false);

      // clear the route overview list so that each details must have a fresh one
      setShiftRouteList([]);

      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      setLoadingSearch(false);
      return false;
    }
  } catch (err) {
    console.log("getAllShiftList: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    setLoadingSearch(false);
    return false;
  }
};

// get shift-cars-drivers list
export const getAllShiftCarsAndDriversList = async (
  start_date = null,
  end_date = null,
  start_time = null,
  end_time = null,
  withLoading = true,
  is_edit = 0,
  shift_id,
) => {
  const { setAllShiftCarList, setAllShiftDriverList, setFilterShiftCarList, setFilterShiftDriverList, } =
    useShiftStore.getState();
  try {
    if (withLoading)
      setLoading(true);
    const body = {
      start_date: start_date,
      end_date: end_date,
      start_time: start_time,
      end_time: end_time,
      is_edit: is_edit,
      shift_id: shift_id
    };

    console.log('body', body);

    let res = {};
    if (start_date && end_date && start_time && end_time) {
      res = await axios.get(kuAllCarsAndDriversList, { params: body });   //to get only time and date wise available resources, for add / edit shift data
      console.log("getAllShiftCarsAndDriversList: ", res.data);
    }
    else {
      res = await axios.get(kuFilterCarsAndDriversList);    //to get all available resources, regardless of date and times, for shift-filter data
      console.log("getAllShiftCarsAndDriversList: ", res.data);
    }
    console.log("getAllShiftCarsAndDriversList: ", res.data);

    if (res.data.success) {
      if (start_date && end_date && start_time && end_time) {
        setAllShiftCarList(FormatCarsArrayForSelectionList(res?.data?.data?.cars));
        setAllShiftDriverList(FormatDriversArrayForSelectionList(res?.data?.data?.drivers));
      } else {
        setFilterShiftCarList(FormatCarsArrayForSelectionList(res?.data?.data?.cars));
        setFilterShiftDriverList(FormatDriversArrayForSelectionList(res?.data?.data?.drivers));
      }

      setLoading(false);
      return { cars: res?.data?.data?.cars, drivers: res?.data?.data?.drivers };
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("getAllShiftCarsAndDriversList: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};

//e     shift details
export const getShiftDetails = async (shift_id) => {
  const { setShiftDetailsData, setShiftUpdateData } = useShiftStore.getState();
  try {
    setLoading(true);

    console.log("getShiftDetails  BODY: ", shift_id);
    const res = await axios.get(kuShiftDetails, { params: { id: shift_id } });
    console.log("getShiftDetails res.data: ", res.data);
    if (res.data.success) {

      // get additional data of this shift for details

      //e    get route list for this shift
      if (res?.data?.data?.status === 'ongoing')
        getShiftRouteList(shift_id, false);

      //e    get car and driver list
      await getAllShiftCarsAndDriversList(
        res?.data?.data?.start_date,
        res?.data?.data?.end_date,
        formatTimeHourMinutes(res?.data?.data?.start_time),
        formatTimeHourMinutes(res?.data?.data?.end_time),
        false
      );

      setShiftDetailsData(res?.data?.data);
      setShiftUpdateData({
        id: res?.data?.data?.id,
        driver_user_id: res?.data?.data?.driver_user_id,
        car_id: res?.data?.data?.car_id,
        car_license_plate_number: res?.data?.data?.car?.car_license_plate_number,
        start_date: res?.data?.data?.start_date,
        end_date: res?.data?.data?.end_date,

        start_time: formatTimeHourMinutes(res?.data?.data?.start_time),
        end_time: formatTimeHourMinutes(res?.data?.data?.end_time),

        comment: res?.data?.data?.comment,
        is_maintenance: res?.data?.data?.is_maintenance,
      });


      carArrayCheckAndPush(res?.data?.data?.car_id);
      driverArrayCheckAndPush(res?.data?.data?.driver_user_id);


      setLoading(false);
      return true;
    } else {
      //Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("getShiftDetails: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};

// add new shift
export const addNewShift = async (formData) => {
  try {
    setLoading(true);
    let is_maintenance_temp = formData?.is_maintenance ? 1 : parseInt(formData?.is_maintenance) ? 1 : 0;
    formData = removeEmpty(formData);
    console.log("addNewShift  BODY: ", formData);
    const res = await axios.post(kuAddNewShift, { ...formData, is_maintenance: is_maintenance_temp });
    console.log("addNewShift res.data: ", res.data);
    if (res.data.success) {
      // getAllShiftList({});
      getShiftTableData({ filter: {} });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("addNewShift: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};


// update a shift
export const updateShift = async (formData, shift_id) => {
  try {
    setLoading(true);

    // formData = removeEmpty(formData);
    formData = { ...formData, is_maintenance: parseInt(formData.is_maintenance) }
    if (formData?.is_maintenance === 1)
      delete formData['comment'];

    console.log("updateShift  BODY: ", formData);
    // return 
    const res = await axios.post(kuUpdateShift, formData);
    console.log("updateShift res.data: ", res.data);
    if (res.data.success) {
      await getShiftDetails(shift_id);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("updateShift: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};


// get shift route list
export const getShiftRouteList = async (shift_id, withLoading = true) => {
  const { setShiftRouteList } = useShiftStore.getState();
  try {
    if (withLoading)
      setLoading(true);

    console.log("getShiftRouteList  BODY: ", shift_id);
    // return 
    const res = await axios.get(kuGetShiftRouteList, { params: { shift_id: shift_id } });
    console.log("getShiftRouteList res.data: ", res.data);
    if (res.data.success) {
      setShiftRouteList(res?.data?.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("getShiftRouteList: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};

// delete a shift
export const deleteShift = async (shift_id) => {
  try {
    setLoading(true);

    console.log("deleteShift  BODY: ", shift_id);
    const res = await axios.post(kuDeleteShift, { id: shift_id });
    console.log("deleteShift res.data: ", res.data);
    if (res.data.success) {
      getShiftTableData({ filter: {} });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("deleteShift: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};

// search shift list (local)
export const searchShiftList = async (searchKey = "") => {
  const { allShiftList } = useShiftStore.getState();
  try {
    setLoadingSearch(true);

    console.log("searchKey: ", searchKey);

    const entries = Object.entries(allShiftList);

    const result = entries.find(([key, value]) =>
      value.filter((item) => {
        if (
          searchKey.toLowerCase().includesitem?.driver_user?.name.toLowerCase()
        )
          return console.log(
            "track result: ",
            key,
            "item?.driver_user?.name: ",
            item?.driver_user?.name.toLowerCase()
          );
        else return null;
      })
    );

    if (result) {
      console.log("searchShiftList: ", result);
      // setAllShiftList(result);
    }
    setLoadingSearch(false);
  } catch (err) {
    console.log("searchShiftList: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoadingSearch(false);
  }
};


export const getShiftTableData = async ({ filter }) => {
  const { setShiftTableData, is_asc, take, order, search_key, api_url } = useShiftStore.getState();

  let body = {
    take: take,
    search: search_key,
    order_by: order,
    is_asc: is_asc,
    ...generateFilterData(filter),
  };

  console.log('body', body);

  try {
    if(search_key) setLoadingSearch(true); else setLoading(true);
    const res = await axios.get(api_url ?? kuShiftManagerTableData, { params: body });
    console.log('getShiftTableData:::', res.data);

    if (res?.data?.success) {
      setShiftTableData(res?.data?.data);
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      if(search_key) setLoadingSearch(true); else setLoading(true);
      return false;
    }
  } catch (error) {
    console.log('getShiftTableData:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    if(search_key) setLoadingSearch(true); else setLoading(true);
    return false;
  }
};

export const handleOrder = async (order_by, action) => {
  const { setIsAsc, is_asc, setOrder, setApiUrl, order } = useShiftStore.getState();
  await setOrder(order_by);
  if (order !== order_by) await setIsAsc(1);
  else await setIsAsc(is_asc ? 0 : 1);
  await setApiUrl(kuShiftManagerTableData);
  const success = await action();
  if (!success) setIsAsc(is_asc ? 0 : 1);
  if (!success && order !== order_by) setIsAsc(1);
}

export const defineScheduleInfo = (item) => {
  if (item?.start_date === item?.end_date)
    return `${formatDate(item?.start_date)}, ${formatTime(item?.start_time)} - ${formatTime(item?.end_time)}`;
  else
    return `${formatDate(item?.start_date)}, ${formatTime(item?.start_time)} - ${formatDate(item?.end_date)}, ${formatTime(item?.end_time)}`;
}

export const defineShiftStatus = (status) => {
  if (status === 'init') return 'Not Started';
  else if (status === 'in_progress') return 'In Progress';
  else if (status === 'complete') return 'Completed';
  else return status;
}

const generateFilterData = (filter) => {
  let x = {};

  if (filter?.start_date || filter?.start_date !== '') x.start_date = filter?.start_date;
  if (filter?.end_date) x.end_date = filter?.end_date;
  if (filter?.start_time) x.start_time = filter?.start_time;
  if (filter?.end_time) x.end_time = filter?.end_time;
  if (filter?.plate_number) x.plate_number = filter?.plate_number;
  if (filter?.driver_id) x.driver_id = filter?.driver_id;
  if (filter?.status) x.status = filter?.status;
  if (filter?.is_maintenance !== null ) x.is_maintenance = filter?.is_maintenance;
  return x;
}

export const validateDateTime = (start_date, start_time, end_date, end_time) => {
  const start_date_time = new Date(start_date + " " + start_time);
  const end_date_time = new Date(end_date + " " + end_time);
  if (end_date_time < start_date_time) {
    Toastr({ message: `Invalid date time!`, type: "warning" })
    return false
  } else return true;
}


// const defineEndDate = async () => {
//   if (shiftUpdateData?.start_date && shiftUpdateData?.start_time && shiftUpdateData?.end_time) {
//       console.log('shift update data', shiftUpdateData);
//       console.log('here', shiftUpdateData?.start_time, shiftUpdateData?.end_time);
//       if (shiftUpdateData?.start_time < shiftUpdateData?.end_time) {
//           const x = shiftUpdateData?.start_date
//           setShiftUpdateData({ ...shiftUpdateData, end_date: x });
//           console.log('end_date1', x);
//       }
//       if (shiftUpdateData?.start_time >= shiftUpdateData?.end_time) {
//           const x = forwardDate(shiftUpdateData?.start_date);
//           setShiftUpdateData({ ...shiftUpdateData, end_date: x });
//           console.log('end_date2', x);
//       }
//   }
// }