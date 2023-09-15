/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLayoutStore from "../../app/stores/others/layoutStore";
import NormalSideBarItem from "./NormalSideBarItem";
import ExpandableSideBarItem from "./SidebarItemArrays/ExpandableSideBarItem";
import { useTranslation } from "react-i18next";

const Sidebar = ({ isOpenSidebar, setIsSidebarOpen }) => {
  const location = useLocation();
  const { activeSection, setActiveSection, sidebarItemsList, setShowExpandedSidebarItem } = useLayoutStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.pathname) {
      switch (location.pathname) {
        case "/":
          setActiveSection("home");
          break;

        case "/request/create":
          setActiveSection("create");
          break;

        case "/driver-manager":
          setActiveSection("driver-manager");
          break;

        case "/car-manager":
          setActiveSection("car-manager");
          break;

        case "/favorite-companies":
          setActiveSection("favorite-companies");
          break;

        case "/favorite-address":
          setActiveSection("favorite-address");
          break;

        case "/contact-us":
          setActiveSection("contact-us");
          break;

        case "/notification":
          setActiveSection("notification");
          break;

        case "/banner":
          setActiveSection("banner");
          break;

        case "/play":
          setActiveSection("playground");
          break;

        default:
          setActiveSection("");
      }

      //r     for nested routes
      if (location.pathname.includes("global-request")) setActiveSection("global-request");
      if (location.pathname.includes("shift-manager")) setActiveSection("shift-manager");
      if (location.pathname.includes("settings")) setActiveSection("settings");
      if (location.pathname.includes("/request/edit/")) setActiveSection("create");

    }

  }, [location.pathname]);


  return (
    <div className="relative">



      {/* green: Main side bar list items */}
      <aside
        className={`
       ${isOpenSidebar ? "w-s230" : "w-[100px]"}
        absolute top-0 bottom-0 z-index-120 h-full overflow-x-visible md:shadow-md transform transition-all duration-150 ease-in bg-cBgSideBar`}
      >
        <div
          className={`flex flex-col h-max min-h-screen justify-between bg-cBgSideBar ${isOpenSidebar ? "px-[8px]" : "items-center px-0"
            } select-none outline-none`}
        >


          <div className="pt-[75px] h-full ">

            {/*l      automated sidebar items for better management */}
            {
              sidebarItemsList?.map((item, index) =>
                item?.expandedItems?.length ?
                  <ExpandableSideBarItem
                    onClick={()=>{item?.expandedOnClick()}}
                    key={index}
                    title={t(item?.title)}
                    isActiveLink={item?.isActiveLink}
                    normalIcon={item?.normalIcon}
                    selectedIcon={item?.selectedIcon}
                    expandedItems={item?.expandedItems}
                  />
                  :
                  <NormalSideBarItem
                    key={index}
                    onClick={() => {
                      item?.onClick();
                      setShowExpandedSidebarItem(false)
                    }}
                    title={t(item?.title)}
                    linkTo={item?.linkTo}
                    isActiveLink={item?.isActiveLink === activeSection ? true : false}
                    isOpenSidebar={isOpenSidebar}
                    normalIcon={item?.normalIcon}
                    selectedIcon={item?.selectedIcon}
                  />

              )}
          </div>

          {isOpenSidebar ?
            <div className="pt-s100 pb-s30 flex flex-col items-center h-full w-full justify-center text-cDisable text-xs font-semibold">
              <div>{t('Version')} 1.1</div>
              <div>{t('Copyright')} ©limadi.dk</div>
            </div> : ""}
        </div>
      </aside>

    </div>
  );
};

export default Sidebar;
