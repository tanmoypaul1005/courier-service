import React from 'react';

const CommonHomePageCard = ({ title = "NA", count = 0, selected = false,onClick }) => {
    return (
        <div onClick={onClick} className={`h-s120 cursor-pointer ${selected ? 'border-2 border-cBrand bg-cMainWhite' : 'bg-cFloralWhite'} rounded-br5`}>
            <div className='p-s16 flex flex-col'>
                <span className='text-fs16 text-cGrey font-fw600 capitalize'>{title}</span>
                <span className='text-fs40 text-cCustomerBlack font-fw600 mt-s10'>{count}</span>
            </div>
        </div>
    );
};

export default CommonHomePageCard;