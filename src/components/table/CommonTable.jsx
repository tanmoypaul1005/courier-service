import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoPaginate from "./AutoPaginate";
import { iFilterBlue, iFilterWhite } from "../../app/utility/imageImports";
import CommonButtonOutlined from "../button/CommonButtonOutlined";
import CommonSearchBox from "../input/CommonSearchBox";
import { defineTableSortIcon } from "../../app/utility/utilityFunctions";
import CommonReloader from "../reloader/CommonReloader";

export default function CommonTable(
    {
        currentTakeAmount,
        outerPadding = "p-s20",
        titleComponent,
        tableTitle = "",
        tableTitleClassName,
        withReloader = false,
        onReload,
        headers = [
            { isActive: false, index: 0, name: "#", onClickAction: () => { console.log('click event: #'); } },
            { isActive: false, index: 1, name: "Name", onClickAction: () => { console.log('click event: Name'); } },
            { isActive: false, index: 2, name: "Order ID", onClickAction: () => { console.log('click event: Order ID'); } },
            { isActive: true, index: 3, name: "User Type", onClickAction: () => { console.log('click event: User Type'); } },
            { isActive: false, index: 4, name: "Date & Time", onClickAction: () => { console.log('click event: Date & Time'); } },
            { isActive: false, index: 5, name: "Amount", onClickAction: () => { console.log('click event: Amount'); } },
            { isActive: false, index: 6, name: "Status", onClickAction: () => { console.log('click event: Status'); } },
        ],
        items,

        // to show and manage take/entries in the table data [default: hidden ]
        showTakeOption = false,
        takeOptionOnChange = () => { },

        autoManageRow = false,
        TableRowComponent,

        // to show and manage search in the table data [default: hidden ]
        showSearchBox = false,
        searchValue,
        searchOnChange,
        onSearchClear,
        withClearSearch = true,
        search_loading = false,

        // for see all text button [ deprecated for now ]
        seeAllText,
        seeAllLink = "",
        seeAllOnClick,

        // for chip management [deprecated for now, need to re-enable]
        showChip = false,
        chipWidth = "min-w-[180px]",
        chipAreaWidth = "max-w-[95vw]",
        chipArray = [
            {
                title: "Option 01",
                selected: false,
                action: () => {
                    console.log("Option 01");
                },
            },
            {
                title: "Option 02",
                selected: true,
                action: () => {
                    console.log("Option 02");
                },
            },
            {
                title: "Option 03",
                selected: false,
                action: () => {
                    console.log("Option 03");
                },
            }
        ],

        // to show and manage pagination(bottom-right) and counter text (bottom-left) in the table data [default: hidden ]
        showPagination = false,
        showPageCountText = false,
        paginationOnClick,
        paginationObject,

        // to show and manage filter(top-right) data [default: hidden ]
        showTopRightFilter = false,
        topRightMainComponent,
        topRightFilterComponentText = 'filter',
        topRightFilterComponentOnClick = () => { },
        filtered = false,
        topRightFilterComponent = <div className="relative">
            {filtered && <div className="absolute z-50 w-2 h-2 rounded-full bg-cMainBlue right-1 top-1"></div>}
            <CommonButtonOutlined btnLabel={topRightFilterComponentText} onClick={topRightFilterComponentOnClick} colorType="primary" iconLeft={iFilterWhite} iconLeftHover={iFilterBlue} />
        </div>,
    }
) {
    const { t } = useTranslation();

    const [indexArray, setIndexArray] = useState([]);

    useEffect(() => {
        let t_array = [];
        for (let i = paginationObject?.from; i <= paginationObject?.to; i++) {
            t_array.push(i);
            setIndexArray(t_array);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationObject?.from, paginationObject?.to]);

    return (
        <>
            <div className={`w-full bg-white ${outerPadding} text-cMainBlack rounded-br5`} >

                {/*rTOP ROW  */}
                <div className="">
                    <div className={`mb-s16 flex flex-row justify-between `}>
                        <div className={`${tableTitleClassName ?? 'sub-title'} truncate`} 
                        >{tableTitle}</div>
                        <div>{topRightMainComponent}</div>
                        {/*
                        {withReloader ?
                            <div className='p-2 ml-4 rounded-full shadow-sm bg-cBgSideBar'>
                                <CommonReloader onClick={onReload} />
                            </div>
                            : ""}
                        */}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-[20px] mb-4">

                        {/* <div className="flex items-center"> */}
                        {/* p: search box */}
                        {showSearchBox === true ? (
                            <div className="">
                                <CommonSearchBox value={searchValue} onChange={searchOnChange} search_loading={search_loading} onSearchClear={onSearchClear} withClearSearch={withClearSearch} />
                            </div>
                        ) : (
                            <div></div>
                        )}


                        {/* b: filter button or custom component */}
                        {(showTopRightFilter && topRightFilterComponent) &&(
                            <div className="">{topRightFilterComponent}</div>
                        ) }

                        {showTakeOption ?
                            <div className="">
                                <TakeItem takeOptionOnChange={takeOptionOnChange} currentTakeAmount={currentTakeAmount} />
                            </div>
                            : ""}
                        {/* </div> */}

                    </div>
                </div>


                {/* blue: main table ui */}
                {/* green: Headers... */}
                <div className="p-s5 lg:overflow-auto overflow-x-auto lg:max-w-full max-w-[1024px]">
                    <table className="w-full overflow-hidden table-border-outer">
                        <thead className="">
                            <tr>
                                {headers.map((item, index) => {
                                    return (
                                        <th
                                            onClick={item?.onClickAction}
                                            key={index}
                                            className={`cursor-pointer w-[${item?.width}%] relative border-collapse text-center capitalize table-title py-2 ${index === headers.length ? "border-r-[0px]" : "border-r-[1px]"} `} >
                                            <div className="flex flex-row items-center justify-center px-1 space-x-2">
                                                <span className={` `}>
                                                    {item?.name}
                                                </span>
                                                {item?.index !== 0 && <img className="" src={defineTableSortIcon(item?.sort, item?.isActive)} alt="" />}
                                            </div>

                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        {!autoManageRow ?
                            <>
                                {/* r: manual table body rows..  */}
                                <tbody className="border-collapse border-[1px]">
                                    {items?.length > 0 ? items : <NoDataRow columnNumber={headers?.length ?? 3} />}
                                </tbody>
                            </>
                            :
                            <>
                                {/* b: auto table row management */}
                                <tbody className="border-collapse border-[1px]">
                                    {
                                        paginationObject?.data?.length > 0 ? paginationObject?.data?.map((item, index) => <TableRowComponent key={index} index={indexArray[index]} data={item} />)
                                            : <NoDataRow columnNumber={headers?.length ?? 3} />
                                    }
                                </tbody>
                            </>
                        }



                    </table>
                </div>

                {/* blue: Pagination goes here ! */}
                {(showPagination === true) ? (
                    <div className={`flex justify-between items-center ${showPageCountText ? "h-s60 pt-5" : ""}`} >
                        {showPageCountText ? (
                            paginationObject?.total > 0 ?
                                <div className="text-sm">
                                    {t("Showing")} {paginationObject?.from ?? 0} {t("to")} {paginationObject?.to ?? 0}, {t("out of")} {paginationObject?.total} {t("results")}
                                </div>
                                :
                                <div className="text-sm">
                                    {t('No results available!')}
                                </div>
                        ) : (
                            ""
                        )}

                        {paginationObject?.last_page !== 1 ? (
                            <div className="">
                                <AutoPaginate
                                    currentTakeAmount={currentTakeAmount}
                                    paginationObject={paginationObject}
                                    paginationOnClick={paginationOnClick}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}


export function NoDataRow({ message = "No Data Available!", columnNumber = 5 }) {
    const { t } = useTranslation();

    return (
        <tr className='w-full'>
            <th colSpan={columnNumber} className="w-full info py-s20">
                {t(message)}
            </th>
        </tr>
    )
}


const TakeItem = ({ takeArray = [10, 25, 50, 100], currentTakeAmount, takeOptionOnChange = () => { } }) => {
    const { t } = useTranslation();
    return (
        <div className='flex items-baseline justify-between p-0 space-x-2 table-info'>
            <div className=''>{t('Show')}</div>
            <select
                value={currentTakeAmount}
                onChange={takeOptionOnChange}
                className=' cp h-[40px]  table-info rounded-br5 select-style bg-white border border-cTextGray'
            >
                {
                    takeArray?.map((item, index) =>
                        <option
                            key={index}
                            className='py-2 table-info text-cMainBlack cp'
                            value={item}
                        >{item}</option>
                    )
                }

            </select> <div className=''>{t('Results')}</div>

        </div>
    )
}