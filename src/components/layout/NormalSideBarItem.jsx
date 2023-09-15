import { Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export default function NormalSideBarItem({
  title,
  linkTo = null,
  isActiveLink,
  isOpenSidebar,
  normalIcon,
  selectedIcon,
  onClick,      // =()=> console.log("isActiveLink ? ", isActiveLink),
}) {
  return (
    <Tooltip
      title={isOpenSidebar ? "" : title}
      placement="right"
      color={'#F89818'}
      componentsProps={{
        tooltip: {
          sx: {
            textTransform: "capitalize"
          }
        }
      }}
    >
      <Link
        onClick={onClick}
        // onClick={(e) => {
        //   onClick(e);
        //   setShowExpandedSidebarItem(false);
        // }} 
        className={`mt-s5`} to={linkTo}>
        <div
          className={`flex items-center h-s50 transition-all duration-300 hover:bg-cBgSelectedSideBar my-1.5
           ${isActiveLink === true
              ? "bg-cBgSelectedSideBar text-cBrand"
              : "bg-cBgSideBar text-cDisable"
            }  
     ${isOpenSidebar ? "px-s5 rounded-br5" : "justify-center w-20"}
    `}
        >
          <div
            className={`flex justify-center items-center rounded-full transition-all duration-300 w-s30 h-s30 
             ${isActiveLink === true ? "" : "bg-cBgSideBar "} ${isOpenSidebar ? "my-s7 ml-s7" : ""
              }`}
          >
            <img
              className="w-s20 h-s20 object-contain"
              src={isActiveLink === true ? selectedIcon : normalIcon}
              alt="sidebar-icon"
            />
          </div>
          {isOpenSidebar ? (
            <div className="pl-5 text-left capitalize font-fw600 text-fs14">
              {title}
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
    </Tooltip>
  );
}
