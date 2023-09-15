import React, { useEffect, useState } from 'react';
import { iClockGray } from '../../app/utility/imageImports';
import FreeDropDown from '../dropdown/FreeDropDown';
// import CommonInput from './CommonInput';
import TimePickerNew from './TimePickerNew';

const CommonTimePicker = ({
    selectAction = () => { },
    onChange = () => { },
    endTime,
    init_time,
    label = "Select Time",
    showExtendedTimeUi = true,
    required,
    heightClass = "h-s48",
    show_asterisk = true,
}) => {
    const [value, setValue] = useState('');
    const [showingTimePickerUi, setShowingTimePickerUi] = useState(false);

    useEffect(() => {
        setValue(init_time ?? '');
    }, [init_time]);
    return (
        <div className={`relative  w-full ${heightClass} `}>
            <div className='absolute bottom-0 left-0'>
                <input value={value ?? ''} onChange={() => { }} required={required} className="outline-none h-s1 z-0" />
            </div>
            <div className={`absolute top-0 left-0 bg-white ${heightClass} w-full z-10`}>
                <FreeDropDown
                    onUiUpdate={(data) => setShowingTimePickerUi(data)}
                    width={500}
                    body={
                        <TimePickerNew
                            endTime={endTime}
                            init_time={value ? value : init_time}
                            showExtendedTimeUi={showExtendedTimeUi}
                            selectAction={(e, f) => {
                                //console.log(e, f);
                                setValue(e);
                                selectAction(e, f);
                                onChange(e, f);
                            }}
                        />
                    }
                    button={
                        <div
                            className={`
                                border-b-[1px] hover:border-b-2 outline-none mt-[10px] h-[26px] w-full flex justify-between items-center cursor-pointer relative
                                ${showingTimePickerUi ? 'border-b-cBrand border-b-2' : 'border-b-[#757575]'}
                            `}>

                            <div
                                className={`
                                absolute left-0 transition-all ease-in-out duration-300 text-[#89919E] capitalize
                                ${value !== '' ? '-top-4 text-xs font-normal ' : 'top-0 text-base'}
                            `}>{(required && show_asterisk) ? <div>{label}<span className='text-cRed ml-s2'>*</span> </div> : label}</div>


                            <div className='text-sm text-black'>{value ?? ""}</div>
                            <img src={iClockGray} alt="" className='pb-1' />
                        </div>
                    }
                />
            </div>
        </div>
    )
}

export default CommonTimePicker