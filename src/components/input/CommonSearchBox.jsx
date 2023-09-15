import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import useUtilityStore from "../../app/stores/others/utilityStore";
import { iSearchCross } from "../../app/utility/imageImports";
import { useTranslation } from "react-i18next";

export default function CommonSearchBox({
  value,
  onChange,
  search_loading = false,
  fullWidth = false,
  onSearchClear = () => { },
  withClearSearch = false,
  height = 'h-[40px]',
  placeholder = "Search",
}) {

  const { isLoadingSearch } = useUtilityStore();
  const { t } = useTranslation();


  const searchRef = useRef();
  const handleClick = () => {
    searchRef.current.value = "";
    onSearchClear();
  }

  return (
    // w-full flex items-center
    <div className={`relative ${fullWidth ? "w-full" : "w-[300px]"}`}>
      {search_loading || isLoadingSearch ? (
        <div className="absolute right-4 pl-3 ">
          <ImSpinner2 className="animate-spin duration-150 text-gray-500 border-gray-400 w-5 h-[40px]" />
        </div>
      ) : (
        <div className="absolute right-4 pl-3 mt-s10">
          <BsSearch className="text-gray-500 border-gray-400 w-5 h-[55%]" />
        </div>
      )}

      <input
        ref={searchRef}
        value={value}
        onChange={onChange}
        // type="search"
        className={`ring-1 outline-none ring-[#D1D5DB] rounded-br5 ${height} px-p15 text-sm ${fullWidth ? "w-full" : "w-[300px]"} pr-[55px]`}
        placeholder={t(placeholder)}
      />
      {(value && withClearSearch ) ?
        <img
          src={iSearchCross}
          onClick={() => { handleClick() }}
          alt="clear-search"
          className="absolute right-[45px] top-[13px] w-s10 h-s10 cursor-pointer "
        /> : ""}

    </div>
  );
}
