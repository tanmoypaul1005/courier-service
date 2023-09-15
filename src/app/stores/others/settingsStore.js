import axios from "axios";
import i18next from "i18next";
import { create } from "zustand";
import { kuAddTerms, kuChangePassword, kuCommonToggleAdminAccess, kuContactLimadi, kuDeleteUserAccount, kuEditProfile, kuGetDeleteAccountRequirements, kuGetFaq, kuGetProfileDetails, kuGetTerms, kuGetTermsAndCondition, kuGetToggleEmailPushNotificationState, kuRatingAndReview, kuSetLanguage, kuToggleEmailPushNotification, kuUpdateTerms } from "../../urls/commonUrl";
import { user_role } from "../../utility/const";
import { Toastr } from "../../utility/utilityFunctions";
import useAuthStore from "./authStore";
import useGeneralStore from "./generalStore";
import { t } from "i18next";
const { setLoading } = useGeneralStore.getState();

const useSettingsStore = create((set, get) => ({

  faqList: [],
  setFaqList: (value) => set({ faqList: value }),

  termsAndConditionData: "",
  setTermsAndConditionData: (value) => set({ termsAndConditionData: value }),

  profileDetails: "",
  setProfileDetails: (value) => set({ profileDetails: value }),

  pushNotification: false,
  setPushNotification: (value) => set({ pushNotification: value }),

  emailNotification: false,
  setEmailNotification: (value) => set({ emailNotification: value }),

  adminAccess: false,
  setAdminAccess: (value) => set({ adminAccess: value }),

  profileImage: "",
  setProfileImage: (value) => set({ profileImage: value }),

  termsData: "",
  setTermsData: (value) => set({ termsData: value }),

  editTermsData: "",
  setEditTermsData: (value) => set({ editTermsData: value }),

  termsID: "",
  setTermsID: (value) => set({ termsID: value }),

  ratingAndReviewDetails: {},
  setRatingAndReviewDetails: (value) => set({ ratingAndReviewDetails: value }),

  ratingAndReview: [],
  setRatingAndReview: (value) => set({ ratingAndReview: value }),

  tampRatingAndReview: [],
  setTampRatingAndReview: (value) => set({ tampRatingAndReview: value }),

  ratingValue: '0',
  setRatingValue: (value) => set({ ratingValue: value }),

  selectedCompanyId: '',
  setSelectedCompanyId: (value) => set({ selectedCompanyId: value }),

  editCompanyProfile_form: {
    id: "", name: "", cvr: "", email: "", phone: "", image: "", address: "", about: "", lat: "", lng: ""
  },
  setEditCompanyProfile_form: (value) => set({ editCompanyProfile_form: value }),

  companyProfileImage: "",
  setCompanyProfileImage: (value) => set({ companyProfileImage: value }),

  delete_account_requirements: null,
  setDeleteAccountRequirements: (data) => set({ delete_account_requirements: data }),

  changePasswordForm: { old_password: "", password: "", password_confirmation: "" },
  setChangePasswordForm: (value) => set({ changePasswordForm: value }),

  contactForm: { message: "", subject: "" },
  setContactForm: (value) => set({ contactForm: value }),

  //All Modal
  showProfileEditModal: false,
  setShowProfileEditModal: (value) => set({ showProfileEditModal: value }),

  showChangePasswordModal: false,
  setShowChangePasswordModal: (value) => set({ showChangePasswordModal: value }),

  showEditCompanyPolicyModal: false,
  setShowEditCompanyPolicyModal: (value) => set({ showEditCompanyPolicyModal: value }),
  app_lang_code: 'en',
  setAppLangCode: (langCode) => set({ app_lang_code: langCode }),

  profileDropDownOpen: false,
  setProfileDropDownOpen: (value) => set({ profileDropDownOpen: value }),

  showDeleteAccountModal: false,
  setShowDeleteAccountModal: (value) => set({ showDeleteAccountModal: value }),

  showAboutCompanyModal: false,
  setShowAboutCompanyModal: (value) => set({ showAboutCompanyModal: value }),

  showReviewModal: false,
  setShowReviewModal: (value) => set({ showReviewModal: value }),


}));
export default useSettingsStore;

//Contact us
export const submitContactMessage = async (body) => {

  try {
    setLoading(true)
    const data = { 'message': body.message, 'subject': body.subject };

    const res = await axios.post(kuContactLimadi, data);
    console.log('submitContactMessage:::', res.data);
    if (res?.data?.success) {
      // Toastr({ "message": res?.data?.message, type: 'success' });
      setLoading(false)
      return true
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false)
      return false
    }

  } catch (error) {
    console.log('submitContactMessage:::', error);
    Toastr({ "message": t(t("An error occurred!")), type: 'error' });
    setLoading(false);
    return false;
  }
};

//FAQ LIST
export const getFaqList = async () => {
  const { setFaqList } = useSettingsStore.getState();
  try {
    setLoading(true)
    const res = await axios.get(kuGetFaq);
    console.log('FAQ List::::::', res.data);
    if (res?.data?.success) {
      setFaqList(res?.data?.data)
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    setLoading(false);
  } catch (error) {
    console.log('FAQ List::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
  }
};

// Get Terms And Condition
export const getTermsAndCondition = async () => {
  const { setTermsAndConditionData } = useSettingsStore.getState();
  try {
    setLoading(true)
    const res = await axios.get(kuGetTermsAndCondition);
    console.log('getTermsAndCondition::::::', res.data);
    if (res?.data?.success) {
      setTermsAndConditionData(res?.data?.data)
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    setLoading(false);
  } catch (error) {
    console.log('getTermsAndCondition Error::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

// Get Profile
export const getProfileDetails = async () => {
  const { setProfileDetails } = useSettingsStore.getState();
  try {
    setLoading(true)
    const res = await axios.get(kuGetProfileDetails);
    console.log('getProfileDetails::::::', res.data);

    if (res.data.success) {
      setProfileDetails(res?.data?.data)
      if (res?.data?.data?.role === user_role.company) {
        await getTerms(res?.data?.data?.id)
      }
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    if (res?.data?.data?.role !== user_role.company) {
      setLoading(false);
    }
  } catch (error) {
    console.log('getProfileDetails Error::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

// Update Profile
export const editProfile = async (body) => {
  //TODO:: try to make it more optimized. too much server call
  try {
    setLoading(true)
    const res = await axios.post(kuEditProfile, body);
    console.log('editProfile::::::', res?.data);
    if (res?.data?.success) {
      setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log('editProfile Error::::::', error);
    Toastr({ "message": t(t("An error occurred!")), type: 'error' });
    setLoading(false);
    return false;
  }
};

//get Toggle Email Push Notification State
export const getToggleNotificationState = async () => {
  const { setPushNotification, setEmailNotification, setAdminAccess } = useSettingsStore.getState();
  try {
    setLoading(true)
    const res = await axios.get(kuGetToggleEmailPushNotificationState);
    console.log('getToggleNotificationState::::::', res.data);
    if (res.data.success) {
      setPushNotification(res?.data?.data?.is_push);
      setEmailNotification(res?.data?.data?.is_email);
      setAdminAccess(res?.data?.data?.is_admin_access);
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    setLoading(false);
  } catch (error) {
    console.log('getToggleNotificationState Error::::::', error);
    Toastr({ "message": t(t("An error occurred!")), type: 'error' });
    setLoading(false);
  }
};


export const handleNotificationToggle = async (data, type) => {

  const { setPushNotification, setEmailNotification, pushNotification, emailNotification } = useSettingsStore.getState();

  let body = {}

  if (type === "is_push") {
    body = { "is_push": data?.is_push }
  } else {
    body = { "is_email": data?.is_email }
  }

  try {
    setLoading(true)
    const res = await axios.post(kuToggleEmailPushNotification, body);
    console.log('handleNotificationToggle::::::', res.data);
    if (res.data.success) {
      if (type === 'is_push') {
        setPushNotification(!pushNotification);
      } else if (type === 'is_email') {
        setEmailNotification(!emailNotification);
      }

    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    setLoading(false);
  } catch (error) {
    console.log('handleNotificationToggle Error::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

//Change Password
export const submitChangePassword = async () => {
  const { changePasswordForm } = useSettingsStore.getState()
  try {
    setLoading(true)
    const res = await axios.post(kuChangePassword, changePasswordForm);
    console.log('submitChangePassword::::::', res.data);
    if (res.data.success) {
      // Toastr({ "message": res?.data?.message, type: 'success' });
      setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false);
      return false;
    }
  } catch (error) {
    console.log('submitChangePassword Error::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

// get Terms
export const getTerms = async (company_id) => {
  if (!company_id) {
    return Toastr({ "message": "Invalid user", type: 'warning' });
  }
  const { setTermsData, setTermsID } = useSettingsStore.getState();
  try {
    // setLoading(true)
    const res = await axios.get(kuGetTerms, {
      params: {
        company_id: company_id,
      },
    });
    console.log('getTerms::::::', res.data);
    if (res.data.success) {
      setTermsData(res?.data?.data?.terms_condition?.terms_condition ?? '');
      setTermsID(res?.data?.data?.terms_condition?.id);
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
    }
    setLoading(false);
  } catch (error) {
    console.log('getTerms Error::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

// Update Terms
export const updateTerms = async () => {

  const { termsID, setTermsData, editTermsData } = useSettingsStore.getState();

  try {
    setLoading(true)
    let body = {}
    if (!termsID) {
      body = {
        app_type: "company_own",
        type: "terms",
        description: editTermsData ?? '',
      }
    } else {
      body = {
        app_type: user_role?.company,
        type: "terms",
        id: termsID,
        description: editTermsData ?? '',
      }
    }

    if (editTermsData === null || editTermsData === '') return;
    const res = await axios.post(!termsID ? kuAddTerms : kuUpdateTerms, body);
    console.log('updateTerms::::::', res.data);
    if (res?.data?.success) {
      setTermsData(editTermsData)
      setLoading(false);
      return true;
    } else {
      Toastr({ "message": res?.data?.message, type: 'error' });
      setLoading(false)
      return false;
    }
    // setLoading(false);
  } catch (error) {
    console.log('updateTerms Error::::::', error);
    Toastr({ "message": t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
};

export const setAppLangCodeFoo = async (lang_code = 'en') => {
  const { setAppLangCode } = useSettingsStore.getState();
  try {
    setLoading(true)
    const res = await axios.post(kuSetLanguage, { lang_code: lang_code });
    console.log("setAppLangCodeFoo: ", res.data);

    if (res.data.success) {
      setAppLangCode(lang_code)
      i18next.changeLanguage(lang_code);
      localStorage.setItem("lang_code", lang_code);
    }
    else Toastr({ message: res.data.message, ype: 'error' });

    setLoading(false)
  } catch (err) {
    console.log('setAppLangCodeFoo: ', err);
    setLoading(false)
    Toastr({ message: t("An error occurred!"), type: 'error' });
  }
}

// account delete
export const fetchDeleteAccountRequirements = async (type = "") => {

  const { setDeleteAccountRequirements } = useSettingsStore.getState();

  try {
    setLoading(true);
    const res = await axios.get(kuGetDeleteAccountRequirements + `?app_type=${type}`);
    console.log("fetchDeleteAccountRequirements: ", res.data);
    if (res.data.success) {
      setDeleteAccountRequirements(res?.data?.data);
    } else {
      Toastr({ message: res.data.message, ype: 'error' });
    }
    setLoading(false);
  } catch (err) {
    console.log("fetchDeleteAccountRequirements: ", err);
    Toastr({ message: t("An error occurred!"), type: 'error' });
    setLoading(false);
  }
}

// account delete
export const deleteUserAccount = async () => {
  const { setIsLoggedIn } = useAuthStore.getState()
  try {
    setLoading(true);
    const res = await axios.post(kuDeleteUserAccount);
    console.log("deleteUserAccount: ", res.data);
    if (res.data.success) {
      Toastr({ message: 'Account Delete Successful!', type: 'success' });
      setIsLoggedIn(false);
      localStorage.clear();
      sessionStorage.clear();
      setLoading(false);
      return true;
    } else {
      Toastr(res.data.message);
      setLoading(false);
      return false;
    }

  } catch (err) {
    console.log("deleteUserAccount: ", err);
    Toastr({ message: t("An error occurred!"), type: 'error' });
    setLoading(false);
    return false;
  }
}


export const getRatingAndReview = async () => {
  const { selectedCompanyId, setRatingAndReviewDetails, setRatingAndReview, setTampRatingAndReview } = useSettingsStore.getState();
  try {
    setLoading(true);
    console.log("selectedCompanyId", selectedCompanyId)
    let res;
    if (selectedCompanyId) {
      res = await axios.get(kuRatingAndReview, { params: { company_user_id: selectedCompanyId } });
    } else {
      res = await axios.get(kuRatingAndReview);
    }

    console.log("getRatingAndReview: ", res.data);

    if (res.data.success) {
      setRatingAndReviewDetails(res?.data?.data);
      setRatingAndReview(res?.data?.data?.reviews);
      setTampRatingAndReview(res?.data?.data?.reviews);
    }
    else Toastr({ message: res.data.message, ype: 'error' });

    setLoading(false)
  } catch (err) {
    console.log('RatingAndReview: ', err);
    setLoading(false)
    Toastr({ message: t("An error occurred!"), type: 'error' });
  }
}

// b        toggle admin access
export const toggleAdminAccess = async () => {

  try {
    setLoading(true);

    const res = await axios.post(kuCommonToggleAdminAccess);


    console.log("toggleAdminAccess: ", res.data);

    if (res.data.success) {
      await getToggleNotificationState()
      Toastr({ message: res.data.message, type: 'success' });
    }
    else Toastr({ message: res.data.message, type: 'error' });

    setLoading(false)
  } catch (err) {
    console.log('toggleAdminAccess: ', err);
    setLoading(false)
    Toastr({ message: t("An error occurred!"), type: 'error' });
  }
}