import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function AutoPaginate({
    paginationObject,
    paginationOnClick,
    currentTakeAmount
}) {
    const { t } = useTranslation();
    const [mainArray, setMainArray] = useState([]);

    const makePaginationArray = () => {
        let p_array = [];
        let array_size = 0;
        if (paginationObject?.last_page > 5) {
            array_size = 5;
        } else {
            array_size = paginationObject?.last_page;
        }
        for (let i = 0; i < array_size; i++) {
            let t_active = false;
            if (paginationObject?.current_page === (i + 1)) {
                t_active = true;
            }
            p_array.push({
                active: t_active,
                label: (i + 1),
                url: paginationObject?.path + "?page=" + (i + 1),
            })
        }

        // console.log("paginationObject TECH  ::::", p_array);
        setMainArray(p_array);
    }

    const manualPageArray = () => {
        let p_array = [];

        if (paginationObject?.last_page === paginationObject?.current_page && paginationObject?.last_page > 4) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page - 4),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page - 4),
            })
        }


        if (((paginationObject?.last_page - 1) === paginationObject?.current_page) && ((paginationObject?.last_page - 1) > 3)) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page - 3),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page - 3),
            })
        }

        if (paginationObject?.last_page === paginationObject?.current_page && paginationObject?.last_page > 3) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page - 3),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page - 3),
            })
        }

        if (paginationObject?.current_page > 2) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page - 2),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page - 2),
            })
        }

        if (paginationObject?.current_page > 1) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page - 1),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page - 1),
            })
        }


        p_array.push({
            active: true,
            label: (paginationObject?.current_page),
            url: paginationObject?.path + "?page=" + (paginationObject?.current_page),
        })

        if (paginationObject?.last_page - paginationObject?.current_page > 1) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page + 1),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page + 1),
            })
        }

        if (paginationObject?.last_page - paginationObject?.current_page > 2) {
            p_array.push({
                active: false,
                label: (paginationObject?.current_page + 2),
                url: paginationObject?.path + "?page=" + (paginationObject?.current_page + 2),
            })

            if ((p_array.length < 5) && (paginationObject?.last_page - paginationObject?.current_page > 3)) {
                p_array.push({
                    active: false,
                    label: (paginationObject?.current_page + 3),
                    url: paginationObject?.path + "?page=" + (paginationObject?.current_page + 3),
                })
            }

            if ((p_array.length < 5) && (paginationObject?.last_page - paginationObject?.current_page > 4)) {
                p_array.push({
                    active: false,
                    label: (paginationObject?.current_page + 4),
                    url: paginationObject?.path + "?page=" + (paginationObject?.current_page + 4),
                })
            }
        }

        // console.log("paginationObject TECH  ::::", p_array);
        setMainArray(p_array);
    }

    useEffect(() => {
        // console.log("paginationObject:::", paginationObject, "current take:", currentTakeAmount, "calculated items:", (paginationObject?.to - paginationObject?.from) + 1);
        if (paginationObject?.last_page < 6) {
            makePaginationArray()
        } else {
            manualPageArray();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationObject])

    useEffect(() => {
        if (currentTakeAmount && ((currentTakeAmount - 1) > (paginationObject?.to - paginationObject?.from))) {
            // window.scrollTo({ left: 0, top: 0, behavior: "smooth" });;
            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            // console.log("SCROLLED BOTTOM BASE");
        }
        //  else window.scrollTo({ left: 0, top: document.body.scrollHeight || document.documentElement.scrollHeight, behavior: "smooth" });
    }, [currentTakeAmount, paginationObject]);

    return (
        <>
            <div>
                <ul className="flex">
                    <li>
                        <div onClick={() => {
                            if (paginationObject?.prev_page_url) {
                                paginationOnClick(paginationObject?.prev_page_url);
                            }
                        }}
                            className={`py-s10 px-s12 text-cIconColor bg-cWhite rounded-l-br6 border border-cNmSelect 
                                            ${paginationObject?.prev_page_url
                                    ? "cursor-pointer hover:bg-cGridView hover:text-cTextShopDetails"
                                    : "cursor-not-allowed"}`}
                        >
                            {t("Previous")}
                        </div>
                    </li>

                    {paginationObject?.first_page_url ? (
                        <>
                            <li>
                                <div
                                    onClick={() => paginationOnClick(paginationObject?.first_page_url)}
                                    className={`py-s10 px-s14 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"} 
                                        ${paginationObject.current_page === 1
                                            ? "text-cBrand hover:bg-cBorderBottom bg-cSelectedBar hover:text-cBrand"
                                            : "text-cTextBody hover:bg-cGridView bg-white hover:text-cTextShopDetails"
                                        }
                                        border border-cNmSelect cursor-pointer`}
                                >
                                    1
                                </div>
                            </li>
                            {(paginationObject.current_page > 4) && (paginationObject.last_page > 5) ?
                                <li>
                                    <div
                                        // onClick={() => paginationOnClick(firstItem.url)}
                                        className={`border cursor-default py-s10 px-s12 text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails border-cNmSelect`}
                                    >
                                        ...
                                    </div>
                                </li> : ""}
                        </>
                    ) : (
                        ""
                    )}

                    {mainArray?.map((item, index) => (
                        item.label !== 1 && item.label !== paginationObject?.last_page ?
                            <li key={index}>
                                <div
                                    onClick={() => paginationOnClick(item?.url)}
                                    className={`py-s10 px-s12 
                                        ${item?.active === true
                                            ? "text-cBrand hover:bg-cBorderBottom bg-cSelectedBar hover:text-cBrand"
                                            : "text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"
                                        }   border border-cNmSelect cursor-pointer`}
                                >
                                    {item?.label}
                                </div>
                            </li> : ""
                    ))}

                    {paginationObject?.last_page_url ? (
                        <>
                            {(paginationObject.last_page - paginationObject.current_page > 3) && (paginationObject.last_page > 5) ?
                                <li>
                                    <div
                                        // onClick={() => paginationOnClick(firstItem.url)}
                                        className={`border cursor-default py-s10 px-s12 text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails border-cNmSelect`}
                                    >
                                        ...
                                    </div>
                                </li> : ""}

                            <li>
                                <div
                                    onClick={() => paginationOnClick(paginationObject?.last_page_url)}
                                    className={`py-s10 px-s12 ${"text-cTextBody hover:bg-cGridView bg-cWhite hover:text-cTextShopDetails"} 
                                        ${paginationObject.last_page === paginationObject.current_page
                                            ? "text-cBrand hover:bg-cBorderBottom bg-cSelectedBar hover:text-cBrand"
                                            : "text-cTextBody hover:bg-cGridView bg-white hover:text-cTextShopDetails"
                                        }  border border-cNmSelect cursor-pointer`}
                                >
                                    {paginationObject?.last_page}
                                </div>
                            </li>
                        </>
                    ) : (
                        ""
                    )}

                    <li>
                        <div onClick={() => {
                            if (paginationObject?.next_page_url) {
                                paginationOnClick(paginationObject?.next_page_url);
                            }
                        }}
                            className={`py-s10 px-s12 text-cIconColor bg-white rounded-r-br6 border border-cNmSelect
                                        ${paginationObject?.next_page_url
                                    ? "cursor-pointer hover:bg-cGridView hover:text-cTextShopDetails"
                                    : "cursor-not-allowed"
                                }`}
                        >
                            {t("Next")}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
