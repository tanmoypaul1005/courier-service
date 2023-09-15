import React from 'react';
import { iCommonEmptyImage, iWhitePlus } from '../../app/utility/imageImports';
import CommonButton from '../button/CommonButton';

const CommonEmptyData = ({
    title = "Nothing in Saved",
    details = "", button = false, onClick = () => { }, btnLabel = "" }) => {

    return (
        <div className='h-[600px] w-full flex justify-center items-center '>
            <div className='flex flex-col justify-center items-center w-full'>
                <img src={iCommonEmptyImage} alt="iNoBiddingIcon" className='h-[300px] w-[300px] my-s15' />
                <div className='text-fs24 font-fw500 text-cCustomerBlack '>{title}</div>
                <div className='text-fs14 font-fw400 text-cGrey mb-s15'>{details}</div>
                {button && <CommonButton
                    onClick={onClick}
                    icon={iWhitePlus}
                    btnLabel={btnLabel}
                    isDisabled={false}
                    width="w-[220px]"
                />}
            </div>
        </div>
    );
};

export default CommonEmptyData;