import React from 'react'
import CommonRadioGroup from './CommonRadioGroup'

const CommonSettingsItems = ({
    title = "Some Settings",
    selected = false,
    hasSwitch,
    onClick = () => { },
    item
}) => {


    return (
        <div
            onClick={onClick}
            className={`h-s40 px-s2 sm:pl-2 sm:pr-2 py-2 flex items-center justify-between rounded-br5 border-2 ${!hasSwitch && 'cursor-pointer'} 
            ${selected ? "bg-white border-cBrand" : "bg-cBgSideBar border-cBgSideBar"}
        `}>
            <div className='text-fs12 sm:text-fs14 lg:text-fs16 truncate mr-s4'>{title}</div>
            {hasSwitch && <div className=''>
                <CommonRadioGroup item={item} />
            </div>}
        </div>
    )
}

export default CommonSettingsItems