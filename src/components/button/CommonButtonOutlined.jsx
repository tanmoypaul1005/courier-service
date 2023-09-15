import React, { useEffect, useState } from "react";

const CommonButtonOutlined = ({
    btnLabel = "Trek",
    colorType = "basic",
    isDisabled = false,
    isFilterDot = false,
    isFullRounded = false,
    CustomStyles,

    iconRight = "",
    iconRightHover = "",

    iconLeft = "",
    iconLeftHover = "",

    width = "min-w-[120px]",
    zIndex = "",
    onClick,
    smallSize = false,
}) => {
    // colorType="basic", "danger", "primary", "success", "warning"
    const [colorCode, setColorCode] = useState("ring-cPlaceholder");
    const [textColorCode, setTextColorCode] = useState("text-cMainBlue");
    const [hoverColorCode, setHoverColorCode] = useState("text-cPlaceholder");
    const [hoverNow, setHoverNow] = useState(false);

    useEffect(() => {
        switch (colorType) {
            case "basic":
                setColorCode("ring-cMainBlue");
                setHoverColorCode("hover:bg-cMainBlue");
                setTextColorCode("text-cMainBlue");
                break;
            case "danger":
                setColorCode("ring-cRed");
                setHoverColorCode("hover:bg-cRed");
                setTextColorCode("text-cRed");
                break;
            case "primary":
                setColorCode("ring-cMainBlue");
                setHoverColorCode("hover:bg-cMainBlue");
                setTextColorCode("text-cMainBlue");
                break;
            case "success":
                setColorCode("ring-cSuccess");
                setHoverColorCode("hover:bg-cSuccess");
                setTextColorCode("text-cSuccess");
                break;
            case "warning":
                setColorCode("ring-cPending");
                setHoverColorCode("hover:bg-cPending");
                setTextColorCode("text-cPending");
                break;
            default:
                setColorCode("ring-cPlaceholder");
                setHoverColorCode("hover:bg-cPlaceholder");
                setTextColorCode("text-cPlaceholder");
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorType]);

    useEffect(() => {
        if (isDisabled === true || isDisabled === 'true') {
            setColorCode("ring-cDisable");
            setHoverColorCode("hover:bg-cDisable");
            setTextColorCode("text-cDisable");
        }
    }, [isDisabled])

    return (
        <div
            onMouseEnter={() => { setHoverNow(true); }}
            onMouseLeave={() => { setHoverNow(false); }}
            onClick={onClick}
            disabled={isDisabled}
            className={`
                flex items-center font-fw500 whitespace-nowrap overflow-clip justify-center select-none ring-2 relative duration-300  text-fs16 capitalize bg-white
                ${!isDisabled && 'hover:text-white'}
                ${smallSize ? 'h-[32px]' : 'h-[36px]'}
                ${width}
                ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                ${isFullRounded ? "rounded-full" : "rounded-br4"}
                ${CustomStyles}
                ${zIndex}
                ${colorCode}
                ${textColorCode}
                ${!isDisabled && hoverColorCode}
            `}
        >
            {iconLeftHover ?
                hoverNow ?
                    <img src={iconLeft} className="w-s16 h-s16 mr-s10" alt="" />
                    : <img src={iconLeftHover} className="w-s16 h-s16 mr-s10" alt="" /> : ""}

            {btnLabel}

            {iconRightHover ?
                hoverNow ?
                    <img src={iconRightHover} className="w-s16 h-s16 ml-s15" alt="" />
                    : <img src={iconRight} className="w-s16 h-s16 ml-s15" alt="" /> : ""}
            {
                isFilterDot ? <div className="w-s12 h-s12 rounded-full bg-cRed absolute -top-[1px] -right-[1px]"></div> : ""
            }

        </div>
    );
};

export default CommonButtonOutlined;
