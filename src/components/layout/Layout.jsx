/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useLayoutStore from "../../app/stores/others/layoutStore";
import { iRightArrow } from "../../app/utility/imageImports";
import CommonModalArea from "./CommonModalArea";
import MobileTopBar from "./MobileTopBar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const Layout = (props) => {

  const { isSidebarOpen, setIsSidebarOpen, layoutWidth, setLayoutWidth } = useLayoutStore();

  // const [width, setWidth] = useState(0);


  useEffect(() => {
    // console.log("resize INITIAL", layoutWidth);

    window.addEventListener("resize", () => { if (window.innerWidth !== layoutWidth) { setLayoutWidth(window.innerWidth) } });

    // console.log("resize NEWER", window.innerWidth);

    if (layoutWidth <= 1024) setIsSidebarOpen(false);
    else setIsSidebarOpen(true);

    return () => {
      window.removeEventListener("resize", () => setLayoutWidth(window.innerWidth));
    };
  }, [window.innerWidth]);


  return (
    <>
      <CommonModalArea />
      <div className="flex flex-row min-h-screen bg-cMainWhite text-gray-800 z-10">

        {/*e     new sidebar collapse button */}
        <div
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`
            absolute top-[60px] w-[30px] h-[20px] z-[121] rounded-md flex justify-center items-center cursor-pointer hover:bg-cBgSelectedSideBar
            transition-all duration-150 ease-in-out
            ${isSidebarOpen ? "left-[185px]":"left-[65px]"}
          `}>
          <img
            src={iRightArrow}
            alt="BrandLogo"
            className={`${isSidebarOpen ? "rotate-0" : "rotate-180"} transition-all duration-700 h-3`}
          />
        </div>

        <Sidebar
          isOpenSidebar={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="main flex items-start justify-start flex-col flex-grow transition-all duration-150 ease-in w-full relative">
          {/* <MobileTopBar /> */}
          <Topbar
            isOpenSidebar={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div
            className={`w-full pt-[84px] lg:pb-12 pb-5
            ${isSidebarOpen ? "pl-[270px] pr-[40px]" : "lg:pr-[40px] pr-[20px] pl-[135px]"}
            `}
          >
            <div>
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
