import { Tooltip } from 'antd'
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useSettingsStore from "../../app/stores/others/settingsStore";
import useUtilityStore from "../../app/stores/others/utilityStore";
// import { base_url_src } from "../../app/utility/const";
import { iLogout } from "../../app/utility/imageImports";
import Image from "../image/Image";

export default function AccountSettingsDropDown() {

  const { t } = useTranslation();
  // const { setShowLogoutModal } = useLayoutStore();
  let user = JSON.parse(localStorage.getItem('user'));

  const { setProfileDropDownOpen } = useSettingsStore();
  const { setShowLogoutModal } = useUtilityStore();

  const navigateTo = useNavigate()

  return (
    <>
      {/* <EditAccount /> */}
      <div className="w-full h-full bg-cBrandColor2 text-fs16 font-fw500 rounded-br8">
        <div
          onClick={() => {
            setProfileDropDownOpen(false)
            navigateTo("/settings")
          }}
          className="flex items-center p-s8 cursor-pointer hover:bg-[#EDF1F8]">
          <Image src={user?.image} alt="" className="object-cover rounded-full w-s50 h-s50" />

          <div className="flex flex-col justify-center pl-s10">

            {user?.name ? <Tooltip title={''} color={'#F89818'} ><div className="font-semibold capitalize text-fs14 text-cMainBlack mb-s4 truncate w-[140px]">{user?.name}</div></Tooltip> : ''}
            {user?.email ? <Tooltip title={''} color={'#F89818'} ><div className="font-semibold text-fs10 text-cMainBlack truncate w-[140px]">{user?.email}</div></Tooltip> : ''}
          </div>
        </div>

        <div className="px-s8 w-full">
          <div className="h-[1px] bg-cTextButtonHover"></div>
        </div>

        <div
          onClick={() => setShowLogoutModal(true)}
          className="flex p-s12 hover:bg-[#EDF1F8] cursor-pointer">
          <img className="cursor-pointer" src={iLogout} alt="" />
          <div className="pl-s4 text-fs14 font-fw500 text-cRed ">{t("Logout")}</div>
        </div>

        {/* <div className="flex pl-5 hover:bg-cBackgroundAndCategory">
          <img className="cursor-pointer" src={iSettings} alt="" />
          <div onClick={() => { }} className="pl-5 cursor-pointer py-s16">Account Settings</div>
        </div> */}
      </div>
    </>

  );
}
