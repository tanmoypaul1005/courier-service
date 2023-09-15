import React from 'react';
import { iCalendar, iClock } from '../../../app/utility/imageImports';
import { formatDate } from '../../../app/utility/utilityFunctions';

const NotificationDropdownItem = ({ seen = false, title = "NA", details = 'NA', date = "NA", time = "NA", onClick = () => { } }) => {
    return (
        <div className='cursor-pointer' onClick={onClick}>
            <div className={`${!seen ? 'text-cMainBlack' : 'text-cShadeBlueGray'} text-fs16 font-fw600`}>{title}</div>
            <div className={`${!seen ? 'text-cMainBlack' : 'text-cShadeBlueGray'} text-fs12 font-fw500 mt-s5 truncate`}>{details}</div>
            <div className='flex justify-between mt-s5'><div></div>
                <div className='flex'>
                    <div className='flex mr-s10'><img src={iCalendar} alt="" />
                        <span className='ml-s5 text-fs10 font-fw400 text-cDisable'>{formatDate(date)}</span></div>
                    <div className='flex'><img src={iClock} alt="" />
                        <span className='ml-s5 text-fs10 font-fw400 text-cDisable'>{time}</span></div>
                </div>
            </div>
        </div>
    );
};

export default NotificationDropdownItem;