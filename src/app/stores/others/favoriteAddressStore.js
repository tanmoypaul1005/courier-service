import axios from "axios";
import { create } from "zustand";
import { kuAddFavoriteAddress, kuDeleteFavoriteAddress, kuFavoriteAddressList, kuUpdateFavoriteAddress } from "../../urls/commonUrl";
import { Toastr } from "../../utility/utilityFunctions";
import useGeneralStore from "./generalStore";
import useUtilityStore from "./utilityStore";
import { t } from "i18next";
const { setLoading } = useGeneralStore.getState();

const { setLoadingSearch } = useUtilityStore.getState();

const useFavoriteAddressStore = create((set, get) => ({

  favoriteAddressList: [],
  setFavoriteAddressList: (value) => set({ favoriteAddressList: value }),

  tempFavoriteAddress: [],
  setTempFavoriteAddress: (value) => set({ tempFavoriteAddress: value }),

  favoriteAddressDetails: {},
  setFavoriteAddressDetails: (value) => set({ favoriteAddressDetails: value }),

  selectedFavoriteAddressIndex: 0,
  setSelectedFavoriteAddressIndex: (value) => set({ selectedFavoriteAddressIndex: value }),

  selectedFavoriteAddressDeleteId: null,
  setSelectedFavoriteAddressDeleteId: (value) => set({ selectedFavoriteAddressDeleteId: value }),

  addAddressLabel: "",
  setAddAddressLabel: (value) => set({ addAddressLabel: value }),

  favoriteAddressSearchValue: "",
  setFavoriteAddressSearchValue: (value) => set({ favoriteAddressSearchValue: value }),

  editFavoriteAddress_form: { fav_id: "", title: "", address: "", note: "", lat: "", lng: "" },
  setEditFavoriteAddress_form: (value) => set({ editFavoriteAddress_form: value }),

  addFavoriteAddress_form: { title: "", address: "", note: "", lat: "", lng: "" },
  setAddFavoriteAddress_form: (value) => set({ addFavoriteAddress_form: value }),

  favoriteAddressTake: 10,
  setFavoriteAddressTake: (value) => set({ favoriteAddressTake: value }),

  favAddress_order_by: 'id',
  setFavAddress_order_by: (value) => set({ favAddress_order_by: value }),


  favAddressPageUrl: "",
  setFavAddressPageUrl: (value) => set({ favAddressPageUrl: value }),


  //All Modal
  showAddFavoriteAddressModal: false,
  setShowAddFavoriteAddressModal: (value) => set({ showAddFavoriteAddressModal: value }),

  showEditFavoriteAddressModal: false,
  setShowEditFavoriteAddressModal: (value) => set({ showEditFavoriteAddressModal: value }),

  showFavoriteAddressDeleteModal: false,
  setShowFavoriteAddressDeleteModal: (value) => set({ showFavoriteAddressDeleteModal: value }),

  showFavoriteAddressDetailsModal: false,
  setShowFavoriteAddressDetailsModal: (value) => set({ showFavoriteAddressDetailsModal: value }),

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

  api_url: kuFavoriteAddressList,
  setApiUrl: (url) => {
    set({ api_url: url })
    return;
  },

  table_data: null,
  setTableData: (data) => set({ table_data: data }),

}));
export default useFavoriteAddressStore;

// get Favorite Address

export const getFavoriteAddress = async () => {

  const { setTableData, is_asc, take, order, search_key, api_url } = useFavoriteAddressStore.getState();

  let body = {
    take: take,
    search: search_key,
    order_by: order,
    is_asc: is_asc,
  };

  console.log('body', body);

  try {
    if(search_key) setLoadingSearch(true); else setLoading(true);
    const res = await axios.get(api_url ?? kuFavoriteAddressList, { params: body });
    console.log('getFavoriteAddress:::', res.data);

    if (res?.data?.success) {
      setTableData(res?.data?.data);
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return false;
    }
  } catch (error) {
    console.log('getFavoriteAddress:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    if(search_key) setLoadingSearch(false); else setLoading(false);
    return false;
  }
};

export const getFavoriteAddress2 = async (isRefresh = true, url = "", search = "", order = false) => {

  const { is_asc, favAddress_order_by, favoriteAddressTake, setFavoriteAddressList, setFavoriteAddressDetails, setTempFavoriteAddress, setSelectedFavoriteAddressIndex } = useFavoriteAddressStore.getState();

  let body = {};

  if (search === "" && order) {
    body = {
      take: favoriteAddressTake,
      order_by: favAddress_order_by,
      is_asc: is_asc
    }
  } else if (search !== "" && order) {
    body = {
      take: favoriteAddressTake,
      order_by: favAddress_order_by,
      is_asc: is_asc,
      search: search
    }

  } else if (search !== "" && !order) {
    body = {
      take: favoriteAddressTake,
      search: search
    }
  } else {
    body = {
      take: favoriteAddressTake,
    }
  }

  try {
    if (search === "") { setLoading(true) } else { setLoadingSearch(true) }
    const res = await axios.get(url === "" ? kuFavoriteAddressList : url, {
      params: body
    });
    console.log('getFavoriteAddress:::', res.data);
    if (res?.data?.success) {
      setFavoriteAddressList(res?.data?.data)
      setTempFavoriteAddress(res?.data?.data?.data)
      if (isRefresh) {
        setFavoriteAddressDetails(res?.data?.data[0])
        setSelectedFavoriteAddressIndex(0)
      }
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    if (search === "") { setLoading(false) } else { setLoadingSearch(false) }
  } catch (error) {
    console.log('getFavoriteAddress:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    if (search === "") { setLoading(false) } else { setLoadingSearch(false) }
    return false;
  }
};

export const handleFavAddressOrder = async (order_by, action) => {
  const { setIsAsc, is_asc, setOrder, setApiUrl, order } = useFavoriteAddressStore.getState();
  await setOrder(order_by);
  if (order !== order_by) await setIsAsc(1);
  else await setIsAsc(is_asc ? 0 : 1);
  await setApiUrl(kuFavoriteAddressList);
  const success = await action();
  if (!success) setIsAsc(is_asc ? 0 : 1);
  if (!success && order !== order_by) setIsAsc(1);
}

// Add Favorite Address
export const addFavoriteAddress = async () => {

  const { addFavoriteAddress_form } = useFavoriteAddressStore.getState();

  try {
    setLoading(true)
    const res = await axios.post(kuAddFavoriteAddress, addFavoriteAddress_form,);
    console.log('addFavoriteAddress:::', res.data);
    if (res?.data?.success) {
      getFavoriteAddress();

      setLoading(false)
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false)
      return false;
    }
  } catch (error) {
    console.log('addFavoriteAddress:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

// Edit Favorite Address
export const editFavoriteAddress = async () => {

  const { editFavoriteAddress_form, } = useFavoriteAddressStore.getState();

  try {
    setLoading(true)
    const res = await axios.post(kuUpdateFavoriteAddress, editFavoriteAddress_form);
    console.log('editFavoriteAddress:::', res?.data);
    if (res?.data?.success) {
      getFavoriteAddress();
      setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log('editFavoriteAddress:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

// Delete Favorite Address
export const deleteFavoriteAddress = async (favAddress_id) => {
  try {
    setLoading(true)
    const res = await axios.post(kuDeleteFavoriteAddress, { fav_id: favAddress_id });
    console.log('deleteFavoriteAddress:::', res.data);
    if (res?.data?.success) {
      getFavoriteAddress();
      setLoading(false)
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false)
      return false;
    }
  } catch (error) {
    console.log('deleteFavoriteAddress:::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

//Search Favorite Address
export const searchFavoriteAddress = (searchValue) => {

  const { setFavoriteAddressList, tempFavoriteAddress, setFavoriteAddressDetails, setSelectedFavoriteAddressIndex, setAddAddressLabel } = useFavoriteAddressStore.getState();

  setLoadingSearch(true);
  setFavoriteAddressDetails({})
  setSelectedFavoriteAddressIndex("")
  // eslint-disable-next-line array-callback-return
  const result = tempFavoriteAddress?.filter((item) => {
    if (
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.address.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return item;
    }
  });

  setLoadingSearch(false)
  setAddAddressLabel("")
  setFavoriteAddressList(result);
};

//select Favorite Address
export const selectFavoriteAddress = async (item) => {

  const { setSelectedFavoriteAddressIndex, setFavoriteAddressDetails, favoriteAddressList, setFavoriteAddressList, } = useFavoriteAddressStore.getState();

  await setFavoriteAddressDetails(item);
  await setFavoriteAddressList([item, ...favoriteAddressList?.filter(i => i?.id !== item?.id)])
  setSelectedFavoriteAddressIndex(0);
}