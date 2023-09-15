import React, { useEffect, useState } from "react";

const CommonButton = ({
    btnLabel = "Trek",
    colorType = "primary",
    isDisabled = false,
    customStyle,
    onClick,
    width = "min-w-[120px]", // min-w-[150px]
    type = "button",
    roundedFull = false,
    icon = "",
    iconRight = "",
    text = "fs-16",
    showActiveDot = false,
    smallSize = false,
    className = "",

    activeDotActionFN = () => { },
}) => {
    // colorType="basic", "danger", "primary", "success", "warning"
    const [colorCode, setColorCode] = useState("bg-cPlaceholder");
    const [textColorCode, setTextColorCode] = useState("text-white");

    const colorCheckup = (colorType) => {
        switch (colorType) {
            case "basic":
                setColorCode("bg-cDisable");
                setTextColorCode("text-cMainWhite");
                break;
            case "danger":
                setColorCode("bg-cRed");
                setTextColorCode("text-white");
                break;
            case "primary":
                setColorCode("bg-cMainBlue hover:bg-[#13438D]");
                setTextColorCode("text-cMainWhite");
                break;
            case "success":
                setColorCode("bg-cSuccess");
                setTextColorCode("text-white");
                break;
            case "warning":
                setColorCode("bg-cBrand");
                setTextColorCode("text-white");
                break;
            case "white":
                setColorCode("bg-cCard");
                setTextColorCode("text-cBrandColor");
                break;
            case "BrandColor":
                setColorCode("bg-cBrandColor");
                setTextColorCode("text-white");
                break;

            case "disable":
                setColorCode("bg-cDisable");
                setTextColorCode("text-white");
                break;

            case "FilterClearButton":
                setColorCode("bg-cBrandColor2");
                setTextColorCode("text-cBrand");
                break;

            default:
                setColorCode("bg-cPlaceholder");
                setTextColorCode("text-cTextBlack");
                break;
        }
    };

    useEffect(() => {
        colorCheckup(colorType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorType]);

    return (
        <div className={`outline-none relative select-none h-s44 font-fw500 ${text} capitalize duration-300 
        ${width} max-w-full
      ${isDisabled ? "cursor-not-allowed bg-cDisable" : "cursor-pointer"}
      ${customStyle}
      ${colorCode}
      ${textColorCode}
      ${smallSize ? 'h-[32px]' : `h-[40px] ${className}`}
      ${roundedFull ? "rounded-full" : 'rounded-br4'}
    `}>
            <button
                disabled={isDisabled}
                type={type}
                onClick={onClick}
                className={`flex items-center justify-center select-none ${smallSize ? 'h-[32px]' : `h-[40px] ${className}`} font-fw500 ${text} capitalize duration-300
      ${isDisabled ? "cursor-not-allowed bg-cDisable hover:bg-cDisable" : "cursor-pointer"}
      ${customStyle}
      ${colorCode}
      ${textColorCode}
      ${width} max-w-full px-s15
      ${roundedFull ? "rounded-full" : 'rounded-br5'} ${className} `}
            >
                {icon && <img className="w-[16px] h-[16px] mr-[10px]" src={icon} alt="" />}
                {btnLabel}
                {iconRight}
            </button>
            {showActiveDot ?

                <span className="absolute right-3 rounded-full bg-cRed w-s12 h-s12 top-s12"></span>
                : ""}
        </div>
    );
};

export default CommonButton;