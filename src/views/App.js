/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import useAuthStore, { checkAuthUser } from '../app/stores/others/authStore';
import useGeneralStore from '../app/stores/others/generalStore';
import AxiosHeader from '../app/utility/AxiosHeader';
import { initializeFirebase, setAppSidebarList, setAxiosHeaders } from '../app/utility/utilityFunctions';
import LoadingModal from '../components/modal/LoadingModal';
import RouteIndex from '../routes/RouteIndex';
import firebase from "../app/firebase/firebase";
import { Offline, Online } from "react-detect-offline";
import { useLocation } from 'react-router-dom';

if (localStorage.limadi_token) {
  AxiosHeader(localStorage.limadi_token);
} else if (sessionStorage.limadi_token) {
  AxiosHeader(sessionStorage.limadi_token);
} else {
  AxiosHeader();
}

export default function App() {
  const { is_logged_in, setIsLoggedIn } = useAuthStore();
  const { user_role, setPathRecord } = useGeneralStore();
  const location = useLocation();

  useEffect(() => {
    setAppSidebarList(user_role);
    setAxiosHeaders(user_role)
  }, [user_role]);

  useEffect(() => { initializeFirebase(is_logged_in, firebase); }, [is_logged_in]);
  useEffect(() => { setPathRecord(location.pathname); }, [location.pathname]);

  useEffect(() => {
    if (localStorage.limadi_token || sessionStorage.limadi_token) checkAuthUser();
    else setIsLoggedIn(false);
  }, []);


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="dark"
        limit={2}
      />

      <LoadingModal />

      <RouteIndex />

      <Online onChange={(state) => useGeneralStore.getState().setIsOnline(state)}> <X /> </Online>
      <Offline onChange={(state) => useGeneralStore.getState().setIsOnline(state)}> <Y /> </Offline>

    </>
  )
}

const X = () => {
  useEffect(() => useGeneralStore.getState().setIsOnline(true), [])
  return <></>
}

const Y = () => {
  useEffect(() => useGeneralStore.getState().setIsOnline(false), [])
  return <></>
}