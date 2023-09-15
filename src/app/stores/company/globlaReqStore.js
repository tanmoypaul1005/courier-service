import axios from "axios";
import { create } from "zustand";
import { kuGlobalRequestFilterList, kuGlobalRequestIndex } from "../../urls/companyUrl";
import { removeAnArrayItemOnce, removeEmpty, Toastr } from "../../utility/utilityFunctions";
import useGeneralStore from "../others/generalStore";
import useUtilityStore from "../others/utilityStore";
import useRequestStore from "../others/requestStore";
import { t } from "i18next";

const { setLoading } = useGeneralStore.getState();
const { setLoadingSearch } = useUtilityStore.getState();

const useGlobalReqStore = create((set) => ({

  showFilterGlobalReqModal: false,
  setShowFilterGlobalReqModal: (value) => set({ showFilterGlobalReqModal: value }),

  globalReqCurrentPage: 1,
  setGlobalReqCurrentPage: (value) => set({ globalReqCurrentPage: value }),

  globalReqFilterMode: false,
  setGlobalReqFilterMode: (value) => set({ globalReqFilterMode: value }),

  globalReqLastPage: 1,
  setGlobalReqLastPage: (value) => set({ globalReqLastPage: value }),

  globalReqCityList: [],
  setGlobalReqCityList: (value) => set({ globalReqCityList: value }),

  globalReqChipList: [],
  setGlobalReqChipList: (value) => set({ globalReqChipList: value }),

  globalReqFilterSelectedCity: [],
  setGlobalReqFilterSelectedCity: (value) => set({ globalReqFilterSelectedCity: value }),

  globalReqFilterSelectedTransport: '',
  setGlobalReqFilterSelectedTransport: (value) => set({ globalReqFilterSelectedTransport: value }),

  globalReqTransportList: [],
  setGlobalReqTransportList: (value) => set({ globalReqTransportList: value }),

  globalRequestList: [],
  setGlobalRequestList: (value) => set({ globalRequestList: value }),

  globalIndexForm: {
    is_web: 1,
    search_text: '',
    city: [],
    transport_type: '', // "Home Delivery",
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    search_type: "",
  },
  setGlobalIndexForm: (value) => set({ globalIndexForm: value }),
  resetGlobalIndexForm: () => set({
    globalIndexForm: {
      is_web: 1,
      // search_text: '',   //not clearing the search field by default
      city: [],
      transport_type: '', // "Home Delivery",
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
    }
  }),

}));

export default useGlobalReqStore;

//b _____________HELPER FUNCTIONS___________________

// convert city list for select data array
const handleCityArray = (array) => {
  let res = [];
  array.map((item, key) => {
    res.push({
      label: item,
      id: key + 1,
    });
  })
  // console.log('res array: ', res);
  return res;
}


//e  convert transport list for select data array
const handleTransportArray = (array) => {
  let res = [];
  array.map((item, key) => {
    res.push({
      title: item?.title,
      value: item?.id,
    });
  })
  console.log('res array(transport): ', res);
  return res;
}


//b   handle chip for search and filter
export const handleGlobalReqChipArray = (dataArray, indexToUpdate, newData) => {
  dataArray[indexToUpdate] = newData; //if any data is required to be updated specifically

  // remove any empty valued entries from the array
  return dataArray.filter(function ([key, item]) {
    return item !== undefined && item !== null && item !== "" && item !== false;
  });
  // return dataArray
};


//r    link Filter Chip With Api and state management  
export const linkGlobalReqFilterChipWithApi = async (parameter, value) => {
  const {
    globalIndexForm,
    setGlobalIndexForm,
    globalReqFilterSelectedCity,
    setGlobalReqFilterSelectedCity,
    setGlobalReqFilterSelectedTransport,
  } = useGlobalReqStore.getState();
  console.log("linkSearchFilterChipWithApi parameter :", parameter, 'value: ', value);

  switch (parameter) {
    case "transport_type":
      setGlobalReqFilterSelectedTransport('');
      setGlobalIndexForm({ ...globalIndexForm, transport_type: '' });
      getGlobalRequestList({ ...globalIndexForm, transport_type: '' }, true);
      break;

    case "start_date":
      setGlobalIndexForm({ ...globalIndexForm, start_date: '' });
      getGlobalRequestList({ ...globalIndexForm, start_date: '' }, true);
      break;

    case "end_date":
      setGlobalIndexForm({ ...globalIndexForm, end_date: '' });
      getGlobalRequestList({ ...globalIndexForm, end_date: '' }, true);
      break;

    case "start_time":
      setGlobalIndexForm({ ...globalIndexForm, start_time: '' });
      getGlobalRequestList({ ...globalIndexForm, start_time: '' }, true);
      break;

    case "end_time":
      setGlobalIndexForm({ ...globalIndexForm, end_time: '' });
      getGlobalRequestList({ ...globalIndexForm, end_time: '' }, true);
      break;

    case "city":
      let t_cities = [...globalIndexForm?.city];
      let t_cities_selected = [...globalReqFilterSelectedCity];
      t_cities = removeAnArrayItemOnce(t_cities, value);
      t_cities_selected = removeAnArrayItemOnce(t_cities_selected, value);
      setGlobalReqFilterSelectedCity(t_cities_selected);
      setGlobalIndexForm({ ...globalIndexForm, city: t_cities });
      getGlobalRequestList({ ...globalIndexForm, city: t_cities }, true);
      break;

    default:
      break;
  }
};


// l  ___________________API FUNCTIONS___________________________

// get global request list index
export const getGlobalRequestList = async (filterForm = { is_web: 1 }, pagination = false, searching = false, filtering) => {
  const {
    setGlobalRequestList,
    setGlobalReqChipList,
    setGlobalReqLastPage,
    globalReqLastPage,
    setGlobalReqCurrentPage,
    globalReqCurrentPage,
    globalRequestList,
    setGlobalReqFilterMode
  } = useGlobalReqStore.getState();


  try {
    if (searching)
      setLoadingSearch(true);
    else
      setLoading(true);
    filterForm = removeEmpty(filterForm);
    if (!filterForm.hasOwnProperty('search_text') || filterForm?.search_text === '') {
      delete filterForm?.search_text;
      delete filterForm?.search_type;
    }

    if (!filterForm.hasOwnProperty('is_web'))
      filterForm = { ...filterForm, is_web: 1 };

    console.log("getGlobalRequestList  BODY: ", filterForm);
    let res;
    if (pagination) {
      res = await axios.post(kuGlobalRequestIndex, filterForm);

      // if (globalReqCurrentPage > globalReqLastPage) return console.log('SKIPPING UNNECESSARY API CALL, ALL DATA LOADED! ');
      // res = await axios.post(kuGlobalRequestIndex + '?page=' + (globalReqCurrentPage), { ...filterForm, take: 20 });    //deprecated for now
    }
    else
      res = await axios.post(kuGlobalRequestIndex, filterForm);

    console.log("getGlobalRequestList res.data: ", res.data);
    if (res.data.success) {
      // setGlobalReqLastPage(res?.data?.data?.last_page);

      // if (globalReqCurrentPage > 1 && (globalReqCurrentPage !== (res?.data?.data?.last_page + 1))) {
      //   let temp_data = [...globalRequestList];
      //   res?.data?.data?.data?.map(item => temp_data.push(item));
      //   setGlobalRequestList(temp_data);
      // }
      // else
      setGlobalRequestList(res?.data?.data);

      // setGlobalRequestList(objectToArray(res?.data?.data));

      //e /    set the filter chip data 
      let chip_array = [];
      chip_array = Object.entries(filterForm);
      console.log("chip_array:::", chip_array);
      setGlobalReqChipList(chip_array);

      if (
        filterForm?.transport_type ||
        filterForm?.start_date ||
        filterForm?.end_date ||
        filterForm?.start_time ||
        filterForm?.end_time ||
        filterForm?.city?.length > 0
      )
        setGlobalReqFilterMode(true);
      else
        setGlobalReqFilterMode(false);

      setLoading(false);
      setLoadingSearch(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      setLoadingSearch(false);
      return false;
    }
  } catch (err) {
    console.log("getGlobalRequestList: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    setLoadingSearch(false);
    return false;
  }
};


// get global request filter list 
export const getGlobalReqDataList = async () => {
  const { setGlobalReqCityList, setGlobalReqTransportList } = useGlobalReqStore.getState();
  const { setTransportType, setCity } = useRequestStore.getState();

  try {
    setLoading(true);

    // console.log("getGlobalReqDataList  BODY: ", formData);
    const res = await axios.get(kuGlobalRequestFilterList);
    console.log("getGlobalReqDataList res.data: ", res.data);
    if (res.data.success) {
      setGlobalReqCityList(res?.data?.data?.cities);
      setGlobalReqTransportList(handleTransportArray(res?.data?.data?.transportation_types));
      setTransportType(res?.data?.data?.transportation_types);
      setCity(res?.data?.data?.cities);

      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log("getGlobalReqDataList: ", err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};