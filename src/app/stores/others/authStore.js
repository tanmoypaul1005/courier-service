import axios from "axios";
import { create } from "zustand";
import { kuAuthVerify, kuCommonExpressLogin, kuForgetPassword, kuFpOtpVerify, kuRegister, kuResendOtp, kuResetPassword } from "../../urls/commonUrl";
import { kuAuthUser, kuLogin, kuLogout } from "../../urls/commonUrl";
import AxiosHeader from "../../utility/AxiosHeader";
import { k_submit_otp_type } from "../../utility/const";
import { setAppLanguage, setAppSidebarList, Toastr } from "../../utility/utilityFunctions";
import useGeneralStore from "./generalStore";

const { setHasUnseenNotification } = useGeneralStore.getState();

const useAuthStore = create((set, get) => ({
  is_logged_in: false,
  setIsLoggedIn: (value) => set({ is_logged_in: value }),

  is_verified: true,
  setIsVerified: (value) => set({ is_verified: value }),

  showExpressLogoutModal: false,
  setShowExpressLogoutModal: (value) => set({ showExpressLogoutModal: value }),

  login_form: { email: "", password: "", is_web: 1 },
  changeLoginForm: (e) => set({ login_form: { ...get().login_form, [e.target.name]: e.target.value } }),
  resetLoginForm: () => set({ login_form: { email: "", password: "", is_web: 1 } }),

  register_form: { cvr: "", name: "", email: "", password: "", confirm_password: "", is_web: 1 },
  setRegisterForm: (e) => set({ register_form: { ...get().register_form, [e.target.name]: e.target.value } }),
  resetRegisterForm: () => set({ register_form: { cvr: "", name: "", email: "", password: "", confirm_password: "", is_web: 1 } }),

  submit_otp_type: k_submit_otp_type.auth_verify,
  setSubmitOtpType: (value) => set({ submit_otp_type: value }),

  forget_password_form: { new_password: "", confirm_password: "" },
  setForgetPasswordForm: (e) => set({ forget_password_form: { ...get().forget_password_form, [e.target.name]: e.target.value } }),
  resetForgetPasswordForm: () => set({ forget_password_form: { new_password: "", confirm_password: "" } }),

}));

const { setLoading, } = useGeneralStore.getState();

export const checkAuthUser = async () => {
  const { setUserRole, setLoaded } = useGeneralStore.getState();
  const { setIsLoggedIn, setIsVerified } = useAuthStore.getState();
  try {
    setLoading(true)
    const res = await axios.get(kuAuthUser);
    console.log("checkAuthUser: ", res.data);

    if (res?.data?.success) {
      setIsLoggedIn(res?.data?.data?.is_verified ? true : false);
      setIsVerified(res?.data?.data?.is_verified ? true : false)
      setUserRole(res?.data?.data?.role);
      setAppSidebarList(res?.data?.data?.role);
      setAppLanguage(res?.data?.data?.lang_code);

      localStorage.setItem('user', JSON.stringify(res?.data?.data));
      localStorage.setItem("numOfUnreadNotification", res?.data?.data?.unread_notification);
      setHasUnseenNotification();
    } else {
      setIsLoggedIn(false);
      Toastr({ message: res?.data?.message ? res?.data?.message : "Something went wrong", type: "error" });
    }
    setLoading(false);
    setLoaded(true);
  } catch (err) {
    console.log('checkAuthUser: ', err);
    setLoading(false)
    Toastr({ message: ('An error occurred!') });
    setIsLoggedIn(false);
    setLoaded(true);
  }
}

export const login = async (navigateTo, remember_me) => {
  const { login_form, setIsVerified, setSubmitOtpType, resetLoginForm } = useAuthStore.getState();
  try {
    setLoading(true)

    const res = await axios.post(kuLogin, login_form);
    console.log("login: ", res.data);

    if (res?.data?.success) {
      Toastr({ message: res.data.message, type: 'success' });
      console.log('user', res?.data?.data?.user);
      if (res?.data?.data?.user?.is_verified === 0) {
        navigateTo('/otp-verification');
        sessionStorage.setItem('user_email', res?.data?.data?.user?.email);
        setSubmitOtpType(k_submit_otp_type.auth_verify);
      }
      setIsVerified(res?.data?.data?.user?.is_verified === 0 ? false : true);

      if (remember_me) {
        localStorage.setItem('limadi_token', res?.data?.data?.token);
      } else {
        sessionStorage.setItem('limadi_token', res?.data?.data?.token);
      }

      AxiosHeader(res?.data?.data?.token, res?.data?.data?.user?.role);
      checkAuthUser();
      resetLoginForm();
    } else {
      Toastr({ message: res?.data?.message })
      setLoading(false)
    }
  } catch (err) {
    console.log('login: ', err);
    setLoading(false)
    Toastr({ message: ('An error occurred!') });
  }
}

export const register = async (userType, navigateTo) => {
  try {
    const { register_form, setSubmitOtpType, resetRegisterForm } = useAuthStore.getState();

    setLoading(true);
    let body = {};
    if (userType === 'private') {
      body = {
        ...register_form,
        password_confirmation: register_form.confirm_password,
        role: 'private',
      }
    } else {
      body = {
        ...register_form,
        password_confirmation: register_form.confirm_password,
        role: 'company',
      }
    }

    const res = await axios.post(kuRegister, body);

    console.log('register: ', res.data);

    if (res.data.success) {
      sessionStorage.setItem('limadi_token', res?.data?.data?.token);
      AxiosHeader(res?.data?.data?.token, res?.data?.data?.user?.role);
      navigateTo('/otp-verification');
      sessionStorage.setItem('user_email', register_form?.email);
      setSubmitOtpType(k_submit_otp_type.auth_verify);
      resetRegisterForm();
      Toastr({ message: res.data.message, type: 'success' });
    } else {
      Toastr({ message: res.data.message });
    }
    setLoading(false);
  } catch (error) {
    console.log('register: ', error);
    setLoading(false);
    Toastr({ message: ('An error occurred!') });
  }
};

export const submitOtp = async (otp, navigateTo, email) => {
  const { submit_otp_type } = useAuthStore.getState();
  try {
    if (submit_otp_type === k_submit_otp_type.forget_password && !email) {
      Toastr({ message: 'Session Expired!' });
      navigateTo('/login');
      return;
    }
    setLoading(true);
    let body = {};
    if (submit_otp_type === k_submit_otp_type.forget_password) {
      body = { email: email, otp: otp, forget: true, is_web: 1 }
    } else {
      body = { otp: otp, is_web: 1 }
    }
    const res = await axios.post(submit_otp_type === k_submit_otp_type.auth_verify ? kuAuthVerify : kuFpOtpVerify, body);
    console.log("submitOtp: ", res.data);

    if (res?.data?.success) {
      if (submit_otp_type === k_submit_otp_type.auth_verify) {
        navigateTo('/login');
        Toastr({ message: 'OTP verified, please login to continue.', type: 'success' });
      } else {
        sessionStorage.setItem('forget_password_token', res?.data?.data?.token);
        navigateTo('/set-new-password');
        Toastr({ message: res.data.message, type: 'success' });
      }
    } else {
      Toastr({ message: res?.data?.message })
    }
    setLoading(false)
  } catch (err) {
    console.log('submitOtp: ', err);
    setLoading(false)
    Toastr({ message: ('An error occurred!') });
  }
}

export const resendOtp = async (email, navigateTo) => {
  try {
    if (!email) {
      Toastr({ message: 'Session Expired!' });
      navigateTo('/login');
      return false;
    }

    setLoading(true);
    const res = await axios.post(kuResendOtp, { email: email, is_web: 1 });
    console.log('resendOtp: response' + res.data);

    if (res.data.success) {
      setLoading(false);
      Toastr({ message: res.data.message, type: 'success' });
      return true
    } else {
      setLoading(false);
      console.log('resendOtp: failed' + res.data.message);
      Toastr({ message: res.data.message });
      return false;
    }
  } catch (err) {
    setLoading(false);
    console.log('resendOtp: error' + err);
    Toastr(({ message: 'An error occurred!' }));
    return false;
  }
};

export const forgetPassword = async (email, navigateTo) => {
  const { setSubmitOtpType } = useAuthStore.getState();
  try {
    setLoading(true);

    const res = await axios.post(
      kuForgetPassword,
      { email: email, forget: true, is_web: 1 }
    );

    console.log('forgetPassword:', res.data);

    if (res.data.success) {
      sessionStorage.setItem('user_email', email);
      navigateTo('/otp-verification');
      setSubmitOtpType(k_submit_otp_type.forget_password);
      Toastr({ message: res.data.message, type: 'success' });
    } else {
      Toastr({ message: res.data.message });
      console.log('forgetPassword:' + res.data.message);
    }
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log('forgetPassword: ', err);
    Toastr(({ message: 'An error occurred!' }));
  }
};

export const changePassword = async (navigateTo, token, email, password, confirm_password) => {
  const { resetForgetPasswordForm } = useAuthStore.getState();
  try {
    setLoading(true);

    const res = await axios.post(
      kuResetPassword,
      {
        token: token,
        email: email,
        password: password,
        password_confirmation: confirm_password,
      }
    );

    console.log('changePassword: ', res?.data);

    if (res.data.success) {
      navigateTo('/login');
      Toastr({ message: res.data.message, type: 'success' });
      resetForgetPasswordForm();
      setLoading(false);
    } else {
      Toastr({ message: res.data.message });
      console.log('changePassword: ' + res.data.message);
      setLoading(false);
    }
  } catch (err) {
    setLoading(false);
    console.log('changePassword: ' + err);
    Toastr({ message: 'An error occurred!' });
  }
};

export const logout = async () => {
  const { setLoading } = useGeneralStore.getState();
  const { setIsLoggedIn } = useAuthStore.getState();
  try {
    setLoading(true)
    const res = await axios.post(kuLogout);
    console.log("logout: ", res);

    if (res?.data?.success) {
      setIsLoggedIn(false);
      localStorage.clear();
      sessionStorage.clear();
      Toastr({ message: 'Logged Out!', type: 'success' });
      useGeneralStore.getState().setPathRecord({ current: null, old: null });
      setLoading(false)
      return true;
    } else {
      Toastr({ message: res?.data?.message });
      setLoading(false)
      return false
    }

  } catch (err) {
    console.log('logout: ', err);
    setLoading(false)
    Toastr({ message: ('An error occurred!') });
    setIsLoggedIn(false);
  }
}


export default useAuthStore;


//v       express login by admin
export const expressLogin = async (form_data) => {
  const { setLoading } = useGeneralStore.getState();
  try {
    setLoading(true)
    const res = await axios.post(kuCommonExpressLogin, form_data);
    console.log("expressLogin: ", res);
    // console.log("expressLogin TOKEN: ", res?.data?.data?.token);

    if (res?.data?.success) {
      localStorage.clear();
      sessionStorage.setItem('limadi_token', res?.data?.data?.token);
      let timerTimeRemaining = (30 * 60 * 1000);
      console.log('timerTimeRemaining: ', timerTimeRemaining);
      sessionStorage.setItem("timer_remaining", timerTimeRemaining);
      console.log("sessionStorage.getItem('timer_remaining') ::::", sessionStorage.getItem("timer_remaining"));
      // setLoading(false)
      return true;
    } else {
      if (res?.data?.message === "User access already active") {
        return true;
      }
      setLoading(false);
      Toastr({ message: res?.data?.message });
      return false;
    }

  } catch (err) {
    console.log('expressLogin: ', err);
    setLoading(false)
    Toastr({ message: ('An error occurred!') });
  }
}

