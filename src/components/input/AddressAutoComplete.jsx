import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useDebounce } from 'use-debounce';
import { kuSearchAddressLatLang, kuSearchAddressSuggestion } from '../../app/urls/commonUrl';
import { iFavAddressNormal2 } from '../../app/utility/imageImports';
import { formatSearchAddressV2 } from '../../app/utility/utilityFunctions';
import CommonInput from './CommonInput';
import FavAddressModal from './FavAddressModal';

//authors: @zamanShahed, @tamjedPeace
//version: 3.01 b
// address auto complete input field with suggestions from here map
// it will auto get the detailed address along with lat lang

//_________________________________________
//          usage:
//_________________________________________

//           <AddressAutoComplete
//               required={true}
//               label={("Address")}
//               placeholder={("Type Address..")}
//               name={"location"}
//               address={addAddressLabel}
//               latName={"lat"}
//               lngName={"lng"}
//               changeValue={handleChange}
//               doSearch={doSearch}
//               setDoSearch={setDoSearch}
//           />

const AddressAutoComplete = ({
    label,
    placeholder,
    name,
    address = null,
    latName,
    lngName,
    city,
    doSearch,
    setDoSearch = () => { },
    changeValue = () => { },
    classNameInp,
    required = false,
    rightClickableIcon = iFavAddressNormal2,
    icon = true,
    onFavAddressModalItemClick,
    show_asterisk = true
}) => {
    const [key] = useDebounce(address, 300); // 0.3 sec delay/debounce
    const [items, setItems] = useState([]); // address suggestion items
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [onChangeAddress, setOnChangeAddress] = useState(false);
    const [show_modal, setShowModal] = useState(false);

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
        changeValue(e.target.name, e.target.value);
        setOnChangeAddress(true);
    };

    // select address from suggestion list on mouse click
    const handleSelectItem = async (item) => {
        // setCompanyCity(item?.address?.city)
        changeValue(name, item.title);
        setShowSuggestion(false);
        setDoSearch(false);
        await searchLatLng(item.title);
    };

    const setLatLng = (position, address) => {
        console.log("position", position);
        if (position === null) {
            changeValue(latName, null);
            changeValue(lngName, null);
            changeValue(city, null);
        } else {
            changeValue(latName, position.lat);
            changeValue(lngName, position.lng);
            changeValue(city, address.city);
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
                // setCompanyCity(items[selectedIndex]?.address?.city)
                if (items?.length === 0) return;
                changeValue(name, items[selectedIndex]?.title);
                setShowSuggestion(false);
                setDoSearch(false);
                searchLatLng(items[selectedIndex].title);
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
        console.log("SEARCHING ADDRESS: ", queryText);

        if (!queryText || queryText === null || doSearch === false) return;
        setLatLng(null); // reset lat lng
        setIsSearching(true);
        return fetch(
            kuSearchAddressSuggestion +
            queryText +
            "&maxresults=5&in=countryCode:BGD,DNK"
        )
            .then((response) => response.json())
            .then((json) => {
                console.log('addresses', json.items);
                // setItems(formatSearchAddress(json.items));
                setItems(formatSearchAddressV2(json.items));
                setIsSearching(false);
            });
    }

    function searchLatLng(locationID) {
        console.log(locationID);
        return fetch(
            kuSearchAddressLatLang +
            locationID

        )
            .then((response) => response.json())
            .then((json) => {
                console.log('geo-code: ', json);
                try {
                    const position =
                        json.items[0].position;
                    setLatLng(position, json?.items[0]?.address);
                } catch (error) {
                    setLatLng(null);
                }
            });
    }

    return (
        <div className="relative">
            <div className="flex w-full">

                {icon && <div
                    className={`absolute p-0 top-9 z-[1000] cursor-pointer ${address ? "right-0" : "right-0"} `}
                    onClick={() => {
                        setShowModal(true);
                        console.log("setShowFavAddress");
                    }}
                >

                    <img src={rightClickableIcon} alt="" className='w-5 ' />
                </div>}

                <CommonInput
                    required={required}
                    className={` w-full text-sm rounded-br5 overflow-ellipsis ${classNameInp}`}
                    type={"text"}
                    onChange={handleOnChangeAddress}
                    value={address}
                    name={name}
                    labelText={label}
                    placeholder={placeholder}
                    show_asterisk={show_asterisk}
                />


                {showSuggestion && (
                    <div className="w-full text-sm absolute top-[60px] z-20 rounded-none shadow-sm mt-[2px] ">
                        {!isSearching ? (
                            items?.map((item, index) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleSelectItem(item)}
                                    onMouseOver={() => setSelectedIndex(index)}
                                    className={` ${index === selectedIndex
                                        ? "bg-[#ebcfa8]"
                                        : "bg-[#f5f4f4]"
                                        } pl-4 pr-2 rounded-none shadow-md cursor-pointer py-1 w-full`}
                                >
                                    {item.title}
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center bg-[#f5f4f4] h-16 w-full shadow-md">
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

            <FavAddressModal showModal={show_modal} setShowModal={setShowModal} onClick={onFavAddressModalItemClick} />
        </div>
    );
}


export default AddressAutoComplete