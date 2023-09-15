import axios from 'axios';
import create from 'zustand';
import { create_request_steps, create_request_type, k_cr_actions, k_cr_status, user_role as role } from '../../utility/const';
import useGeneralStore, { suggestionFormat } from './generalStore';
import { kuEditInBidding, kuGetInitData, kuRequestSave, kuSearchCompany } from '../../urls/commonUrl';
import { formatDate, formatTime, getStringFromDateObject, Toastr } from '../../utility/utilityFunctions';
import { t } from 'i18next';

const here_api_key = process.env.REACT_APP_HERE_API_KEY;

const useCreateRequestStore = create((set, get) => ({
  request_type: create_request_type.normal,
  setCreateRequestType: (data) => set({ request_type: data }),
  current_step: create_request_steps.pickup, //pickup, mass_import, select_company
  setCurrentSetup: (data) => set({ current_step: data }),
  is_show_request_confirm_modal: false,
  setShowRequestConfirmModal: (data) => set({ is_show_request_confirm_modal: data }),
  is_show_generate_table_modal: false,
  setShowGenerateTableModal: (data) => set({ is_show_generate_table_modal: data }),
  stops: [],
  setStops: async (data) => {
    await set({ stops: data });
    return;
  },
  is_mass_import_form_fullscreen: false,
  setMassImportFormFullscreen: (data) => set({ is_mass_import_form_fullscreen: data }),

  cr_data: null,
  setCrData: (data) => set({ cr_data: data }),
  cr_form: {
    id: null,
    is_web: true,
    action: k_cr_actions.save,
    is_mass: false,
    is_global: 0,
    status: k_cr_status.init,

    // pickup
    title: '',
    transport_type: '',
    transport_id: '',
    pickup_date: '',
    pickup_date_formatted: '',
    pickup_start_time: '',
    pickup_end_time: '',
    pickup_address: '',
    pickup_lat: '',
    pickup_lng: '',
    pickup_comment: '',
    pickup_attachment: '',
    pickup_attachment_url: '',
    temp_pickup_attachment: null,
    has_old_image: 0,

    // deliveries
    stops: [
      {
        date: '',
        formatted_date: '',
        start_time: '',
        end_time: '',
        delivery_time: '',
        address: '',
        lat: '',
        lng: '',
        comment: '',
        attachment: '',
        attachment_url: '',
        temp_attachment: null,
        products: [{ text: '' },],
        has_old_image: 0,
      },
    ],

    // for customer
    invitation_ids: [],
    invitation_data: [], // selected companies

    // for company
    shift_plan: null,
    shift_id: null,
    bid_details: '',
    budget: '',
  },
  setCrFullForm: async (data) => {
    await set({ cr_form: data });
    return;
  },
  setCrForm: (e) => set({ cr_form: { ...get().cr_form, [e.target.name]: e.target.value } }),
  changeCrForm: (name, value) => set({ cr_form: { ...get().cr_form, [name]: value } }),
  updateStopsForm: (index, name, value) => {
    let x = [...get().cr_form?.stops];
    x[index][name] = value;
    let y = get().cr_form;
    y.stops = x;

    set({ cr_form: y });
  },
  clearCrFormData: (value) => set({ cr_form: value }),
  resetCreateRequest: () => {
    get().setCrData(null);
    set({
      cr_form: {
        id: null,
        is_web: true,
        action: k_cr_actions.save,
        is_mass: get().cr_form?.is_mass ?? false,
        is_global: false,
        status: k_cr_status.init,

        // pickup
        title: '',
        transport_type: '',
        transport_id: '',
        pickup_date: '',
        pickup_date_formatted: '',
        pickup_start_time: '',
        pickup_end_time: '',
        pickup_address: '',
        pickup_lat: '',
        pickup_lng: '',
        pickup_comment: '',
        pickup_attachment: '',
        pickup_attachment_url: '',
        temp_pickup_attachment: null,

        // deliveries
        stops: [
          {
            date: '',
            formatted_date: '',
            start_time: '',
            end_time: '',
            delivery_time: '',
            address: '',
            lat: '',
            lng: '',
            comment: '',
            attachment: '',
            attachment_url: '',
            temp_attachment: null,
            products: [{ text: '' },],
            has_old_image: 0,
          },
        ],

        // for customer
        invitation_ids: [],
        invitation_data: [], // selected companies

        // for company
        shift_plan: null,
        shift_id: null,
        bid_details: '',
        budget: '',
      }
    });
    get().setStops([]);
  },

  addDelivery: () => {
    let x = get().cr_form?.stops;
    x.push({
      date: '',
      formatted_date: '',
      start_time: '',
      end_time: '',
      delivery_time: '',
      address: '',
      lat: '',
      lng: '',
      comment: '',
      attachment: '',
      attachment_url: '',
      temp_attachment: null,
      products: [{ text: '' },],
      has_old_image: 0,
    },);

    let y = get().cr_form;
    y.stops = x;

    set({ cr_form: y });
  },

  removeDelivery: (index) => {
    let x = get().cr_form?.stops;
    let newDelivery = [...x];
    newDelivery.splice(index, 1);

    let y = get().cr_form;
    y.stops = [...newDelivery];

    set({ cr_form: y });
  },

  addDeliveryProduct: (index) => {
    let x = [...get().cr_form?.stops];
    x[index].products.push({ text: '' });
    let y = get().cr_form;
    y.stops = x;

    set({ cr_form: y });
  },

  removeDeliveryProduct: (index, productIndex) => {
    let x = [...get().cr_form?.stops];
    x[index].products.splice(productIndex, 1);

    let y = get().cr_form;
    y.stops = x;

    set({ cr_form: y });
  },

  changeProductValue: (value, index, productIndex) => {
    let x = get().cr_form?.stops[index]?.products[productIndex];
    x = value;
    let y = get().cr_form;
    y.stops[index].products[productIndex].text = x;

    set({ cr_form: y });
  },

  favorite_companies: [],
  setFavoriteCompanies: (data) => set({ favorite_companies: data }),
  favorite_addresses: [],
  setFavoriteAddresses: (data) => set({ favorite_addresses: data }),
  type_of_transportation: [],
  setTypeofTransportation: (data) => {
    let x = [];
    data.forEach(element => {
      x.push({ title: element?.title, value: element?.title })
    });
    set({ type_of_transportation: x })
  },

  is_fav_selected: false,
  setFavSelected: (value) => set({ is_fav_selected: value }),
  rate: 0,
  setRate: (value) => set({ rate: value }),
  search_company_key: '',
  setSearchCompanyKey: (value) => set({ search_company_key: value }),
  company_search_result: [],
  setCompanySearchResult: (value) => set({ company_search_result: value }),
  is_company_searching: false,
  setIsCompanySearching: (value) => set({ is_company_searching: value }),

  available_companies: [],
  setAvailableCompanies: (data) => set({ available_companies: data }),

  selected_companies: [],
  setSelectedCompanies: (data) => {
    set({ selected_companies: data });
    handleCompany();
    let x = [];
    data?.forEach(element => {
      x.push(element?.id);
    });
    get().changeCrForm('invitation_ids', x);
  },

  // mass import 
  pasteData: [],
  setPasteData: (data) => set({ pasteData: data }),

  removeAllStops: () => {
    set({ stops: [] });
    set({ invalid_count: 0 });
  },


  is_click_on_validate: false,
  setIsClickOnValidate: (data) => set({ is_click_on_validate: data }),

  generateAdditionalStopsAndPasteInfo: (additionStopCount, property) => {
    for (let i = 0; i < additionStopCount; i++) addStop();
    get().pasteStopInfo(get().pasteData, property);
  },

  setStopPropertyValue: async (index, property, value, event) => {
    // console.log('setStopPropertyValue', index, property, value, event);
    let x = get()?.stops;
    x[index][property] = value === null ? new Date() : value;
    await set({ stops: x });
  },
  removeStop: async (index) => {
    // prevent auto suggestion on paste
    if (get().is_click_on_validate) {
      await set({ is_click_on_validate: false })
      await set({ stops: get().stops.filter((stop, i) => i !== index) });
      setTimeout(() => {
        set({ is_click_on_validate: true })
      }, 500);
    } else {
      // console.log('here', index);
      set({ stops: get().stops.filter((stop, i) => i !== index) });
    }

  },

  pasteStopInfo: (data, property) => {
    let x = get().stops;
    let has_info = false;
    data.forEach((info, i) => {
      x[i][property] = info;
      if (info?.length > 0) has_info = true;
    })
    set({ stops: x });
    if (data?.length > 0 && has_info) {
      Toastr({ message: t('Info Pasted'), type: 'success' });
    }
  },

  invalid_count: 0,
  setInvalidCount: (data) => set({ invalid_count: data }),
  first_invalid_index: -1,
  setFirstInvalidIndex: (data) => set({ first_invalid_index: data }),

  validateStops: async (req_date, req_time) => {
    let stops = get().stops;
    if (!stops || stops.length === 0) return;

    get().setFirstInvalidIndex(-1);
    let all_valid = 1;
    let invalid = 0;
    let x = stops.map((stop, i) => {
      stop.stop_reference = stop.title ?? stop.stop_reference;
      if (stop.stop_reference === null || stop.stop_reference?.length === 0) stop.stop_reference = get().cr_form.title;

      // date time validation
      const { user_role } = useGeneralStore.getState();
      if (user_role === role.company) {
        let is_date_time_valid = true;
        const pickup_date_time = new Date(req_date + " " + req_time);
        const stop_date_time = new Date(stop.date + " " + stop.start_time);
        console.log('pickup_date_time', pickup_date_time);
        console.log('stop_date_time', stop_date_time);


        if (stop_date_time < pickup_date_time) is_date_time_valid = false;
        if (!stop.date || !stop.start_time || !stop.date === '' || !stop.start_time === '') is_date_time_valid = false;

        if (!is_date_time_valid) {
          stop.is_date_time_valid = false;
          all_valid *= 0;
          invalid++;
          if (invalid === 1) get().setFirstInvalidIndex(i);
        } else {
          stop.is_date_time_valid = true;
          all_valid *= 1;
        }
      }

      if (stop.product.length === 0) {
        stop.is_product_valid = false;
        all_valid *= 0;
        invalid++;
        if (invalid === 1) get().setFirstInvalidIndex(i);
        // console.log('here', i);
      }
      else {
        stop.is_product_valid = true;
        all_valid *= 1;
      }

      // zip code validation
      if (stop?.zip !== null && stop?.zip !== undefined && stop?.zip !== '') {
        stop.zip = stop.zip.toString();
        stop.zip.trim();
        parseInt(stop.zip);
      }
      if (stop?.zip?.length === 4 && (stop?.zip >= 1000 && stop?.zip <= 9990)) {
        stop.is_zip_valid = true;
        all_valid *= 1;
      } else {
        stop.is_zip_valid = false;
        all_valid *= 0;
        invalid++;
        if (invalid === 1) get().setFirstInvalidIndex(i);
      }
      if (stop?.zip === 0 || stop?.zip === '0') stop.zip = '';

      return stop;
    });
    console.log('validateStops', x);
    set({ stops: x });

    get().setInvalidCount(invalid);
    all_valid *= await get().addressValidation();
    set({ is_every_thing_valid: all_valid === 1 ? true : false });
    all_valid ? Toastr({ message: t('All stops are valid!'), type: 'success' }) : Toastr({ message: t('Please check the required fields!'), type: 'warning' });
    get().setIsAddressFieldDisable(true);
    setTimeout(() => { get().setIsAddressFieldDisable(false); }, 1);
    return all_valid;
  },

  addressValidation: async () => {
    let stops = get().stops;
    let all_valid = 1;
    setLoading(true);
    let all_address = [];

    // getting location lat lan from address using here api
    for (let i = 0; i < stops.length; i++) {
      if (!stops[i].address || !stops[i].zip) {
        all_address.push({ address: stops[i]?.address ?? '', lat: null, lng: null });
        continue;
      }

      // check postal code before hitting api
      let is_postal_code = checkIsPostalCode(stops[i].address + ',' + stops[i].zip);
      console.log('is_postal_code', is_postal_code);
      if (!is_postal_code) {
        all_address.push({ address: stops[i].address, lat: null, lng: null });
        continue;
      }

      // also set invalid only type postal code
      let is_only_postal_code = checkIsOnlyPostalCode(stops[i].address + ',' + stops[i].zip);
      console.log('is_only_postal_code', is_only_postal_code);
      if (is_only_postal_code) {
        all_address.push({ address: stops[i].address, lat: null, lng: null });
        continue;
      }

      let address = await setAddressPickupPoints(stops[i].address.trim() + ',' + stops[i].zip);
      // check search address is in the suggestion result
      console.log('address', address);
      // console.log('abc', returnAddressWithoutPostalCode(stops[i].address).toLocaleLowerCase());
      let is_included = address?.suggestion?.toLowerCase().includes(returnAddressWithoutPostalCode(address.address).toLocaleLowerCase());
      let is_zip_included = address?.suggestion?.toLowerCase().includes(stops[i].zip);
      if (!is_included || !is_zip_included) {
        all_address.push({ address: stops[i].address, lat: null, lng: null });
        continue;
      }

      all_address.push({ ...address, address: returnAddressWithoutPostalCode(address.address) });
    }
    // console.log('stops', all_address);
    setLoading(false);

    // validating
    let invalid = 0;
    let x = stops.map((stop, i) => {
      stop.address = all_address[i].address;
      stop.lat = all_address[i].lat;
      stop.lng = all_address[i].lng;
      if (stop.address?.length === 0 || stop.lat === null || stop.lng === null || stop.lat === undefined || stop.lng === undefined) {
        stop.is_address_valid = false
        stop.is_zip_valid = false
        all_valid *= 0;
        invalid++;
        if (invalid === 1) {
          if (get().first_invalid_index === -1) get().setFirstInvalidIndex(i);
          else if (get().first_invalid_index > i) get().setFirstInvalidIndex(i);
          // console.log('here2', i);
        }
      }
      else {
        stop.is_address_valid = true;
        stop.is_zip_valid = true;
        all_valid *= 1;
      }
      return stop;
    });

    set({ stops: x });
    get().setInvalidCount(invalid + get().invalid_count);
    return all_valid;
  },

  is_address_field_disable: false,
  setIsAddressFieldDisable: (data) => set({ is_address_field_disable: data }),
  request_title: '',
  setRequestTitle: (data) => set({ request_title: data }),

  is_every_thing_valid: false,
  setIsEveryThingValid: (data) => set({ is_every_thing_valid: data }),

}))


export default useCreateRequestStore;


//! API calls
const { setLoading } = useGeneralStore.getState();

export const getInitData = async () => {
  // setLoading(true);
  const { setFavoriteCompanies, setFavoriteAddresses, setTypeofTransportation } = useCreateRequestStore.getState();

  try {
    const res = await axios.get(kuGetInitData);
    console.log('getInitData: ', res.data);
    if (res.data.success) {
      setFavoriteCompanies(res?.data?.data?.favorite_companies);
      setFavoriteAddresses(res?.data?.data?.favorite_addresses);
      setTypeofTransportation(res?.data?.data?.transportation_types);
    } else {
      Toastr({ message: res.data.message });
    }
    // setLoading(false);
  } catch (err) {
    console.log(err);
    Toastr({ message: t("An error occurred!") });
    // setLoading(false);
  }
}

export const saveRequest = async (action = k_cr_actions.save) => {
  const validate = (action === k_cr_actions.next || action === k_cr_actions.submit) ? validateCrForm() : true;

  if (!validate) {
    Toastr({ message: t('Please filled up all required fields!'), type: 'warning' });
    return;
  }

  const { cr_form, setCrData } = useCreateRequestStore.getState();

  cr_form?.is_mass && await massImportStopDataProcess();
  let data = { ...cr_form, budget: parseInt(cr_form?.budget?.toString()), action: action };
  data = loadCreateRequestDataBeforeApiCall(data);
 
  setLoading(true);

  console.log('saveRequest before: ', data);

  try {
    const res = await axios.post(kuRequestSave, data);
    console.log('saveRequest after: ', res?.data?.data);

    if (res?.data?.success) {
      setCrData(res?.data?.data);
      loadCreateRequestData(res?.data?.data);
      setLoading(false);
      Toastr({ message: res?.data?.message, type: 'success' });
      return true;
    } else {
      Toastr({ message: res?.data?.message ?? t('An error occurred!') });
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.log('saveRequest', err);
    console.log('saveRequest', err?.response);
    Toastr({ message: t("An error occurred!") });
    setLoading(false);
    return false;
  }
}

export const editRequest = async (id) => {
  if (id === null) {
    Toastr({ message: t("Invalid request!"), type: "warning" })
    return
  }

  setLoading(true);

  try {
    const res = await axios.post(kuEditInBidding, { id: id, is_web: 1 });
    console.log('editRequest: ', res?.data?.data);

    if (res.data.success) {
      setLoading(false);
      return true;
    } else {
      Toastr({ message: res?.data?.message })
      setLoading(false);
      return false;
    }


  } catch (err) {
    console.log('editRequest: ', err);
    Toastr({ message: t("An error occurred!") })
    setLoading(false);
    return false;
  }
}

export const searchCompany = async (text, rate) => {
  console.log("rate", rate)
  console.log("text", text)
  const { setCompanySearchResult, setIsCompanySearching } = useCreateRequestStore.getState();
  // console.log('rate', rate);
  try {
    if (rate === 0) rate = null
    setIsCompanySearching(true);
    const res = await axios.get(kuSearchCompany, { params: { search: text, rate: rate } });

    console.log('searchCompany', res?.data);
    if (res?.data?.success) {
      setCompanySearchResult(res?.data?.data);
    } else {
      Toastr({ message: res?.data?.message })
    }
    setIsCompanySearching(false);
  } catch (err) {
    console.log(err);
    Toastr({ message: t('An error occurred!') });
    setIsCompanySearching(false);
  }
}


//! helpers functions
export const generateCreateRequestSummaryContent = () => {
  const { cr_form, current_step } = useCreateRequestStore.getState();
  const data = cr_form;
  return (current_step === create_request_steps.pickup && cr_form?.is_mass ) ? [
    { title: 'Title', description: data?.title?.length > 0 ? data?.title : 'NA' },
    { title: 'Transportation Type', description: data?.transport_type?.length > 0 ? data?.transport_type : 'NA' },
    { title: 'Pickup Date', description: formatDate(data?.pickup_date) ?? 'NA' },
    { title: 'Pickup Time', description: data?.pickup_start_time ? (formatTime(data?.pickup_start_time) ?? '--') + ' - ' + (formatTime(data?.pickup_end_time) ?? '--') : 'NA' },
  ] : [
    { title: 'Title', description: data?.title?.length > 0 ? data?.title : 'NA' },
    { title: 'Transportation Type', description: data?.transport_type?.length > 0 ? data?.transport_type : 'NA' },
    { title: 'Pickup Date', description: formatDate(data?.pickup_date) ?? 'NA' },
    { title: 'Pickup Time', description: data?.pickup_start_time ? (formatTime(data?.pickup_start_time) ?? '--') + ' - ' + (formatTime(data?.pickup_end_time) ?? '--') : 'NA' },
    { title: 'Delivery Overview', description: `${data?.stops?.length} ${data?.stops?.length > 1 ? t('stops') : t('stop')} (${countAllStopsProducts(data?.stops)} ${countAllStopsProducts(data?.stops) > 1 ? t('packages') : t('package')})` },
  ];
}

export const generateCreateRequestSummaryContent2 = () => {
  const { cr_form, current_step } = useCreateRequestStore.getState();
  const { user_role } = useGeneralStore.getState();
  const data = cr_form;

  if (user_role === role.company && current_step === create_request_steps.select_shift) {
    return [
      { title: t('Driver Name'), description: data?.shift_plan?.driver_user?.name ?? 'NA' },
      { title: t('Vehicle Number'), description: data?.shift_plan?.car?.car_license_plate_number ?? 'NA' },
    ];
  }

  if (user_role === role.customer && current_step === create_request_steps.select_company) {
    return [
      { title: t('Direct Invite'), description: cr_form?.invitation_ids?.length ?? 0 },
      { title: t('Global Invite'), description: cr_form?.is_global ? t('Submitted') : t('Not Submitted') },
    ];
  }

}

export const countAllStopsProducts = (stops) => {
  let x = 0;
  stops?.forEach(element => {
    let y = 0;
    element?.products?.forEach(product => {
      if (product?.text && product?.text?.length > 0) y++;
    })
    x += y;
  });

  return x;
}

export const clearCrForm = async () => {
  const { user_role } = useGeneralStore.getState();
  const { current_step, cr_form, clearCrFormData } = useCreateRequestStore.getState();

  if (user_role === role.customer) {
    if (current_step === create_request_steps.pickup) {
      let x = {
        ...cr_form,
        title: '',
        transport_type: '',
        pickup_date: '',
        pickup_date_formatted: '',
        pickup_start_time: '',
        pickup_end_time: '',
        pickup_avg: '',
        pickup_address: '',
        pickup_lat: '',
        pickup_lng: '',
        pickup_comment: '',
        pickup_attachment: '',
        temp_pickup_attachment: null,
        pickup_attachment_url: '',

        // deliveries
        stops: [
          {
            address: '',
            lat: '',
            lng: '',
            comment: '',
            attachment: '',
            attachment_url: '',
            temp_attachment: null,
            products: [{ text: '' },],
            has_old_image: 0,
          },
        ],
      };
      clearCrFormData(x);
    }

    if (current_step === create_request_steps.select_company) {
      const { setSearchCompanyKey, setSelectedCompanies, setRate, setFavSelected } = useCreateRequestStore.getState();
      let x = {
        ...cr_form,
        is_global: 0,
      }
      clearCrFormData(x);
      setSearchCompanyKey('');
      setSelectedCompanies([]);
      setRate(0);
      setFavSelected(false)
    }
  } else if (user_role === role.company) {
    if (current_step === create_request_steps.pickup) {

      let x = {
        ...cr_form,
        title: '',
        transport_type: '',
        pickup_date: '',
        pickup_date_formatted: '',
        pickup_start_time: '',
        pickup_end_time: '',
        pickup_avg: '',
        pickup_address: '',
        pickup_lat: '',
        pickup_lng: '',
        pickup_comment: '',
        pickup_attachment: '',
        temp_pickup_attachment: null,
        pickup_attachment_url: '',

        // deliveries
        stops: [
          {
            date: '',
            formatted_date: '',
            start_time: '',
            end_time: '',
            delivery_time: '',
            address: '',
            lat: '',
            lng: '',
            comment: '',
            attachment: '',
            attachment_url: '',
            temp_attachment: null,
            products: [{ text: '' },],
            has_old_image: 0,
          },
        ],
      };
      clearCrFormData(x);
    }

    if (current_step === create_request_steps.select_shift) {
      let x = {
        ...cr_form,
        shift_plan: null,
        shift_id: null,
        bid_details: '',
        budget: '',

      };
      clearCrFormData(x);
    }
  }

  if (current_step === create_request_steps.mass_import) {
    const { stops, setStops } = useCreateRequestStore.getState();
    await setStops([]);
    for (let i = 0; i < stops.length; i++) addStop();
  }
}

export const validateCrForm = () => {
  const { cr_form, current_step, request_type } = useCreateRequestStore.getState();
  const { user_role } = useGeneralStore.getState();
  let required_fields = [];

  if (current_step === create_request_steps.pickup) {
    if (cr_form?.title === '' || !cr_form?.title) {
      required_fields.push('Pickup Title');
    } else if (cr_form?.transport_type === '' || !cr_form?.transport_type) {
      required_fields.push('Transportation Type');
    } else if (cr_form?.pickup_date === '' || !cr_form?.pickup_date) {
      required_fields.push('Pickup Date');
    } else if (cr_form?.pickup_start_time === '' || !cr_form?.pickup_start_time) {
      required_fields.push('Pickup start time');
    } else if (cr_form?.pickup_end_time === '' || !cr_form?.pickup_end_time) {
      required_fields.push('Pickup end time');
    } else if (cr_form?.pickup_address === '' || !cr_form?.pickup_address) {
      required_fields.push('Pickup address');
    } else if (cr_form?.pickup_lat === '' || !cr_form?.pickup_lat) {
      required_fields.push('Pickup address');
      Toastr({ message: t('Invalid pickup address'), type: 'info' });
    } else if (cr_form?.pickup_lng === '' || !cr_form?.pickup_lng) {
      required_fields.push('Pickup address');
      Toastr({ message: t('Invalid pickup address'), type: 'info' });
    } else if (cr_form?.pickup_date && cr_form?.pickup_start_time) {
      const res = pickupDateTimeValidation(cr_form?.pickup_date, cr_form?.pickup_start_time);
      if (!res) required_fields.push('Pickup start time');
    }

    if ((user_role === role.customer) && (request_type === create_request_type.normal)) {
      cr_form?.stops?.forEach((stop, index) => {
        if (stop?.address === '' || !stop?.address) {
          required_fields.push('Delivery address');
        } else if (stop?.lat === '' || !stop?.lat) {
          required_fields.push('Delivery address');
          Toastr({ message: `${t('Invalid delivery')} ${index + 1} ${('address')}`, type: 'info' });
        } else if (stop?.lng === '' || !stop?.lng) {
          required_fields.push('Delivery address');
          Toastr({ message: `${t('Invalid delivery')} ${index + 1} ${('address')}`, type: 'info' });
        }

        if (stop?.products?.length > 0) {
          stop?.products?.forEach(product => {
            if (!product?.text || product?.text?.length === 0) {
              required_fields.push('Product');
            }
          });
        }
      });
    } else if (user_role === role.company && (request_type === create_request_type.normal)) {
      cr_form?.stops?.forEach((stop, index) => {
        if (stop?.date === '' || !stop?.date) {
          required_fields.push('Delivery Date');
        } else if (stop?.start_time === '' || !stop?.start_time) {
          required_fields.push('Delivery start time');
        } else if (stop?.end_time === '' || !stop?.end_time) {
          required_fields.push('Delivery end time');
        } else if (stop?.address === '' || !stop?.address) {
          required_fields.push('Delivery address');
        } else if (stop?.lat === '' || !stop?.lat) {
          required_fields.push('Delivery address');
          Toastr({ message: `${t('Invalid delivery')} ${index + 1} ${('address')}`, type: 'info' });
        } else if (stop?.lng === '' || !stop?.lng) {
          required_fields.push('Delivery address');
          Toastr({ message: `${t('Invalid delivery')} ${index + 1} ${('address')}`, type: 'info' });
        } else if (stop?.date && stop?.start_time && cr_form?.pickup_date && cr_form?.pickup_start_time) {
          const res = deliveryDateTimeValidation(stop?.date, stop?.start_time, cr_form?.pickup_date, cr_form?.pickup_start_time, index);
          if (!res) required_fields.push('Delivery time');
        }
        if (stop?.products?.length > 0) {
          stop?.products?.forEach(product => {
            if (!product?.text || product?.text?.length === 0) {
              required_fields.push('Product');
            }
          });
        }
      });
    }
  }



  if (required_fields?.length > 0) {
    console.log('fields', required_fields);
    return false;
  }
  else return true;

}

export const pickupDateTimeValidation = (pickup_date, pickup_time) => {
  const pickup_date_time = new Date(pickup_date + " " + pickup_time);
  const current_date_time = new Date();
  if (pickup_date_time < current_date_time) {
    Toastr({ message: t('Invalid pickup date time! You must select a future date time!'), type: "info" })
    return false
  } else return true;
}

export const deliveryDateTimeValidation = (data, time, pickup_date, pickup_time, index) => {
  const date_time = new Date(data + " " + time);
  const pickup_date_time = new Date(pickup_date + " " + pickup_time);
  if (date_time < pickup_date_time) {
    Toastr({ message: `${t('Invalid delivery')} ${index + 1} ${('date time! You must select a future date time from pick up!')}`, type: "info" })
    return false
  } else return true;
}

export const loadCreateRequestDataBeforeApiCall = (data) => {
  const { setCrFullForm } = useCreateRequestStore.getState();

  let stops = data?.stops;
  let y = [];
  stops.forEach((stop, index) => {
    y.push({
      ...stop,
      products: checkProducts(stop?.products),
    });
  });

  let x = {
    ...data,
    stops: y,
  }
  setCrFullForm(x);
  console.log('form', x);
  return x;
}

// it's after api call
export const loadCreateRequestData = (data) => {
  const { setCrFullForm, cr_form, setSelectedCompanies, setStops } = useCreateRequestStore.getState();
  let stops = data?.stops;
  let y = [];
  stops?.forEach((stop, index) => {
    if (cr_form?.is_mass) {
      stop.product = stop.products[0]?.text ?? '';
      stop.stop_reference = stop.title;
      stop.is_address_valid = true;
      stop.is_date_time_valid = true;
      stop.is_product_valid = true;
      stop.is_zip_valid = true;

      // address formatting
      let address_arr = stop.address.split(',');
      stop.address = address_arr.slice(0, address_arr.length - 1).join(',');
      stop.zip = parseInt(address_arr[address_arr.length - 1]);
    }

    y.push({
      ...stop,
      start_time: formatTime(stop?.start_time),
      end_time: formatTime(stop?.end_time),
      date: stop?.date,
      formatted_date: stop?.date ? getStringFromDateObject(stop?.date ?? '') : '',
      has_old_image: stop?.attachment ? 1 : 0,
      attachment: cr_form?.stops[index]?.temp_attachment,
      temp_attachment: cr_form?.stops[index]?.temp_attachment,
      attachment_url: stop?.attachment,
      lat: stop?.address_lat ?? stop?.lat,
      lng: stop?.address_lng ?? stop?.lng,
      products: stop?.products?.length === 0 ? [{ text: '' },] : stop?.products,
    });
  });

  let x = {
    ...data,
    pickup_start_time: formatTime(data?.pickup_start_time),
    pickup_end_time: formatTime(data?.pickup_end_time),
    pickup_date: data?.pickup_date ?? '',
    pickup_date_formatted: data?.pickup_date ? getStringFromDateObject(data?.pickup_date ?? '') : '',
    has_old_image: data?.pickup_attachment ? 1 : 0,
    pickup_attachment: cr_form?.temp_pickup_attachment,
    temp_pickup_attachment: cr_form?.temp_pickup_attachment,
    pickup_attachment_url: data?.pickup_attachment,
    shift_id: data?.shift_plan?.id,
    bid_details: data?.my_bid?.details,
    budget: data?.my_bid?.budget === 0 ? null : data?.my_bid?.budget,
    is_web: true,
    shift_plan: { ...data?.shift_plan, driver_user: data?.driver, car: { car_license_plate_number: data?.car_license_number } },

    stops: y,
  }
  setCrFullForm(x);
  console.log('form', x);

  if (cr_form?.is_mass) {
    setStops(stops)
  }

  let z = [];
  data?.invitation_data?.forEach(element => {
    let y = { ...element, id: element?.user_id }
    z.push(y);
  });
  setSelectedCompanies(z);
}

export const filterCompany = (data, key, rate) => {
  let x = data?.filter(item => {
    if (item?.name?.toLowerCase()?.includes(key?.toLowerCase()) && item?.rate <= rate) return item
    return null
  });
  return x;
}

export const handleCompany = () => {
  const { search_company_key, rate, company_search_result, setAvailableCompanies, favorite_companies, is_fav_selected, selected_companies } = useCreateRequestStore.getState();
  let x = [];

  if (is_fav_selected) {
    let a = filterCompany(favorite_companies, search_company_key ?? '', rate === 0 ? 5 : rate);
    let b = [...company_search_result, ...a];
    x = b?.filter(i => i.is_favorite === true)
  }
  else x = [...company_search_result];

  x = x.filter(itemX => !selected_companies.some(itemY => itemX.id === itemY.id));

  setAvailableCompanies(x);
};

export const checkProducts = (products) => {
  let x = [];
  products?.forEach(product => {
    if (!product?.text || product?.text === '') {

    } else x.push(product);
  });
  console.log('products', x);
  return x;
}

// mass import
export const addStop = () => {
  const { stops, setStops } = useCreateRequestStore.getState();
  const newStop = {
    stop_reference: '',
    is_stop_reference_valid: true,
    address: '',
    lat: null,
    lng: null,
    is_address_valid: true,
    zip: '',
    is_zip_valid: true,
    product: '',
    is_product_valid: true,
    start_time: '',
    end_time: '',
    date: '',
    is_date_time_valid: true,
    comment: '',
    attachment: null,
  };
  setStops([...stops, newStop]);
}


export const formatPasteData = (data = []) => {
  let index = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].length !== 0) index = i
  }
  return data.slice(0, index + 1);
}

const checkIsPostalCode = (address) => {
  let y = address.split(',');
  let z = y[y.length - 1].trim()
  z = parseInt(z.toString())
  if (z >= 1000 && z <= 9990) { // denmark postal code range is 1000-9990
    return true;
  } else {
    return false;
  }
}

const checkIsOnlyPostalCode = (x) => {
  let y = x.split(',');
  if (y.length < 2) return false;
  let address = '';
  // join all the address except the last one
  for (let i = 0; i < y.length - 1; i++) {
    address += y[i];
  }

  console.log('checkIsOnlyPostalCode: ', address);
  if (address === '') return true;
  else return false;
}

const returnAddressWithoutPostalCode = (x) => {
  let index = x.lastIndexOf(',');
  return x.substring(0, index);
}

export const setAddressPickupPoints = async (address) => {
  const res = await fetch(`https://geocode.search.hereapi.com/v1/geocode?apiKey=${here_api_key}&q=` + address + "&in=countryCode:BGD,DNK")
    .then((response) => response.json())
    .then((json) => {
      console.log('geo-code: ', json);
      try {
        const position = json?.items[0]?.position ?? null;
        // console.log('position: ', position);
        return { address: address, lat: position?.lat, lng: position?.lng, suggestion: suggestionFormat(json?.items[0]?.address) };
      } catch (error) {
        console.log(error);
        return null;
      }
    });
  return res;
}

export const massImportStopDataProcess = async () => {
  const { stops, cr_form, setCrFullForm } = useCreateRequestStore.getState();
  let data = cr_form;
  let temp_stops = JSON.parse(JSON.stringify(stops));

  if (!cr_form?.is_mass) return;
  if (stops.length === 0) data.stops = [];

  console.log('temp_stops: ', temp_stops);
  let products = [];

  temp_stops.forEach((stop, index) => {
    stop.title = stop.stop_reference;
    if (stop?.product?.length === 0) stop.products = [];
    if (stop?.product?.length > 0 && stop?.products?.length > 0) stop.products[0].text = stop.product;
    if (stop?.product?.length > 0 && (stop?.products?.length === 0 || stop?.products === undefined)) {
      stop.products = [{ text: stop.product }];
      products.push([{ text: stop.product }]);
    };

    stop?.products?.length > 0 && products.push(stop.products[0]);
    if (stop.zip !== undefined && stop.zip !== null && stop.zip !== '' && stop.zip >= 1000 && stop.zip <= 9990)
      stop.address = stop.address + ', ' + stop.zip;
    else if (stop.zip !== undefined && stop.zip !== null && stop.zip !== '') stop.address = stop.address + ', ' + stop.zip;
    else stop.address = stop.address + ', 0000';
  });
  data.stops = temp_stops;
  console.log('temp_stops: ', temp_stops, data);
  await setCrFullForm(data);
  return;
}

export const stopsToCrFrom = async () => {
  const { cr_form, stops } = useCreateRequestStore.getState();
  let x = cr_form;
  x = { ...x, stops: stops };
  await loadCreateRequestDataBeforeApiCall(x);
  console.log('stopsToCrFrom', x);
  return;
}