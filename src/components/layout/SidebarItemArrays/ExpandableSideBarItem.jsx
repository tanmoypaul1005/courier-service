import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLayoutStore from '../../../app/stores/others/layoutStore';
import { iBrandArrowUP } from '../../../app/utility/imageImports';
import { useTranslation } from 'react-i18next';

const ExpandableSideBarItem = ({
    title,
    onClick,
    isActiveLink,
    normalIcon,
    selectedIcon,
    expandedItems = [],
}) => {
    const { isSidebarOpen, activeSection, showExpandedSidebarItem, setShowExpandedSidebarItem } = useLayoutStore();

    const [isExpanded, setIsExpanded] = useState(showExpandedSidebarItem);

    let heightCalculated = (expandedItems?.length * 49) + 50;
    const { t } = useTranslation();

    useEffect(() => { setIsExpanded(showExpandedSidebarItem) }, [showExpandedSidebarItem]);

    return (
        <div
            style={{ height: isExpanded ? heightCalculated : 50 }}
            className={`
            transition-height duration-500
            overflow-hidden capitalize rounded-br5 my-1
            ${isExpanded === true ? "ring-2 ring-cBrand" : ""}
            ${isSidebarOpen ? "" : "w-20"}`}
            onClick={onClick}
        >
            <div className="cursor-pointer">
                <div
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                        setShowExpandedSidebarItem(!showExpandedSidebarItem);
                        // setActiveSection(isActiveLink);
                    }}
                    className={`flex items-center h-[50px] hover:bg-cBgSelectedSideBar hover:text-cBrand
                        ${isExpanded ? "text-cBrand" : "bg-cBgSideBar text-cDisable"}
                        ${isSidebarOpen ? "pl-s12  rounded-br5 justify-between " : "justify-center"}
                    `}
                >
                    <Tooltip
                        title={isSidebarOpen ? "" : title}
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
                        <div className="flex items-center">
                            <div
                                className={`flex justify-center items-center rounded-br5    ${activeSection === isActiveLink
                                    ? ""
                                    : " "
                                    }   ${isSidebarOpen
                                        ? "my-[7px] p-[5px] w-[30px] h-[30px]"
                                        : " w-s30 h-s30"
                                    }`}
                            >
                                <img
                                    className="w-s20 h-s20 object-contain"
                                    src={isExpanded ? selectedIcon : normalIcon}
                                    alt=""
                                />
                            </div>

                            {isSidebarOpen ? (
                                <div className="font-semibold pl-5 text-fs14 text-left">
                                    {t(title)}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </Tooltip>

                    {isSidebarOpen ? (
                        <div className="pr-5">
                            <img
                                src={iBrandArrowUP}
                                alt=""
                                className={`${isExpanded === false ? "rotate-180" : "rotate-0"
                                    } transition-all duration-500 ease-in-out`}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div className="flex flex-col items-start justify-center">
                {
                    expandedItems?.map((item, index) =>
                        <Tooltip
                            color={'#F89818'}
                            key={index}
                            title={isSidebarOpen ? "" : t(item?.title)}
                            placement="right"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        textTransform: "capitalize"
                                    }
                                }
                            }}
                        >
                            <Link
                                onClick={item?.onClick}
                                to={item?.link}
                                className={`
                                    flex items-center font-bold text-fs14 py-2.5 hover:bg-cBgSelectedSideBar w-full my-1
                                    ${isSidebarOpen ? "pl-[50px]" : "justify-center"}
                                    ${window.location.pathname.includes(item?.link) ? "font-fw600 bg-cBgSelectedSideBar text-cBrand" : "text-cDisable"}
                                `}>
                                {/* location.pathname.includes */}
                                <img
                                    src={
                                        window.location.pathname.includes(item?.link)
                                            ?
                                            item?.selectedIcon
                                            :
                                            item?.normalIcon
                                    }
                                    alt=""
                                    className="w-s20 h-s20 object-contain"
                                />
                                {isSidebarOpen ? <div className="pl-s10">{t(item?.title)}</div> : ""}
                            </Link>
                        </Tooltip>
                    )
                }

            </div>

        </div>

    )
}

export default ExpandableSideBarItem