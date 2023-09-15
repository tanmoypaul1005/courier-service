import React from 'react';

const TextButton = (
    {
        btnLabel = "Trek",
        isDisabled = false,
        textColor='cMainBlue',
        hoverColor="cTextButtonHover",
        onClick,
        smallSize=false,
        icon="",
        type="button"
    }
) => {
    return (
        <>
         <button  type={type} onClick={onClick} className={`rounded-br4 px-s16 font-fw600 text-fs16 text-${textColor}  ${smallSize? 'h-[32px]':"h-[44px]"} 
         ${isDisabled ? "cursor-not-allowed text-[#A3B7D5]" : `cursor-pointer  hover:bg-${hoverColor}`}`} >
           {icon && <img className="w-[16px] h-[16px] mr-[10px]"  src={icon} alt=""/> } {btnLabel}
        </button>   
        </>
    );
};

export default TextButton;