import React from 'react';
import { useNavigate } from 'react-router-dom';
import { iLeftArrow } from '../../app/utility/imageImports';
import CommonReloader from '../reloader/CommonReloader';

const CommonTitle = ({ title = "", className, count, icon, textSize = "text-fs20", link = "", withReloader = false, onReload = () => { } }) => {

    const navigateTo = useNavigate();

    return (
        <div className={`title flex w-[500px] ${className}`}>
            {icon && link === "" ? <div className='flex justify-center items-center mb-s10 mr-s8'>
                <img className='w-s20 h-s17 cursor-pointer mt-s7' src={iLeftArrow} alt="" /></div>
                : ''}

            {icon && link ? <div onClick={() => { navigateTo(link) }} className='flex justify-center items-center mb-s10 mr-s8'>
                <img className='w-s20 h-s17 cursor-pointer mt-s7' src={iLeftArrow} alt="" /></div>
                : ''}

            <div className="flex items-center">
                <div className=''>{title}</div>
                {count ? <div className='pl-1.5'>( {count} )</div> : ""}
                {withReloader ?

                    <div className='ml-4 bg-cBgSideBar p-2 rounded-full shadow-sm' title='Refresh' >
                        <CommonReloader onClick={onReload} />
                    </div>

                    : ""}
            </div>
        </div>
    );
};

export default CommonTitle;