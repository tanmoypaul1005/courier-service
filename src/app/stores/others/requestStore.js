import axios from 'axios';
import { t } from 'i18next';
import { create } from 'zustand';
import RatingFiveStar from '../../../components/rating/RatingFiveStar';
import { kuAvailableShift, kuAwardRequest, kuCancelRequestInvitation, kuDeleteRequestInvitationBidding, kuGetRequests, kuGetRequestsNew, kuNotPlannedShiftAssign, kuRequestAcknowledge, kuRequestAction, kuRequestDelete, kuRequestDetails, kuShiftPlannerDetails, kuSubmitRequestInvitationBidding, kuUpdateRequestInvitationBidding } from '../../urls/commonUrl';
import { kuAdvanceCalculation, kuFastCalculation, kuGlobalRequestTableIndex } from '../../urls/companyUrl';
import { kuWriteReview } from '../../urls/customerUrl';
import { k_data_set, k_request_paths, k_request_types, user_role as role } from '../../utility/const';
import { iSavedReq, iInvitationNormal, iBiddingNormal, iAwardedNormal, iNotPlannedNormal, iOnGoingNormal, iCompletedNormal, iHistoryNormal, iSavedReqSelected, iHistorySelected } from '../../utility/imageImports';
import { checkPastTime, formatDate, formatDateOrTime, formatTime, Toastr } from '../../utility/utilityFunctions';
import useGeneralStore from './generalStore';
import useLayoutStore from './layoutStore';
import useUtilityStore from './utilityStore';

const { setLoadingSearch } = useUtilityStore.getState();

const useRequestStore = create((set, get) => ({
  requests_path: k_request_paths.saved,
  setRequestsPath: (path) => set(() => ({ requests_path: path })),
  requests: {},
  setRequests: (data) => {
    const { saved, invitation, in_bidding, awarded, ongoing, complete, history } = data;
    let not_planned = [];
    let planned = [];
    awarded.forEach((item) => {
      if (item.awarded_bidding.is_planned) planned.push(item);
      else not_planned.push(item);
    });

    if (useGeneralStore.getState().user_role === role.customer) {
      planned = [...planned, ...not_planned];
    }

    set({ requests: { saved, invitation, in_bidding, not_planned, planned, ongoing, complete, history } });
    get().setCurrentRequests(get().requests_path);
  },
  current_requests: [],
  setCurrentRequests: (path) => {
    const { saved, invitation, in_bidding, not_planned, planned, ongoing, complete, history } = get().requests;
    if (path === k_request_paths.saved) {
      set({ current_requests: saved });
      set({ temp_current_requests: saved });
    } else if (path === k_request_paths.invitation) {
      set({ current_requests: invitation });
      set({ temp_current_requests: invitation });
    } else if (path === k_request_paths.in_bidding) {
      set({ current_requests: in_bidding });
      set({ temp_current_requests: in_bidding });
    } else if (path === k_request_paths.not_planned) {
      set({ current_requests: not_planned });
      set({ temp_current_requests: not_planned });
    } else if (path === k_request_paths.awarded) {
      set({ current_requests: planned });
      set({ temp_current_requests: planned });
    } else if (path === k_request_paths.ongoing) {
      set({ current_requests: ongoing });
      set({ temp_current_requests: ongoing });
    } else if (path === k_request_paths.completed) {
      set({ current_requests: complete });
      set({ temp_current_requests: complete });
    } else if (path === k_request_paths.history) {
      set({ current_requests: history });
      set({ temp_current_requests: history });
    }
  },
  temp_current_requests: [],
  setTempCurrentRequests: (data) => set({ temp_current_requests: data }),
  setCurrentRequestsFromData: (data) => set({ current_requests: data }),
  requestsSearchKey: '',
  setRequestsSearchKey: (key) => set({ requestsSearchKey: key }),
  request_details: {},
  setRequestDetails: (data) => set({ request_details: data }),
  place_bid_form: { budget: '', description: '' },
  setPlaceBidForm: (e) => set({ place_bid_form: { ...get().place_bid_form, [e.target.name]: e.target.value } }),
  updatePlaceBidForm: (data) => set({ place_bid_form: data }),
  resetPlaceBidForm: () => set({ place_bid_form: { budget: '', description: '' } }),
  available_shifts: [],
  setAvailableShifts: (data) => {
    // let x = [];
    // for (let key in data) {
    //   x = [...x, ...data[key]];
    // }
    set({ available_shifts: data });
  },
  shift_details: {},
  setShiftDetails: (data) => set({ shift_details: data }),
  selected_shift_index: null,
  setSelectedShiftIndex: (data) => set({ selected_shift_index: data }),
  is_fast_calculation: true,
  setIsFastCalculation: (data) => set({ is_fast_calculation: data }),

  fastCalculationData: null,
  setFastCalculationData: (data) => set({ fastCalculationData: data }),

  advanceCalculationData: null,
  setAdvanceCalculationData: (data) => set({ advanceCalculationData: data }),

  not_planned_stops: [],
  generateStops: (data) => {
    set({ not_planned_stops: [] });
    let x = [];
    data?.stops?.forEach(item => {
      const stop = {
        id: item.id,
        date: data.date,
        start_time: "",
        end_time: "",
      }
      x.push(stop);
    })
    set({ not_planned_stops: x });
    console.log('generateStops:', x);
  },
  updateStopInfo: (index, name, value) => {
    let x = get().not_planned_stops;
    x[index][name] = value;
    set({ not_planned_stops: x });
  },

  // table view states
  transport_type: [],
  setTransportType: (data) => {
    let x = [];
    data.forEach(element => {
      x.push({ title: element?.title, value: element?.title })
    });
    set({ transport_type: x })
  },

  awarded_company: [],
  setAwardedCompany: (data) => {
    let x = [];
    data?.forEach(element => {
      x.push({ title: element?.name, value: element?.id })
    });
    set({ awarded_company: x })
  },

  shift_drivers: [],
  setShiftDrivers: (data) => {
    let x = [];
    data?.forEach(element => {
      x.push({ title: element?.name, value: element?.id })
    });
    set({ shift_drivers: x })
  },

  customers: [],
  setCustomers: (data) => {
    let x = [];
    data?.forEach(element => {
      x.push({ title: element?.name, value: element?.id })
    });
    set({ customers: x })
  },

  city: [],
  setCity: (data) => {
    let x = [];
    data?.forEach(element => {
      x.push({ title: element?.name, value: element?.id })
    });
    set({ city: x })
  },

  search_key: '',
  setSearchKey: (key) => {
    set({ search_key: key })
    return;
  },

  request_api_url: kuGetRequestsNew,
  setRequestApiUrl: (url) => {
    set({ request_api_url: url })
    return;
  },

  global_request_api_url: kuGlobalRequestTableIndex,
  setGlobalRequestApiUrl: (url) => {
    set({ global_request_api_url: url })
    return;
  },

  requests_order: null,
  setRequestsOrder: (order) => {
    set({ requests_order: order });
    return;
  },

  is_asc: 1,
  setIsAsc: (data) => {
    set({ is_asc: data });
    return;
  },

  request_take: 10,
  setRequestTake: (data) => {
    set({ request_take: data });
    return;
  },


  request_filter_form: {
    transport_type: '',
    pickup_date_from: '',
    pickup_date_to: '',
    saved_date_from: '',
    saved_date_to: '',
    completed_to: '',
    completed_from: '',
    exp_date_to: '',
    exp_date_from: '',
    min_budget: '',
    max_budget: '',
    awarded_company: '',
    status: '',
    shift_driver: '',
    customer_from: '',
    from_date: '',
    to_date: '',
    start_time: '',
    end_time: '',
    city: [],
    bids_end_from: '',
    bids_end_to: '',
  },
  // setFilterForm: (key) => {
  //   set({ request_filter_form: key })
  //   return;
  // },
  setRequestFilterForm: (e) => set({ request_filter_form: { ...get().request_filter_form, [e.target.name]: e.target.value } }),
  changeRequestFilterForm: (name, value) => set({ request_filter_form: { ...get().request_filter_form, [name]: value } }),
  updateRequestFilterForm: (data) => {
    set({ request_filter_form: data });
    return;
  },

  resetRequestFilterForm: (is_planned) => {
    set({
      request_filter_form: {
        transport_type: '',
        pickup_date_from: '',
        pickup_date_to: '',
        saved_date_from: '',
        saved_date_to: '',
        completed_to: '',
        completed_from: '',
        exp_date_to: '',
        exp_date_from: '',
        min_budget: '',
        max_budget: '',
        awarded_company: '',
        status: '',
        is_planned: is_planned,
        shift_driver: '',
        customer_from: '',
        from_date: '',
        to_date: '',
        start_time: '',
        end_time: '',
        city: [],
        bids_end_from: '',
        bids_end_to: '',
      }
    })
    return;
  },

  request_filter_form_copy: {
    transport_type: '',
    pickup_date_from: '',
    pickup_date_to: '',
    saved_date_from: '',
    saved_date_to: '',
    completed_to: '',
    completed_from: '',
    exp_date_to: '',
    exp_date_from: '',
    min_budget: '',
    max_budget: '',
    awarded_company: '',
    status: '',
    shift_driver: '',
    customer_from: '',
    from_date: '',
    to_date: '',
    start_time: '',
    end_time: '',
    city: [],
    bids_end_from: '',
    bids_end_to: '',
  },
  updateRequestFilterFormCopy: (data) => {
    set({ request_filter_form_copy: data });
    return;
  },
  resetRequestFilterFormCopy: () => {
    set({
      request_filter_form_copy: {
        transport_type: '',
        pickup_date_from: '',
        pickup_date_to: '',
        saved_date_from: '',
        saved_date_to: '',
        completed_to: '',
        completed_from: '',
        exp_date_to: '',
        exp_date_from: '',
        min_budget: '',
        max_budget: '',
        awarded_company: '',
        status: '',
        shift_driver: '',
        customer_from: '',
        from_date: '',
        to_date: '',
        start_time: '',
        end_time: '',
        city: [],
        bids_end_from: '',
        bids_end_to: '',
      }
    })
    return;
  },

  filter_range: null,
  changeFilterRange: (name, value) => set({ filter_range: { ...get().filter_range, [name]: value } }),

  filter_range_copy: null,
  changeFilterRangeCopy: (name, value) => set({ filter_range_copy: { ...get().filter_range_copy, [name]: value } }),

  resetFilterRange: () => {
    get().changeFilterRange('value', [get().filter_range?.min ?? 0, get().filter_range?.max ?? 100]);
  },

  clearFilterRange: () => {
    set({ filter_range: null })
    set({ filter_range_copy: null })
  },


  setTableRequests: (data) => {
    if (data?.all) get().setAllRequests(data?.all);
    if (data?.saved) get().setSaved(data?.saved);
    if (data?.invitations) get().setInvitation(data?.invitations);
    if (data?.in_bidding) get().setInBidding(data?.in_bidding);
    if (data?.awarded) get().setAwarded(data?.awarded);
    if (data?.not_planned) get().setAwarded(data?.not_planned);
    if (data?.ongoing) get().setOngoing(data?.ongoing);
    if (data?.complete) get().setCompleted(data?.complete);
    if (data?.history) get().setHistory(data?.history);
  },

  all_requests: null,
  setAllRequests: (data) => set({ all_requests: data }),

  saved: null,
  setSaved: (data) => set({ saved: data }),

  invitation: null,
  setInvitation: (data) => set({ invitation: data }),

  in_bidding: null,
  setInBidding: (data) => set({ in_bidding: data }),

  not_planned: null,
  setNotPlanned: (data) => set({ not_planned: data }),

  awarded: null,
  setAwarded: (data) => set({ awarded: data }),

  ongoing: null,
  setOngoing: (data) => set({ ongoing: data }),

  completed: null,
  setCompleted: (data) => set({ completed: data }),

  history: null,
  setHistory: (data) => set({ history: data }),

  global_request: null,
  setGlobalRequest: (data) => set({ global_request: data }),

}));

export default useRequestStore;

const { setLoading } = useGeneralStore.getState();

export const getRequests = async () => {
  const { setRequests } = useRequestStore.getState();
  setLoading(true);
  try {
    const res = await axios.get(kuGetRequests);
    console.log('getRequestIndex: ', res.data);

    if (res.data.success) setRequests(res?.data?.data);
    else Toastr({ message: res?.data?.message })

    setLoading(false)
  } catch (err) {
    Toastr(({ message: t("An error occurred!") }))
    setLoading(false)
    console.log('getRequestIndex: ', err)
  }
};

export const getRequestDetails = async (type, id) => {
  if (!id) {
    Toastr({ message: t("Invalid Request!") })
  return;
  }
  const { setRequestDetails } = useRequestStore.getState();

  const data_set = defineDataSet(type);

  setLoading(true);
  
  console.log("id",id)
  console.log("data_set",data_set)

  try {
    const res = await axios.get(kuRequestDetails, { params: { id: id, data_set: data_set } });
    console.log('getRequestDetails: ', res.data.data);

    if (res?.data?.success) {
      setRequestDetails(res?.data?.data);

    } else {
      // Toastr({ message: res?.data?.message })
    }

    setLoading(false);
  } catch (err) {
    console.log('getRequestDetails: ', err);
    Toastr(({ message: t("An error occurred!") }));
    setLoading(false);
  }
}

export const deleteRequest = async (request_id) => {
  if (!request_id) {
    Toastr({ message: "Invalid Request!" })
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(kuRequestDelete, { id: request_id });

    console.log('deleteRequest: ', res.data);
    if (res.data.success) {
      // Toastr({ message: res.data.message, type: 'success' });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message })
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log('deleteRequest: ', err);
    Toastr(({ message: t("An error occurred!") }));
    setLoading(false);
    return false;
  }
}

export const submitOrUpdateRequestInvitationBidding = async (type = 'submit', id, navigateTo, navigateLink) => {
  const { place_bid_form, resetPlaceBidForm } = useRequestStore.getState();

  if (!id) {
    Toastr({ message: t("Invalid Request!"), type: 'warning' });
    return;
  }

  setLoading(true)

  try {
    const res = await axios.post((type === 'submit' ? kuSubmitRequestInvitationBidding : kuUpdateRequestInvitationBidding),
      { id: id, budget: place_bid_form.budget, details: place_bid_form.description });

    console.log("submitOrUpdateRequestInvitationBidding: ", res.data);

    if (res.data.success) {
      // Toastr({ message: res?.data?.message, type: 'success' });
      await getRequests();
      resetPlaceBidForm();
      setLoading(false);
      if (type === 'submit') navigateTo(navigateLink);
      return true;
    } else {
      Toastr({ message: res?.data?.message });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log('submitOrUpdateRequestInvitationBidding: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
}

export const declineRequestInvitation = async (id, comment) => {
  if (!id) {
    Toastr({ message: t("Invalid Request!"), type: 'warning' });
    return;
  }

  setLoading(true)

  try {
    const res = await axios.post(kuCancelRequestInvitation, { req_id: id, decline_comment: comment });
    console.log("declineRequestInvitation: ", res.data);
    if (res.data.success) {
      setLoading(false)
      // Toastr({ message: res?.data?.message, type: 'success' });
      return true;
    } else {
      Toastr({ message: res?.data?.message });
      setLoading(false)
      return false;
    }
  } catch (err) {
    console.log('declineRequestInvitation: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false)
    return false;
  }
}

export const getRequestShiftPlannerList = async (start_time, end_time, start_date) => {
  console.log('date, time', start_date, start_time, end_time);
  if (!start_date || !start_time || !end_time) {
    Toastr({ message: t("Invalid Shift Schedule!"), type: 'warning' });
    return;
  }
  setLoading(true);
  try {
    const res = await axios.get(kuAvailableShift + `?start_time=${start_time}&end_time=${end_time}&date=${start_date}`);
    console.log("getRequestShiftPlannerList:", res.data);
    if (res.data.success) {
      useRequestStore.getState().setAvailableShifts(res.data.data);
    } else {
      // Toastr({ message: res.data.message });
    }
    setLoading(false)
  } catch (err) {
    console.log('getRequestShiftPlannerList: ', err);
    //Toastr({ message: t("An error occurred!") });
    setLoading(false)
  }
};

export const getShiftDetails = async (id) => {
  if (!id) {
    Toastr({ message: t("Invalid Shift!"), type: 'warning' });
    return;
  }

  const { setShiftDetails } = useRequestStore.getState();
  try {
    setLoading(true);
    const res = await axios.get(kuShiftPlannerDetails + `?id=${id}`);
    console.log("getShiftDetails:", res.data);

    if (res.data.success) {
      setShiftDetails(res.data.data);
    } else {
      //Toastr({ message: res.data.message });
    }
    setLoading(false);
  } catch (err) {
    console.log('getShiftDetails: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
  }
};

export const requestAction = async (request_id, action, reason = null) => {
  setLoading(true);
  try {
    const res = await axios.post(kuRequestAction, { id: request_id, action: action, reason: reason });
    console.log('requestAction: ', res.data);

    if (res.data.success) {
      // Toastr({ message: res?.data?.message, type: 'success' });
      setLoading(false);
      return false;
    } else {
      Toastr({ message: res?.data?.message })
      setLoading(false);
      return false;
    }

  } catch (err) {
    console.log('requestAction: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
}

export const deleteInBiddingRequest = async (bidding_id, dcr_comment) => {
  if (bidding_id === null) {
    Toastr({ message: t("Invalid Bidding!"), type: 'warning' });
    return;
  }

  setLoading(true)

  try {
    const res = await axios.post(kuDeleteRequestInvitationBidding, { id: bidding_id, dcr_comment: dcr_comment });

    console.log("deleteInBiddingRequest: ", res.data);

    if (res.data.success) {
      setLoading(false)
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false)
      return false
    }
  } catch (err) {
    console.log('deleteInBiddingRequest: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false)
    return false
  }
}

export const awardRequest = async (id) => {
  try {
    if (id == null) {
      Toastr({ message: t("Invalid Request!"), type: 'warning' })
      return;
    }

    setLoading(true);
    const res = await axios.post(kuAwardRequest, { id: id });
    console.log('awardRequest: ', res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: 'success' });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message })
      setLoading(false);
      return false;
    }

  } catch (err) {
    console.log('awardRequest: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
}

export const acknowledgeRequest = async (request_id, acknowledgement_message) => {
  if (request_id === null) {
    Toastr({ message: t("Invalid Request!"), type: 'warning' });
    return;
  }

  setLoading(true)

  try {
    const res = await axios.post(kuRequestAcknowledge, { id: request_id, acknowledge: acknowledgement_message });

    console.log("acknowledgeRequest: ", res.data);

    if (res.data.success) {
      setLoading(false);
      // Toastr({ message: res.data.message, type: 'success' });
      return true;
    } else {
      Toastr({ message: res.data.message })
      setLoading(false)
      return false
    }
  } catch (err) {
    console.log('acknowledgeRequest: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false)
    return false
  }
}

export const writeReview = async (id, company_user_id, rate, review) => {

  try {
    if (id == null) {
      Toastr({ message: t("Invalid Request!"), type: 'warning' });
      return;
    }
    if (company_user_id === null) {
      Toastr({ message: "Invalid Company!", type: 'warning' });
      return;
    }

    setLoading(true);
    const res = await axios.post(kuWriteReview, {
      "company_user_id": company_user_id,
      "request_id": id,
      "review": review,
      "rating": rate
    })

    console.log('writeReview: ', res.data);

    if (res.data.success) {
      // Toastr({ message: res.data.message, type: 'success' });
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res.data.message })
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log('writeReview err: ', err);
    Toastr({ message: t('An error occurred!') });
    setLoading(false);
    return false;
  }
}

export const getFastCalculationData = async (request_id) => {
  if (!request_id) {
    Toastr({ message: t("Invalid Request!"), type: 'warning' });
    return;
  }

  try {
    const { setFastCalculationData } = useRequestStore.getState();
    setLoading(true);
    const res = await axios.get(kuFastCalculation + `?req_id=${request_id}`);
    console.log("getFastCalculationData:", res.data);
    if (res.data.success) {
      setFastCalculationData(res.data.data);
    } else {
      Toastr({ message: res?.data?.data })
    }
    setLoading(false);
  } catch (err) {
    console.log(err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
  }
}

export const getAdvanceCalculationData = async (request_id, shift_id) => {
  console.log('getAdvanceCalculationData: ', request_id, shift_id);
  if (!request_id) {
    Toastr({ message: t("Invalid Request!"), type: 'warning' });
    return;
  } else if (!shift_id) {
    Toastr({ message: t("Invalid Shift!"), type: 'warning' });
    return;
  }

  try {
    const { setAdvanceCalculationData } = useRequestStore.getState();
    setLoading(true);
    const res = await axios.get(kuAdvanceCalculation + `?req_id=${request_id}&shift_id=${shift_id}`);
    console.log("getAdvanceCalculationData:", res.data);
    if (res.data.success) {
      setAdvanceCalculationData(res.data.data);
    } else {
      Toastr({ message: res.data.message });
    }
    setLoading(false);
  } catch (err) {
    console.log(err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
  }
}

export const assignNotPlannedRequestShift = async (request_id, shift_id) => {
  if (request_id === null) {
    Toastr({ message: t("Invalid Request!"), type: 'warning' });
    return;
  }

  if (shift_id === null) {
    Toastr({ message: t("Invalid Shift!"), type: 'warning' });
    return;
  }

  setLoading(true)

  try {
    console.log('assignNotPlannedRequestShift stops: ', useRequestStore.getState().not_planned_stops);
    const res = await axios.post(kuNotPlannedShiftAssign, { id: request_id, shift_id: shift_id, stops: useRequestStore.getState().not_planned_stops });

    console.log("assignNotPlannedRequestShift: ", res.data);

    if (res.data.success) {
      setLoading(false)
      // Toastr({ message: res.data.message, type: 'success' });
      return true;
    } else {
      Toastr({ message: res.data.message });
      setLoading(false)
      return false
    }
  } catch (err) {
    console.log('assignNotPlannedRequestShift: ', err);
    Toastr({ message: t("An error occurred!") });
    setLoading(false)
    return false
  }
}


// Table View
export const getTableViewRequestsData = async ({ data_set, filter }) => {
  const { setTableRequests, setTransportType, search_key, request_api_url, requests_order, is_asc, request_take, } = useRequestStore.getState();
  if(search_key) setLoadingSearch(true); else setLoading(true);
  let body = {
    take: request_take,
    data_set: [data_set],
    search: search_key,
    filter: filter,
    order_by: requests_order,
    is_asc: is_asc,
  };

  console.log('body', body);

  try {
    const res = await axios.get(request_api_url ?? kuGetRequestsNew, { params: body });
    console.log('getTableViewRequestsData: ', res.data);

    if (res.data.success) {
      setTransportType(res?.data?.data?.transportation_types);
      setupFilterCompany(res?.data?.data, data_set);
      setTableRequests(res?.data?.data);
      setupFilterRange(res?.data?.data, data_set);
      setupShiftDrivers(res?.data?.data, data_set);
      setupCustomers(res?.data?.data, data_set);
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res?.data?.message });
      if(search_key) setLoadingSearch(false); else setLoading(false);
      return false;
    }
  } catch (err) {
    Toastr(({ message: t("An error occurred!") }))
    if(search_key) setLoadingSearch(false); else setLoading(false);
    console.log('getTableViewRequestsData: ', err)
    return false;
  }
}

export const getTableViewGlobalRequestsData = async ({ filter }) => {
  const { setGlobalRequest, search_key, global_request_api_url, requests_order, is_asc, request_take } = useRequestStore.getState();
  if(search_key)setLoadingSearch(true); else setLoading(true);

  let body = {
    take: request_take,
    search: search_key,
    filter: filter,
    order_by: requests_order,
    is_asc: is_asc,
  };

  console.log('body', body);

  try {
    const res = await axios.post(global_request_api_url ?? kuGlobalRequestTableIndex, body);
    console.log('getTableViewGlobalRequestsData: ', res.data);

    if (res.data.success) {
      setGlobalRequest(res?.data?.data);
      if(search_key)setLoadingSearch(false); else setLoading(false);
      return true;
    }
    else {
      Toastr({ message: res?.data?.message });
      if(search_key)setLoadingSearch(false); else setLoading(false);
      return false;
    }
  } catch (err) {
    Toastr(({ message: t("An error occurred!") }))
    if(search_key)setLoadingSearch(false); else setLoading(false);
    console.log('getTableViewGlobalRequestsData: ', err)
    return false;
  }
}


//! helpers functions
export const searchRequests = (key) => {
  let x = useRequestStore.getState()?.temp_current_requests?.filter(item => {
    if (item?.title?.toLowerCase()?.includes(key?.toLowerCase())) return item
    return null
  })
  return x;
}

export const changeRequestListPageTitle = () => {
  const { requests_path } = useRequestStore.getState();

  if (requests_path === k_request_paths.saved) {
    return k_request_types.saved;
  } else if (requests_path === k_request_paths.invitation) {
    return k_request_types.invitation;
  } else if (requests_path === k_request_paths.in_bidding) {
    return k_request_types.in_bidding;
  } else if (requests_path === k_request_paths.awarded) {
    return k_request_types.awarded;
  } else if (requests_path === k_request_paths.not_planned) {
    return k_request_types.not_planned;
  } else if (requests_path === k_request_paths.ongoing) {
    return k_request_types.ongoing;
  } else if (requests_path === k_request_paths.completed) {
    return k_request_types.completed;
  } else if (requests_path === k_request_paths.history) {
    return k_request_types.history;
  }
}


export const changeRequestItemIcon = () => {
  const { requests_path } = useRequestStore.getState();

  if (requests_path === k_request_paths.saved) {
    return iSavedReq;
  } else if (requests_path === k_request_paths.invitation) {
    return iInvitationNormal;
  } else if (requests_path === k_request_paths.in_bidding) {
    return iBiddingNormal;
  } else if (requests_path === k_request_paths.awarded) {
    return iAwardedNormal;
  } else if (requests_path === k_request_paths.not_planned) {
    return iNotPlannedNormal;
  } else if (requests_path === k_request_paths.ongoing) {
    return iOnGoingNormal;
  } else if (requests_path === k_request_paths.completed) {
    return iCompletedNormal;
  } else if (requests_path === k_request_paths.history) {
    return iHistoryNormal;
  }
}

export const changeSelectedRequestItemIcon = () => {
  const { requests_path } = useRequestStore.getState();

  if (requests_path === k_request_paths.saved) {
    return iSavedReqSelected;
  } else if (requests_path === k_request_paths.invitation) {
    return iInvitationNormal;
  } else if (requests_path === k_request_paths.in_bidding) {
    return iBiddingNormal;
  } else if (requests_path === k_request_paths.awarded) {
    return iAwardedNormal;
  } else if (requests_path === k_request_paths.not_planned) {
    return iNotPlannedNormal;
  } else if (requests_path === k_request_paths.ongoing) {
    return iOnGoingNormal;
  } else if (requests_path === k_request_paths.completed) {
    return iCompletedNormal;
  } else if (requests_path === k_request_paths.history) {
    return iHistorySelected;
  }
}

export const changeRequestSubtitleOne = (data) => {
  const { requests_path } = useRequestStore.getState();

  if (requests_path === k_request_paths.saved) {
    return 'Saved in ' + (data?.status === 'init' ? 'pickup' : data?.status);
  } else if (requests_path === k_request_paths.invitation || requests_path === k_request_paths.in_bidding || requests_path === k_request_paths.not_planned || requests_path === k_request_paths.awarded) {
    return `${data?.stops_count ?? 0} ${(data?.stops_count ?? 0) > 1 ? 'stops' : 'stop'} (${data?.products_count ?? 0} ${(data?.products_count ?? 0) > 1 ? 'packages' : 'package'})`;
  } else if (requests_path === k_request_paths.ongoing || requests_path === k_request_paths.completed || requests_path === k_request_paths.history) {
    return `${data?.stops_complete_count ?? 0}/${data?.stops_count ?? 0} ${(data?.stops_complete_count ?? 0) > 1 ? 'stops' : 'stop'} completed`;
  }
}

export const changeRequestSubtitleTwo = (data) => {
  const { requests_path } = useRequestStore.getState();

  if (requests_path === k_request_paths.saved) {
    return `Last saved on ${formatDate(data?.last_updated) ?? '--'}`;
  } else if (requests_path === k_request_paths.invitation || requests_path === k_request_paths.in_bidding) {
    const x = checkPastTime(data?.pickup_starts_time, data?.pickup_starts_at);
    if (x) return 'Bidding closed';
    else return `Bid ends on ${formatDate(data?.pickup_starts_at) ?? '--'}, ${formatTime(data?.pickup_starts_time) ?? '--'}`;
  } else if (requests_path === k_request_paths.not_planned || requests_path === k_request_paths.awarded) {
    return `Starts on ${formatDate(data?.pickup_starts_at) ?? '--'}, ${formatTime(data?.pickup_starts_time) ?? '--'}`;
  } else if (requests_path === k_request_paths.ongoing) {
    if (data?.pickup_starts_in_raw <= 0) return 'Will be completed soon'
    else return `Exp. complete on ${formatDate(data?.req_expected_complete_at,) ?? '--'}, ${formatDateOrTime(data?.req_expected_complete_at) ?? '--'}`;
  } else if (requests_path === k_request_paths.completed || requests_path === k_request_paths.history) {
    return `Completed on ${formatDate(data?.last_complete_stop_at) ?? '--'}, ${formatDateOrTime(data?.last_complete_stop_at) ?? '--'}`;
  }
}

export const checkStopsCompletion = (data) => {
  const { requests_path } = useRequestStore.getState();
  if ((requests_path === k_request_paths.completed || requests_path === k_request_paths.history) && (data.stops_count !== data.stops_complete_count)) return true;
  else return false;
}

export const changeRequestItemTopRightInfo = (data) => {
  const { requests_path } = useRequestStore.getState();
  const { user_role } = useGeneralStore.getState();


  if (requests_path === k_request_paths.in_bidding) {
    return user_role === role.customer ? (`DKK ${data?.min_budget?.toLocaleString("da-DK")} - ${data?.min_budget?.toLocaleString("da-DK")}`) : `DKK ${data?.my_bid?.toLocaleString("da-DK")}`;
  } else if (requests_path === k_request_paths.not_planned || requests_path === k_request_paths.awarded) {
    return `DKK ${data?.awarded_bidding?.budget?.toLocaleString("da-DK")}`;
  } else if (requests_path === k_request_paths.history && user_role === role.customer) {
    return data?.rate ? <RatingFiveStar rating={Math.round(data?.rate)} /> : '';
  }
  else return null;
}

export const changeRequestItemTopRightComponent = (data) => {
  const { requests_path } = useRequestStore.getState();
  const { user_role } = useGeneralStore.getState();


  if (requests_path === k_request_paths.history && user_role === role.customer) {
    return 'accent';
  }
  else return null;
}

export const goToRequestDetails = (id, navigateTo) => {
  const { requests_path } = useRequestStore.getState();
  navigateTo(`${requests_path}/details/${id}`);
}

export const defineDataSet = (type) => {
  const { user_role } = useGeneralStore.getState();
  if (type === 'saved') return user_role === role.customer ? ['invitations'] : ['invitations', 'shift_plan', 'my_bid',];
  else if (type === 'invitation') return user_role === role.customer ? ['biddings', 'invitations'] : ['biddings', 'invitations', 'shift_plan', 'my_bid'];
  else if (type === 'in-bidding') return ['biddings', 'invitations', 'shift_plan', 'my_bid'];
  else if (type === 'not-planned' || type === 'awarded' || type === 'on-going') return user_role === role.customer ? ['awarded'] : ['awarded', 'shift_plan', 'my_bid'];
  else if (type === 'completed' || type === 'history') return user_role === role.customer ? ['awarded', 'history', 'complete'] : ['awarded', 'history', 'complete', 'shift_plan', 'my_bid'];
  else return ['invitations', 'biddings', 'awarded', 'history', 'complete', 'shift_plan', 'my_bid'];
}

export const generateSummaryContent = (data, type) => {
  return [
    { title: t('Status'), description: checkRequestStatus(type) },
    { title: t('Title'), description: data?.title?? 'NA' },
    { title: t('Transportation Type'), description: data?.transport_type ?? 'NA' },
    { title: t('Pickup Date'), description: formatDate(data?.pickup_date) ?? '--' },
    { title: (type === 'on-going' || type === 'history') ? t('Picked Up Time') : t('Pickup Time'), description: (formatTime(data?.pickup_start_time) ?? '--') + ' - ' + (formatTime(data?.pickup_end_time) ?? '--') },
    { title: t('Delivery Overview'), description: `${data?.stops?.length ?? 0} ${(data?.stops?.length ?? 0) > 1 ? t('stops') : t('stop')} (${data?.products?.length ?? 0} ${(data?.products?.length ?? 0) > 1 ? t('packages') : t('package')})` },
  ];
}

export const generateSummaryContent2 = (data, type) => {
  const { user_role } = useGeneralStore.getState();

  if (user_role === role.customer) {
    if (type === 'in-bidding') {
      return [
        { title: t('Direct Invite'), description: data?.invitation_data?.length + ` ${('Companies')}` },
        { title: t('Global Invite'), description: data?.is_global ? t(`Submitted`) : t('Not Submitted') },
      ];
    } else if (type === 'awarded' || type === 'on-going') {
      return [
        { title: t('Awarded Company'), description: data?.awarded_company?.name, className: '', onClick: () => { } },
        { title: t('Agreed Budget'), description: 'DKK ' + data?.awarded?.budget?.toLocaleString("da-DK") },
      ];
    }
  } else {
    if (type === 'invitation' || type === 'in-bidding') {
      if (type === 'in-bidding' && data?.is_global) return null;
      return [
        { title: t('Customer Name'), description: data?.user?.name },
      ];
    } else if (type === 'not-planned') {
      return [
        { title: (data?.stops?.length ?? 0) > 1 ? t('Stop References') : t('Stop Reference'), description: data?.stops?.length ?? 0 },
        { title: (data?.products?.length ?? 0) > 1 ? t('Products') : t('Product'), description: data?.products?.length ?? 0 },
      ];
    } else if (type === 'awarded' || type === 'on-going') {
      return [
        { title: t('Agreed Budget'), description: 'DKK ' + data?.my_bid?.budget?.toLocaleString("da-DK") },
      ];
    } else if (type === 'completed' || type === 'history') {
      return [
        { title: t('Customer Name'), description: data?.user?.name },
        { title: t('Agreed Budget'), description: 'DKK ' + data?.my_bid?.budget?.toLocaleString("da-DK") },
      ];
    }
  }
}

export const generateSummaryContent3 = (data, type) => {
  const { user_role } = useGeneralStore.getState();

  if (user_role === role.customer) {
    if (type === 'on-going') {
      return [
        { title: t('Completed Stops'), description: `${checkStopsAndProductCompletion(data?.stops)?.stops} ${checkStopsAndProductCompletion(data?.stops)?.stops > 1 ? t('stops') : t('stop')} (${checkStopsAndProductCompletion(data?.stops)?.products} ${checkStopsAndProductCompletion(data?.stops)?.products > 1 ? t('packages') : t('package')})`, className: `${type === 'history' && (checkStopsAndProductCompletion(data?.stops)?.stops !== data?.stops?.length) ? 'text-cRed' : ''}` },
        { title: t('Started'), description: (formatDate(data?.ongoing_info?.req_start_date) ?? '--') + ', ' + (formatTime(data?.ongoing_info?.req_start_time) ?? '--') },
        { title: t('Expected End'), description: (formatDate(data?.ongoing_info?.req_expected_date) ?? '--') + ', ' + (formatTime(data?.ongoing_info?.req_expected_time) ?? '--') },
      ];
    } else if (type === 'history') {
      return [
        { title: t('Completed Stops'), description: `${checkStopsAndProductCompletion(data?.stops)?.stops} ${checkStopsAndProductCompletion(data?.stops)?.stops > 1 ? t('stops') : t('stop')} (${checkStopsAndProductCompletion(data?.stops)?.products} ${checkStopsAndProductCompletion(data?.stops)?.products > 1 ? t('packages') : t('package')})`, className: `${type === 'history' && (checkStopsAndProductCompletion(data?.stops)?.stops !== data?.stops?.length) ? 'text-cRed' : ''}` },
        { title: t('Started'), description: (formatDate(data?.complete_info?.req_start_date) ?? '--') + ', ' + (formatTime(data?.complete_info?.req_start_time) ?? '--') },
        { title: t('End'), description: (formatDate(data?.complete_info?.req_complete_date) ?? '--') + ', ' + (formatTime(data?.complete_info?.req_complete_time) ?? '--') },
      ];
    }
  } else {
    if (type === 'not-planned') {
      return [
        { title: t('Customer Name'), description: data?.user?.name },
      ];
    } else if (type === 'awarded' || type === 'on-going' || type === 'completed' || type === 'history') {
      return [
        { title: t('Driver Name'), description: data?.driver?.name ?? 'NA' },
        { title: t('Vehicle Number'), description: data?.car_license_number ?? 'NA' },
      ];
    }
  }
}

export const generateSummaryContent4 = (data, type) => {
  const { user_role } = useGeneralStore.getState();

  if (user_role === role.company) {
    // console.log('count', checkStopsAndProductCompletion(data?.stops)?.stops);
    if (type === 'on-going') {
      return [
        { title: t('Completed Stops'), description: `${checkStopsAndProductCompletion(data?.stops)?.stops} ${checkStopsAndProductCompletion(data?.stops)?.stops > 1 ? t('stops') : t('stop')} (${checkStopsAndProductCompletion(data?.stops)?.products} ${checkStopsAndProductCompletion(data?.stops)?.products > 1 ? t('packages') : t('package')})`, className: `${(type === 'completed' || type === 'history') && (checkStopsAndProductCompletion(data?.stops)?.stops !== data?.stops?.length) ? 'text-cRed' : ''}` },
        { title: t('Started'), description: (formatDate(data?.ongoing_info?.req_start_date) ?? '--') + ', ' + (formatTime(data?.ongoing_info?.req_start_time) ?? '--') },
        { title: t('Expected End'), description: (formatDate(data?.ongoing_info?.req_expected_date) ?? '--') + ', ' + (formatTime(data?.ongoing_info?.req_expected_time) ?? '--') },
      ];
    } else if (type === 'completed' || type === 'history') {
      return [
        { title: t('Completed Stops'), description: `${checkStopsAndProductCompletion(data?.stops)?.stops} ${checkStopsAndProductCompletion(data?.stops)?.stops > 1 ? t('stops') : t('stop')} (${checkStopsAndProductCompletion(data?.stops)?.products} ${checkStopsAndProductCompletion(data?.stops)?.products > 1 ? t('packages') : t('package')})`, className: `${(type === 'completed' || type === 'history') && (checkStopsAndProductCompletion(data?.stops)?.stops !== data?.stops?.length) ? 'text-cRed' : ''}` },
        { title: t('Started'), description: (formatDate(data?.complete_info?.req_start_date) ?? '--') + ', ' + (formatTime(data?.complete_info?.req_start_time) ?? '--') },
        { title: t('End'), description: (formatDate(data?.complete_info?.req_complete_date) ?? '--') + ', ' + (formatTime(data?.complete_info?.req_complete_time) ?? '--') },
      ];
    }
  }
}

export const checkRequestStatus = (data) => {
  switch (data) {
    case 'saved':
      return t('Saved');
    case 'invitation':
      return t('Invitation');
    case 'in-bidding':
      return t('In Bidding');
    case 'in_bidding':
      return t('In Bidding');
    case 'in_bidding_red':
      return t('Invitation');
    case 'not-planned':
      return t('Not Planned');
    case 'awarded':
      return t('Awarded');
    case 'on-going':
      return t('Ongoing');
    case 'on_going':
      return t('Ongoing');
    case 'ongoing':
      return t('Ongoing');
    case 'completed':
      return t('Completed');
    case 'history':
      return t('History');

    default:
      break;
  }
}

export const checkStopsAndProductCompletion = (data) => {
  let x = { stops: 0, products: 0 };
  data?.forEach((stop) => {
    if (stop?.status === "delivered") x.stops++;
    x.products += stop?.products?.length;
  });
  return x;
}

export const checkIsShowPickupOrDeliveryStatus = (status, type) => {
  // console.log('type, status', type, status);
  if ((type === 'on-going' || type === 'history' || type === 'completed')) return true;
  else return false;
}

export const definePickupAndDeliveryStatus = (data, type) => {

  if (type === 'pickup') {
    if (data?.pickup_status === 'delivered' || data?.pickup_status === "not_delivered")
      return `${data?.pickup_status === 'not_delivered' ? 'Not' : ''} Picked up: ${formatDate(data?.pickup_driver_complete_date)}, ${data?.pickup_driver_complete_time ? formatTime(data?.pickup_driver_complete_time) : 'NA'}`;
    else
      return `Exp. Pickup: ${formatDate(data?.pickup_expected_date)}, ${formatTime(data?.pickup_expected_time)}`;
  } else {
    if (data?.status === 'delivered' || data?.status === "not_delivered")
      return `${data?.status === 'not_delivered' ? 'Not' : ''} Delivered: ${formatDate(data?.delivery_driver_complete_date)}, ${data?.delivery_driver_complete_time ? formatTime(data?.delivery_driver_complete_time) : 'NA'}`;
    else
      return `Exp. Delivery: ${data?.delivery_expected_time && data?.delivery_expected_date  ? 
        `${formatDate(data?.delivery_expected_date)}, ${formatTime(data?.delivery_expected_time)}` : 'NA'}`;
  }
}

export const checkIsShowDeliveryOverview = (stop, type) => {
  if ((stop?.driver_comment || stop?.driver_attachment || stop?.driver_signature) && (type === 'on-going' || type === 'completed' || type === 'history')) return true;
  else return false;
}

export const checkIsCustomerProfileShow = (type) => {
  const { user_role } = useGeneralStore.getState();
  if (user_role === role.company && (type === 'not-planned' || type === 'awarded' || type === 'on-going' || type === 'completed' || type === 'history')) return true;
  else return false;
}

export const checkIsBiddingDetailsShow = (type) => {
  const { user_role } = useGeneralStore.getState();
  if (user_role === role.customer && (type === 'awarded' || type === 'on-going' || type === 'history')) return true;
  else return false;
}

export const defineIsDangerStatus = (item, path) => {
  const { user_role } = useGeneralStore.getState();
  // if ((path === k_request_paths.not_planned || path === k_request_paths.awarded) && (item?.awarded_status === k_arcd_status.company_reject || item?.awarded_status === k_arcd_status.company_reject)) return true;
  if ((path === k_request_paths.in_bidding || path === '/') && user_role === role.customer && item?.status === "in_bidding_red") return true;
  else return false;
}

export const defineAccentType = (item, path) => {
  const { user_role } = useGeneralStore.getState();
  // if ((path === k_request_paths.not_planned || path === k_request_paths.awarded) && (item?.awarded_status === k_arcd_status.company_reject || item?.awarded_status === k_arcd_status.company_reject)) return 'danger-red';
  if ((path === k_request_paths.in_bidding || path === '/') && user_role === role.customer && item?.status === "in_bidding_red") return 'danger-red';
  else return null;
}

export const checkIsSubtitleOneRed = (item, path) => {
  if (path === k_request_paths.completed || path === k_request_paths.history) {
    if (item?.stops_complete_count !== item?.stops_count) return true;
    else return false;
  }
}

export const setRequestDetailsPageTitle = (type) => {
  if (type === 'in-bidding') return 'In Bidding';
  else if (type === 'planned') return 'Awarded';
  else if (type === 'not-planned') return 'Not Planned';
  else if (type === 'on-going') return 'Ongoing';
  else return type;
}

export const defineNotPlannedDeliveryDate = (pickup_date, delivery_time, pickup_time) => {

  if (!delivery_time || delivery_time === '') return formatDate(pickup_date);
  else {
    if (pickup_time > delivery_time) return formatDate(new Date(pickup_date).setDate(new Date(pickup_date).getDate() + 1));
    else return formatDate(pickup_date);
  };
}

export const handleRequestOrder = async (order_by, action) => {
  const { setIsAsc, is_asc, setRequestsOrder, setRequestApiUrl, requests_order } = useRequestStore.getState();
  await setRequestsOrder(order_by);
  if (requests_order !== order_by) await setIsAsc(1);
  else await setIsAsc(is_asc ? 0 : 1);
  await setRequestApiUrl(kuGetRequestsNew);
  const success = await action();
  if (!success) setIsAsc(is_asc ? 0 : 1);
  if (!success && requests_order !== order_by) setIsAsc(1);
}

export const onFilterValueChange = (e, value) => {
  const { changeRequestFilterForm, changeFilterRange } = useRequestStore.getState();

  changeFilterRange('value', value);
  changeRequestFilterForm('min_budget', value[0]);
  changeRequestFilterForm('max_budget', value[1]);
}


export const isTableFiltered = (data_set, form) => {
  const { user_role } = useGeneralStore.getState();

  if (data_set === k_data_set.saved) {
    if (form?.saved_date_from || form?.saved_date_from || form?.pickup_date_from || form.pickup_date_to || form?.transport_type || form?.status) return true;
    else return false;
  } else if (data_set === k_data_set.in_bidding) {
    if (form?.min_budget || form?.max_budget || form?.pickup_date_from || form.pickup_date_to || form?.transport_type) return true;
    else return false;
  } else if (data_set === k_data_set.invitation) {
    if (form?.bids_end_from || form.bids_end_to || form?.transport_type) return true;
    else return false;
  } else if (data_set === k_data_set.awarded) {
    if (user_role === role.customer && (form?.min_budget || form?.max_budget || form?.pickup_date_from || form.pickup_date_to || form?.transport_type || form?.awarded_company)) return true;
    if (user_role === role.company && (form?.min_budget || form?.max_budget || form?.pickup_date_from || form.pickup_date_to || form?.transport_type || form?.shift_driver)) return true;
    else return false;
  } else if (data_set === k_data_set.ongoing) {
    if (user_role === role.customer && (form?.exp_date_from || form.exp_date_to || form?.transport_type || form?.awarded_company)) return true;
    if (user_role === role.company && (form?.exp_date_from || form.exp_date_to || form?.transport_type || form?.shift_driver)) return true;
    else return false;
  } else if (data_set === k_data_set.completed) {
    if (form?.completed_from || form.completed_to || form?.transport_type || form?.customer_from || form?.min_budget || form?.max_budget) return true;
    else return false;
  } else if (data_set === k_data_set.history) {
    if (user_role === role.customer && (form?.completed_from || form.completed_to || form?.transport_type || form?.awarded_company || form?.min_budget || form?.max_budget || form?.status)) return true;
    if (user_role === role.company && (form?.completed_from || form.completed_to || form?.transport_type || form?.customer_from || form?.min_budget || form?.max_budget)) return true;
    else return false;
  } else if (data_set === k_data_set.all_requests) {
    if (form?.from_date || form?.to_date || form?.transport_type || form?.status || form?.min_budget || form?.max_budget) return true;
    else return false;
  } else if (data_set === k_data_set.global) {
    if (form?.start_date || form?.start_time || form?.pickup_date_from || form.pickup_date_to || form?.transport_type || form?.city?.length > 0) return true;
    else return false;
  } else if (data_set === k_data_set.shift) {
    if (form?.start_date || form?.start_time || form?.end_date || form.end_time || (form?.is_maintenance !== null) || form?.plate_number || form?.driver_id || form?.status) return true;
    else return false;
  } else if (data_set === false) {
    return false;
  }
  else {
    return false;
  }
}

export const defineOfferedPrice = (item) => {
  if (!item?.min_budget || !item?.max_budget || (item?.min_budget === 0 && item?.max_budget === 0)) return 'NA';
  if (item?.min_budget === item?.max_budget) return 'DKK ' + (item?.min_budget?.toLocaleString("da-DK"));
  else return 'DKK ' + (item?.min_budget?.toLocaleString("da-DK")) + '-' + (item?.max_budget?.toLocaleString("da-DK"))
}

export const defineScheduleInfo = (item) => {
  if (item?.start_date === item?.end_date)
    return `${formatDate(item?.start_date)}, ${formatTime(item?.start_time)} - ${formatTime(item?.end_time)}`;
  else
    return `${formatDate(item?.start_date)}, ${formatTime(item?.start_time)} - ${formatDate(item?.end_date)}, ${formatTime(item?.end_time)}`;

  // return `Schedule on ${formatDate(item?.start_date)}, ${formatTime(item?.start_time)} - ${formatTime(item?.end_time)}`;
}

export const setupFilterRange = (data, data_set) => {
  const { changeFilterRange, changeFilterRangeCopy, filter_range } = useRequestStore.getState();
  const { user_role } = useGeneralStore.getState();
  console.log('filter_range', filter_range);
  if (filter_range) return;

  let x;
  if (data_set === k_data_set.in_bidding) x = user_role === role.customer ? data?.filter_inbidding_customer : data?.filter_inbidding_company;
  else if (data_set === k_data_set.awarded) x = user_role === role.customer ? data?.filter_awarded_customer : data?.filter_awarded_company;
  else if (data_set === k_data_set.history) x = data?.filter_history;
  else if (data_set === k_data_set.completed) x = data?.filter_complete;
  else if (data_set === k_data_set.all_requests) x = data?.filter_info;

  changeFilterRange('min', x?.min_budget ?? 0);
  changeFilterRange('max', x?.max_budget ?? 100);
  changeFilterRange('value', [x?.min_budget ?? 0, x?.max_budget ?? 100]);

  changeFilterRangeCopy('min', x?.min_budget ?? 0);
  changeFilterRangeCopy('max', x?.max_budget ?? 100);
  changeFilterRangeCopy('value', [x?.min_budget ?? 0, x?.max_budget ?? 100]);
}

export const setupFilterCompany = (data, data_set) => {
  const { setAwardedCompany } = useRequestStore.getState();
  const { user_role } = useGeneralStore.getState();

  if (data_set === k_data_set.in_bidding) setAwardedCompany(data?.filter_inbidding_customer?.awarded_company);
  if (data_set === k_data_set.awarded) {
    if (user_role === role.customer) setAwardedCompany(data?.filter_awarded_customer?.awarded_company);
    if (user_role === role.company) setAwardedCompany(data?.filter_awarded_company?.awarded_company);
  }

  if (data_set === k_data_set.ongoing) {
    if (user_role === role.customer) setAwardedCompany(data?.filter_ongoing_customer?.awarded_company);
    if (user_role === role.company) setAwardedCompany(data?.filter_ongoing_company?.shift_driver);
  }
  if (data_set === k_data_set.history) setAwardedCompany(data?.filter_history?.awarded_company);
}

export const setupShiftDrivers = (data, data_set) => {
  const { setShiftDrivers } = useRequestStore.getState();
  const { user_role } = useGeneralStore.getState();

  if (user_role === role.company && data_set === k_data_set.awarded) setShiftDrivers(data?.filter_awarded_company?.shift_driver);
  if (user_role === role.company && data_set === k_data_set.ongoing) setShiftDrivers(data?.filter_ongoing_company?.shift_driver);
}

export const setupCustomers = (data, data_set) => {
  const { setCustomers } = useRequestStore.getState();
  const { user_role } = useGeneralStore.getState();

  if (user_role === role.company && data_set === k_data_set.completed) setCustomers(data?.filter_complete?.customer);
  if (user_role === role.company && data_set === k_data_set.history) setCustomers(data?.filter_history?.customer);
}

export const defineAllRequestsStatus = (item) => {
  if (item?.status === 'awarded_not_planned') return 'Not Planned'
  if (item?.status === 'in_bidding') return 'In Bidding'
  if (item?.status === 'not_planned') return 'Not Planned'
  if (item?.status === 'complete') return 'Completed'
  else return item?.status;
}

export const handleAllRequestNavigate = (item, navigateTo) => {
  useLayoutStore.getState().setShowExpandedSidebarItem(true);
  if (item?.status === 'in_bidding') navigateTo(`/requests/in-bidding/details/${item?.id}`)
  else if (item?.status === 'invitation') navigateTo(`/requests/invitation/details/${item?.id}`)
  else if (item?.status === 'not_planned') navigateTo(`/requests/not-planned/details/${item?.id}`)
  else if (item?.status === 'awarded') navigateTo(`/requests/awarded/details/${item?.id}`)
  else if (item?.status === 'ongoing') navigateTo(`/requests/on-going/details/${item?.id}`)
  else if (item?.status === 'complete') navigateTo(`/requests/completed/details/${item?.id}`)
  else if (item?.status === 'history') navigateTo(`/requests/history/details/${item?.id}`)
}