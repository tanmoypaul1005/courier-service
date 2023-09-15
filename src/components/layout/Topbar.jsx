/* eslint-disable react-hooks/exhaustive-deps */
import { iNotificationIcon, iNotificationShow, iLogo1 } from "../../app/utility/imageImports";
import AccountSettingsDropDown from "../dropdown/AccountSettingsDropDown";
import FreeDropDown from "../dropdown/FreeDropDown";
import { Link, useLocation } from "react-router-dom";
import NotificationDropdown from "./notificationDropdown/NotificationDropdown";
import Image from "../image/Image";
import useGeneralStore from "../../app/stores/others/generalStore";
import useNotificationStore from "../../app/stores/others/notificationStore";
import useSettingsStore from "../../app/stores/others/settingsStore";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Countdown from "react-countdown";
import useAuthStore from "../../app/stores/others/authStore";
import ExpressLogoutModal from "../../views/common/auth/components/ExpressLogoutModal";

const Topbar = ({ isOpenSidebar, setIsSidebarOpen }) => {

  let user = JSON.parse(localStorage.getItem('user'));

  const { numOfUnreadNotification } = useGeneralStore();
  const { setShowExpressLogoutModal } = useAuthStore();

  const location = useLocation()

  const { setNotificationDropDownOpen, notificationDropDownOpen, showNotificationDetailsModal } = useNotificationStore();

  const { profileDropDownOpen, setProfileDropDownOpen } = useSettingsStore();

  const dropdownRef = useRef(null);


  // Renderer callback with condition
  const renderer = ({ total, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      console.log("Timer completed ");
      return setShowExpressLogoutModal(true);
    } else {
      // Render a countdown
      //console.log("Timer remaining: ", total);
      sessionStorage.setItem("timer_remaining", total);
      return <div className="flex space-x-2 border-2 rounded-lg text-white px-2 py-1">
        <div>Accessing as Admin, Session Remaining: </div>
        <div className="text-xl font-medium" >{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>;
    }
  };

  useEffect(() => {
    // if (timeRemaining === 0) setTimeRemaining(parseInt(sessionStorage.getItem("timer_remaining")));
  }, [])

  useEffect(() => {
    if (!showNotificationDetailsModal) {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setNotificationDropDownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [!showNotificationDetailsModal && dropdownRef]);

  return (
    <>
      <ExpressLogoutModal />

      {/* ${user?.is_admin_access === 1 ? 'bg-rose-500' : 'bg-cBrand'} */}
      <div className={`absolute top-0 z-[1001] items-center w-full h-s56 flex flex-row justify-between bg-cBrand`} >

        <Link className="flex items-center ml-5 h-s35" to={'/'}>
          <img src={iLogo1} alt="" className="w-auto h-full" />
        </Link>

        <div>
          <Countdown
            date={Date.now() + (parseInt(sessionStorage.getItem("timer_remaining")))}
            // date={Date.now() + 15000}
            renderer={renderer}
          />
        </div>

        <div className="flex flex-row items-center justify-end mr-5 space-x-2">

          <div ref={dropdownRef}>
            {location.pathname !== '/notification' && <div>
              {
                !numOfUnreadNotification > 0 ?
                  <img
                    onClick={() => { setNotificationDropDownOpen(!notificationDropDownOpen) }}
                    src={iNotificationIcon}
                    alt=""
                    className="rounded-full cursor-pointer max-h-[30px] min-h-[30px] max-w-[26px] min-w-[26px] relative"
                    srcSet=""
                  /> : <img
                    onClick={() => { setNotificationDropDownOpen(!notificationDropDownOpen) }}
                    src={iNotificationShow}
                    alt=""
                    className="rounded-full cursor-pointer max-h-[35px] min-h-[35px] max-w-[26px] min-w-[26px] relative"
                    srcSet=""
                  />
              }
            </div>
            }

            {notificationDropDownOpen ?
              <div
                className="w-[450px] inline-block absolute right-[78px] mt-2 origin-top-right ">
                <NotificationDropdown />
              </div> : ''
            }
          </div>

          {!user.is_admin_access ? <FreeDropDown
            shadowCustom="shadow-lg"
            button={
              <>
                <div onClick={() => { setProfileDropDownOpen(true) }}><Image
                  withPreview={true}
                  src={user?.image}
                  alt=""
                  className="rounded-full cursor-pointer h-[26px] w-[26px] object-cover outline-none"
                  srcSet=""
                />
                </div>
              </>
            }
            body={
              <>
                {profileDropDownOpen && <AccountSettingsDropDown />}
              </>
            }
          /> : ""}
        </div>

      </div>
    </>
  );
};

export default Topbar;


