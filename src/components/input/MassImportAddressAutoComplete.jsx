import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDebounce } from "use-debounce";
import useCreateRequestStore from "../../app/stores/others/createRequestStore";
import { formatSearchAddressV2 } from "../../app/stores/others/generalStore";

// Author:: coded by tamzidpeace(arafat) on 15/09/2022 for favorite address & profile sections
function MassImportAddressAutoComplete({
  name,
  address = '',
  latName,
  lngName,
  index,
  doSearch,
  setDoSearch,
  changeValue,
  width,
  is_valid,
  isDisabled = false,
}) {

  const [key] = useDebounce(address, 300); // 0.3 sec delay/debounce
  const [items, setItems] = useState([]); // address suggestion items
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [onChangeAddress, setOnChangeAddress] = useState(false);
  const here_api_key = process.env.REACT_APP_HERE_API_KEY;



  // set search address result to generate suggestion list
  useEffect(() => {
    if (items?.length > 0) {
      setShowSuggestion(true);
      setSelectedIndex(null);
    } else {
      setShowSuggestion(false);
      setSelectedIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // show suggestions if user is typing and get any result [1 sec debounce]. for debounce, after selecting any suggestion,
  // it will not show suggestions again.
  useEffect(() => {
    if (doSearch) {
      searchAddress(key);
    } else {
      setDoSearch(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, onChangeAddress]);

  // check user is type or not
  const handleOnChangeAddress = (e) => {
    changeValue(index, e.target.name, e.target.value, e);
    changeValue(index, latName, null);
    changeValue(index, lngName, null);
    setOnChangeAddress(true);
    useCreateRequestStore.getState().setIsEveryThingValid(false);
  };

  // select address from suggestion list on mouse click
  const handleSelectItem = async (item) => {
    changeValue(index, name, item?.title);
    setShowSuggestion(false);
    setDoSearch(false);
    await searchLatLng(item?.title);
  };

  const setLatLng = (position) => {
    console.log("position", position);
    if (position === null) {
      changeValue(index, latName, null);
      changeValue(index, lngName, null);
    } else {
      changeValue(index, latName, position.lat);
      changeValue(index, lngName, position.lng);
    }
  };

  // keyboard up/down/enter key event handle
  document.onkeydown = function (e) {
    switch (e.key) {
      case "ArrowUp":
        if (selectedIndex === 0) return;
        setSelectedIndex(selectedIndex - 1);
        // stop scrolling while arrow key is pressed
        document.body.classList.add("no-scroll");
        break;
      case "ArrowDown":
        if (selectedIndex === items.length - 1) return;
        setSelectedIndex(selectedIndex === null ? 0 : selectedIndex + 1);
        // stop scrolling while arrow key is pressed
        document.body.classList.add("no-scroll");
        break;
      case "Enter":
        if (items?.length === 0) return;
        changeValue(index, name, items[selectedIndex]?.title);
        setShowSuggestion(false);
        setDoSearch(false);
        searchLatLng(items[selectedIndex]?.title);
        break;
      case "Escape":
        setShowSuggestion(false);
        setDoSearch(false);
        break;
      default:
        return 0;
    }
  };

  // handle mouse click outside suggestion list
  document.onclick = function (e) {
    setShowSuggestion(false);
    setDoSearch(false);
  };

  // api functions
  function searchAddress(queryText) {
    if (!queryText || queryText === null || doSearch === false || !useCreateRequestStore.getState().is_click_on_validate) return;
    setLatLng(null); // reset lat lng
    setIsSearching(true);
    return fetch(
      `https://autocomplete.search.hereapi.com/v1/autocomplete?apiKey=${here_api_key}&q=` +
      queryText +
      "&maxresults=5&in=countryCode:BGD,DNK"
    )
      .then((response) => response.json())
      .then((json) => {
        // console.log('addresses', json.items);
        setItems(formatSearchAddressV2(json.items, false));
        // setItems(formatSearchAddress(json.items));
        setIsSearching(false);
      });
  }

  function searchLatLng(locationID) {
    // console.log(locationID);
    return fetch(
      `https://geocode.search.hereapi.com/v1/geocode?apiKey=${here_api_key}&q=` +
      locationID + "&in=countryCode:BGD,DNK"

    )
      .then((response) => response.json())
      .then((json) => {
        console.log('geo-code: ', json);
        try {
          const position =
            json.items[0].position;
          setLatLng(position);
        } catch (error) {
          setLatLng(null);
        }
      });
  }

  useEffect(() => {
    document.getElementById('scr').scrollTop += 50;
  }, [showSuggestion])


  return (
    <div className={`relative ${width}`}>
      <div className="relative flex justify-center items-center">
        <textarea
          className={`w-full px-1 py-2 text-sm rounded-br5 outline-cPrimary ${!is_valid ? "border-cRed border-[1px]" : ''}`}
          type={"search"}
          onChange={handleOnChangeAddress}
          value={address ?? ''}
          name={name}
          disabled={isDisabled}
          rows={1}
        />
      </div>

      {(showSuggestion && useCreateRequestStore.getState().is_click_on_validate) && (
        <div className="w-full text-sm absolute z-[100000000] rounded-none shadow-sm mt-[2px] ">
          {!isSearching ? (
            items?.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                onMouseOver={() => setSelectedIndex(index)}
                className={` ${index === selectedIndex
                  ? "bg-[#ebcfa8]"
                  : "bg-[#fff]"
                  } pl-4 pr-2 rounded-none shadow-md cursor-pointer py-1`}
              >
                {item?.title}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center bg-cMoreLiteGrey h-16 w-full shadow-md">
              <Oval
                ariaLabel="loading-indicator"
                height={30}
                width={30}
                strokeWidth={3}
                strokeWidthSecondary={3}
                color="#f89818"
                secondaryColor="bg-gray-600"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MassImportAddressAutoComplete;
