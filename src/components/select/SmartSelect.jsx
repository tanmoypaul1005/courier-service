import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoIosArrowForward, IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import CommonButton from '../button/CommonButton';
import CommonInput from '../input/CommonInput';
import CommonModal from '../modal/CommonModal';
import { useTranslation } from 'react-i18next';

// Limadi smart single / multi selection popup (V:0.04 Alpha)
// @author: zamanshahed (github.com/zamanshahed/)

// Dependencies:
// react-icons : ^4.3.1 ~ for radio button and other buttons or replace with similar components
// @mui/material ~ for tooltip component or replace it with similar component
// commonModal (component created from headless ui ) or replace with any similar component
// /CommonButton or replace it with any other button component

// Usage:

// single selection mode:________________________________________________________________________

//              <SmartSelect
//                  placeholder="Select a Car"
//                  label="A Car"
//                  singleValueItem={selectionValue}
//                  onChange={(value) => {
//                      setSelectionValue(value);
//                  }}
//                  dataArray={dataArray}
//              />



// multi selection mode:_________________________________________________________________________

//              <SmartSelect
//                  placeholder="Select some cars"
//                  label="Some Cars"
//                  multiValueItems={selectionValueMulti}
//                  multiSelectionMode={true}
//                  onChangeString={(string) => setSelectionValueMultiString(string)}
//                  onChange={(value) => {
//                      setSelectionValueMulti(value);
//                  }}
//                  dataArray={dataArray}
//              />


const SmartSelect = ({
    placeholder = "placeholder:select an item from list",
    label = "",
    withSelectAll = false,
    required = false,
    dataArray = [
        { label: 'One', id: 1 },
        { label: 'Two', id: 2 },
        { label: 'Three', id: 3 },
        { label: 'Four', id: 4 },
    ],
    onChange = (e) => { console.log("FINAL SELECTED: ", e); },
    onChangeString = (e) => { console.log("FINAL SELECTED: ", e); },
    singleValueItem = { label: '', id: 0 },
    multiValueItems = [{ label: 'Three', id: 3 }, { label: 'Four', id: 4 }],
    multiSelectionMode = false,
}) => {

    const [showSelectionPane, setShowSelectionPanel] = useState(false);

    const [selectedItemSingle, setSelectedItemSingle] = useState(null);

    const [selectedItemMultiItem, setSelectedItemMultiItems] = useState(multiValueItems);
    const [selectedItemMultiString, setSelectedItemMultiString] = useState("");

    //e          single selection area          
    useEffect(() => {
        if (!multiSelectionMode) setSelectedItemSingle(singleValueItem);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleValueItem]);
    


    //l          multi-selection area          
    // const [selectedItem, setSelectedItem] = useState(multiValueItems);
    const [selectedItemIDs, setSelectedItemIDs] = useState([]);
    useEffect(() => {
        if (multiSelectionMode) {
            setSelectedItemMultiItems(multiValueItems);
            GenerateFinalResultString(multiValueItems);
            let t_ids = multiValueItems?.map((item) => item?.id);
            setSelectedItemIDs(t_ids);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multiValueItems]);

    useEffect(() => {

        if (multiSelectionMode) {
            let t_ids = selectedItemMultiItem?.map((item) => item?.id);
            setSelectedItemIDs(t_ids);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItemMultiItem]);

    const GenerateFinalResultString = (FinalArray) => {
        let t_string = "";
        FinalArray?.map((item, index) =>
            t_string = item?.id ? t_string + " " + item?.label + (((index + 1) === FinalArray?.length) ? "." : ", ") : ""
        );
        setSelectedItemMultiString(t_string);
        onChangeString(t_string);
    };

    const HandleSelectAll = () => {
        console.log("SELECT ALL >>>>", "selectedItemMultiItem: ", selectedItemMultiItem, "dataArray: ", dataArray);

        if (selectedItemMultiItem !== dataArray) {
            setSelectedItemMultiItems(dataArray);
            let t_ids = selectedItemMultiItem?.map((item) => item?.id);
            setSelectedItemIDs(t_ids);
        }

        if (selectedItemMultiItem?.length === dataArray?.length) {
            console.log("CLEARING......");
            setSelectedItemMultiItems([]);
            setSelectedItemIDs([]);
        }
    }

    useEffect(() => {
        if (showSelectionPane && multiSelectionMode) {
            console.log("COMPONENT LOADED.....");
            let t_ids = multiValueItems?.map((item) => item?.id);
            setSelectedItemIDs(t_ids);
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSelectionPane])

    const { t } = useTranslation();

    return (
        <>

            {/* g           popup area */}
            <CommonModal
                widthClass='w-[35vw]'
                showModal={showSelectionPane}
                setShowModal={setShowSelectionPanel}
                modalTitle={placeholder}
                mainContent={
                    <>
                        {
                            multiSelectionMode ?
                                <>
                                    {/* b        single selection ui        */}
                                    <div onClick={() => { console.log("selectedItemMultiItem:::", selectedItemMultiItem); }} className='pt-2.5'>
                                        {withSelectAll ?
                                            <div onClick={() => HandleSelectAll()} className='pb-2.5 flex flex-row-reverse font-semibold cursor-pointer select-none text-cBrand'>
                                                <div className="flex items-center space-x-2.5">
                                                    <div>
                                                        Select All
                                                    </div>
                                                    <input
                                                        className="w-4 h-4 mr-5"
                                                        type={"checkbox"}
                                                        value={"654321987"}
                                                        checked={selectedItemMultiItem?.length === dataArray?.length ? true : false}
                                                        onChange={() => { }}
                                                    />
                                                </div>
                                            </div> : ""}

                                        <div className='max-h-[300px] overflow-y-auto flex flex-col'>
                                            {
                                                dataArray?.length ?
                                                    dataArray?.map((item, index) =>
                                                        <div
                                                            key={item?.id}
                                                            onClick={() => {

                                                                if (selectedItemIDs?.includes(item?.id)) {
                                                                    let t_array = selectedItemMultiItem?.filter(arrayItem => arrayItem?.id !== item?.id);
                                                                    setSelectedItemMultiItems(t_array);
                                                                    // console.log("if id exists: ", t_array);
                                                                } else {
                                                                    let t_array = [];
                                                                    if (selectedItemMultiItem) t_array = [...selectedItemMultiItem, item];
                                                                    else t_array = [item];
                                                                    setSelectedItemMultiItems(t_array);
                                                                    // console.log("adding new id", t_array);
                                                                }
                                                            }}
                                                            className={`${selectedItemIDs?.includes(item?.id) && "border-emerald-600"} hover:bg-cTintColor border-b-[1px] border-cTextButtonHover flex justify-between items-center py-2 cursor-pointer text-gray-600 font-bold`}
                                                        >
                                                            {item?.label}

                                                            {/* e:         checkbox */}
                                                            <input
                                                                className="w-4 h-4"
                                                                type={"checkbox"}
                                                                value={"654321987"}
                                                                checked={selectedItemIDs?.includes(item?.id) ? true : false}
                                                                onChange={() => { }}
                                                            />

                                                        </div>
                                                    ) : t("No data available")
                                            }
                                        </div>
                                        <div className="flex flex-row-reverse pt-5">
                                            <CommonButton btnLabel='submit' onClick={() => { onChange(selectedItemMultiItem); setShowSelectionPanel(false); GenerateFinalResultString(selectedItemMultiItem); }} />
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    {/* g        single selection ui        */}
                                    <div onClick={() => { console.log("dataArray", dataArray); }} className='pt-5'>
                                        <div className='max-h-[300px] overflow-y-auto flex flex-col space-y-2.5'>
                                            {
                                                dataArray?.length ?
                                                    dataArray?.map((item, index) =>
                                                        // <div>{item?.label}</div>
                                                        <div
                                                            key={item?.id}
                                                            onClick={() => {
                                                                setSelectedItemSingle(item);
                                                                // onSelect(item);
                                                            }}
                                                            className={`${item?.id === selectedItemSingle?.id && "border-emerald-600"} border border-transparent flex justify-between items-center py-3 px-4 cursor-pointer rounded-lg bg-cListItem text-gray-600 font-bold`}
                                                        >
                                                            {item?.label}
                                                            {item?.id === selectedItemSingle?.id ? (
                                                                <IoMdRadioButtonOn className="text-xl text-emerald-600" />
                                                            ) : (
                                                                <IoMdRadioButtonOff className="text-xl" />
                                                            )}
                                                        </div>
                                                    ) : t("No data available")
                                            }
                                        </div>

                                        <div className="flex justify-center pt-5">
                                            <CommonButton btnLabel='submit' onClick={() => { onChange(selectedItemSingle); setShowSelectionPanel(false) }} />
                                        </div>
                                    </div>
                                </>
                        }
                    </>
                }
            />

            {/*p             main input field area */}
            {/* <div className="w-full text-sm font-bold text-left">
                {label}
            </div> */}
            <Tooltip color={'#F89818'} title={multiSelectionMode ? selectedItemMultiString : ""} className='w-full' >
                <div onClick={() => setShowSelectionPanel(true)}
                    className='relative flex items-center w-full '>

                    <CommonInput
                        required={required}
                        name="transport_type"
                        value={multiSelectionMode ? selectedItemMultiString : selectedItemSingle?.label === "" ? singleValueItem?.label : selectedItemSingle?.label ? selectedItemSingle?.label : ""}
                        className="w-full caret-transparent"
                        type="text"
                        placeholder={placeholder}
                        // disabled={true}
                        labelText={required ? label + "*" : label}
                        onChange={() => { }}
                    />

                    <IoIosArrowForward className={`text-xl absolute right-0 top-[35px] cursor-pointer rotate-0`} />
                </div>
            </Tooltip>
        </>
    )
}

export default SmartSelect