import axios from "axios";
import { create } from "zustand";
import { kuAddCar, kuAllCarTableData, kuDeleteCar, kuGetCarLicense, kuRenewCarLicense, kuUpdateCar } from "../../urls/companyUrl";
import { Toastr } from "../../utility/utilityFunctions";
import useGeneralStore from '../others/generalStore';
import useUtilityStore from "../others/utilityStore";
import { t } from "i18next";

const { setLoading } = useGeneralStore.getState();
const { setLoadingSearch } = useUtilityStore.getState();

const useCarStore = create((set, get) => ({

  allCarList: [],
  setAllCarList: (value) => set({ allCarList: value }),

  allCarListTemp: [],
  setAllCarListTemp: (value) => set({ allCarListTemp: value }),

  allCarLicenseList: [],
  setAllCarLicenseList: (value) => set({ allCarLicenseList: value }),

  selectedCarIndex: 0,
  setSelectedCarIndex: (value) => set({ selectedCarIndex: value }),

  carDetails: {},
  setCarDetails: (value) => set({ carDetails: value }),

  carSearchKey: '',
  setCarSearchKey: (value) => set({ carSearchKey: value }),

  carLicenseRenewID: -1,
  setCarLicenseRenewID: (value) => set({ carLicenseRenewID: value }),

  licenseAddUpdateForm: {
    id: 0,
    license_id: 0,
    license_start: '',
    purchase_license_comment: '',

  },
  setLicenseAddUpdateForm: (value) => set({ licenseAddUpdateForm: value }),
  resetLicenseAddUpdateForm: () => set({
    licenseAddUpdateForm: {
      id: 0,
      license_id: 0,
      license_start: '',
      purchase_license_comment: '',

    }
  }),

  updateCarForm: {
    id: 0,
    name: '',
    license_id: '',
    car_license_plate_number: '',
    license_start: '',
    image: '',
    comment: '',
  },
  setUpdateCarForm: (value) => set({ updateCarForm: value }),

  addCarForm: {
    id: 0,
    name: '',
    license_id: '',
    car_license_plate_number: '',
    license_start: '',
    image: '',
    comment: '',
  },
  setAddCarForm: (value) => set({ addCarForm: value }),
  resetAddCarForm: () => set({
    addCarForm: {
      id: 0,
      name: '',
      license_id: '',
      car_license_plate_number: '',
      license_start: '',
      image: '',
      comment: '',
    }
  }),

  //All Modal

  showAddCarModal: false,
  setShowAddCarModal: (value) => set({ showAddCarModal: value }),

  showEditCarModal: false,
  setShowEditCarModal: (value) => set({ showEditCarModal: value }),

  showCarLicensePackageModal: false,
  setShowCarLicensePackageModal: (value) => set({ showCarLicensePackageModal: value }),

  showCarDeleteModal: false,
  setShowCarDeleteModal: (value) => set({ showCarDeleteModal: value }),

  showCarLicenseSkip: false,
  setShowCarLicenseSkip: (value) => set({ showCarLicenseSkip: value }),

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

  api_url: kuAllCarTableData,
  setApiUrl: (url) => {
    set({ api_url: url })
    return;
  },

  car_table_data: null,
  setCarTableData: (data) => set({ car_table_data: data }),

  showDetailsModal: false,
  setShowDetailsModal: (data) => set({ showDetailsModal: data }),

}));

export default useCarStore;

// *******************************
//e      handler functions
// *******************************

//g        search car (local)   
export const searchCarList = async (searchKey) => {
  const { setAllCarList, allCarListTemp } = useCarStore.getState();
  try {
    setLoadingSearch(true);
    const result = allCarListTemp.filter((item) => {
      if (
        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.license_status.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.car_license_plate_number.toLowerCase().includes(searchKey.toLowerCase())
      ) {
        return item;
      } else return null;
    });

    // console.log("searchKey: ", searchKey, "result: ", result);

    setAllCarList(result);
    setLoadingSearch(false);
  } catch (err) {
    console.log('searchCarList: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoadingSearch(false);
  }
};


// ***********************
//        api calls
// ***********************

// get all cars index
export const getAllCar = async (setFirstItemSelected = true) => {
  // return;
  const { setAllCarList, setSelectedCarIndex, setCarDetails, setUpdateCarForm, setAllCarListTemp, setCarSearchKey } = useCarStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(kuAllCarTableData);
    console.log('getAllCar: ', res.data);

    if (res.data.success) {
      setAllCarList(res.data.data?.slice().reverse());
      setAllCarListTemp(res.data.data?.slice().reverse());
      setCarSearchKey('');

      if (setFirstItemSelected) {
        setCarDetails(res.data.data?.slice().reverse()[0]);      //y   setting the first item of the list as selected item 
        setSelectedCarIndex(0);
        setUpdateCarForm(res.data.data?.slice().reverse()[0]);      //e   same for editing purpose 
      }
    } else {
      Toastr({ message: res.data.message });
    }

    setLoading(false);
  } catch (err) {
    console.log('getAllCar: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
  }
};

// get license list
export const getAllLicenseList = async () => {
  const { setAllCarLicenseList } = useCarStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(kuGetCarLicense);
    console.log('getAllLicenseList: ', res.data);
    if (res.data.success) {
      setAllCarLicenseList(res.data.data);
    } else {
      Toastr({ message: res.data.message });
    }
    setLoading(false);
  } catch (err) {
    console.log('getAllLicenseList: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
  }
};

//l    apply license or update
export const updateOrApplyForLicense = async (data, doRenew = false) => {      // in order to update a license, use: [ doRenew = true ]
  const { setCarDetails, } = useCarStore.getState();

  // return console.log('data: ', data, '\n doRenew:', doRenew);
  try {
    let body = {};
    if (doRenew) {
      body = {
        id: data?.id,
        license_id: data?.license_id,
        renew_license_start: data?.license_start,
        purchase_license_comment: data?.purchase_license_comment,
      };
    } else {
      body = {
        id: data?.id,
        license_id: data?.license_id,
        license_start: data?.license_start,
        purchase_license_comment: data?.purchase_license_comment,
      };
    }

    setLoading(true)
    // console.log("Body before axios:::", body);
    let res = {};
    if (doRenew) {
      res = await axios.post(kuRenewCarLicense, body);
    } else {
      res = await axios.post(kuUpdateCar, body);
    }
    console.log('UpdateApplyForLicense: ', res.data);

    if (res.data.success) {
      await getCarsTableData()
      setCarDetails(res.data.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }

  } catch (err) {
    console.log('UpdateApplyForLicense: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
  }
};

//  add car data
export const addCar = async (data, imgUpdated = false) => {
  const { addCar, setCarDetails } = useCarStore.getState();
  try {
    setLoading(true);

    console.log("addCarForm: ", data);

    if (addCar?.car_license_plate_number?.length > 9) {
      Toastr({ message: t("License number max 9 characters"), type: "warning" });
      setLoading(false);
      return;
    }
    let body = {};
    if (imgUpdated) {
      body = {
        id: data?.id,
        name: data?.name,
        car_license_plate_number: data?.car_license_plate_number,
        image: data?.image,
        comment: data?.comment,

      };
    } else {
      body = {
        id: data?.id,
        name: data?.name,
        car_license_plate_number: data?.car_license_plate_number,
        comment: data?.comment,

      };
    }

    const res = await axios.post(kuAddCar, body);

    console.log('addCar - after axios: ', res.data.data.car);

    if (res.data.success) {
      await getCarsTableData();
      setCarDetails(res.data.data.car);
      setLoading(false);
      return true;
    } else {
      setLoading(false);
      Toastr({ message: res.data.message });
      return false;
    }

  } catch (error) {
    console.log('addCar: ', error);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
}

//  update car data
export const updateCar = async (data, imageUpdated = false) => {
  const { updateCar, setCarDetails } = useCarStore.getState();
  try {
    setLoading(true);

    console.log("updateCarForm: ", data);

    if (updateCar?.car_license_plate_number?.length > 9) {
      Toastr({ message: t("License number must be 9 digits"), type: "warning" });
      setLoading(false);
      return;
    }
    let body = {};
    if (imageUpdated) {
      body = {
        id: data?.id,
        name: data?.name,
        car_license_plate_number: data?.car_license_plate_number,
        image: data?.image,
        comment: data?.comment,

      };
    } else {
      body = {
        id: data?.id,
        name: data?.name,
        car_license_plate_number: data?.car_license_plate_number,
        comment: data?.comment,
      };
    }

    console.log('updateCar - BODY: ', body);

    const res = await axios.post(kuUpdateCar, body);

    console.log('updateCar - after axios: ', res.data);

    if (res.data.success) {
      await getCarsTableData();
      setCarDetails(res?.data?.data);
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }

  } catch (error) {
    console.log('updateCar: ', error);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
}


// delete car 
export const deleteCar = async (car_id) => {
  const { setShowDetailsModal, setApiUrl } = useCarStore.getState();
  try {
    setLoading(true);

    const body = { id: car_id };
    console.log(body);
    const res = await axios.post(kuDeleteCar, body);
    console.log('deleteCar', res.data);

    if (res.data.success) {
      await setApiUrl(kuAllCarTableData);
      await getCarsTableData();
      setShowDetailsModal(false)
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false);
      return false;
    }

  } catch (err) {
    console.log('deleteCar', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
};

export const getCarsTableData = async () => {

  const { setCarTableData, is_asc, take, order, search_key, api_url } = useCarStore.getState();

  let body = {
    take: take,
    search: search_key,
    order_by: order,
    is_asc: is_asc,
  };

  console.log('body', body);

  try {
    if(search_key) setLoadingSearch(true); else setLoading(true);
    const res = await axios.get(api_url ?? kuAllCarTableData, { params: body });
    console.log('getCarsTableData:::', res.data);

    if (res?.data?.success) {
      setCarTableData(res?.data?.data)
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return false;
    }
  } catch (error) {
    console.log('getCarsTableData:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    if(search_key) setLoadingSearch(false); else setLoading(false);
    return false;
  }
};



export const defineCarStatus = (status) => {
  if (status === 'expire_warning') return 'Expire soon';
  else if (status === 'no_license') return 'No License';
  else return status;
}

export const handleOrder = async (order_by, action) => {
  const { setIsAsc, is_asc, setOrder, setApiUrl, order } = useCarStore.getState();
  await setOrder(order_by);
  if (order !== order_by) await setIsAsc(1);
  else await setIsAsc(is_asc ? 0 : 1);
  await setApiUrl(kuAllCarTableData);
  const success = await action();
  if (!success) setIsAsc(is_asc ? 0 : 1);
  if (!success && order !== order_by) setIsAsc(1);
}