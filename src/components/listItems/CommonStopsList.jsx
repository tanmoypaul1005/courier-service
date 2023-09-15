import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';


const CommonStopsList = ({
    time = "00.00",
    count = "NA",
    totalKm = '0',
    routeType = 'routeType',
    title = "ONE",
    subTitleOne = "subTitleOne",
    subTitleTwo = "subTitleTwo",
    circleColorType = '',
    accentBorderType,
    selected = false,
    onGoing = false,
    onClick = () => { },
    topRightComponent, //example  = <div className='px-5 text-white bg-cBrand'>123</div>,
    topRightComponentType = 'warning', //example  = 'success', 'danger', 'warning', 'on_hold,
    accentType = 'default', //to change the component default color; example  = 'default', 'danger', 'warning',
    title_max_width = '287',
}) => {
    const [accentColor, setAccentColor] = useState('');
    // const [inHoverState, setInHoverState] = useState(false);
    const [topRightComponentColor, setTopRightComponentColor] = useState('#F89818');
    const [circleFillColor, setCircleFillColor] = useState('');
    const [accentBorderColor, setAccentBorderColor] = useState(accentBorderType);

    // let mainBlue = '#2257AA';
    // let accentRed = '#FCE4E4';
    // let accentWarning = '#F89818';

    useEffect(() => {
        switch (accentBorderType) {
            case 'warning':
                setAccentBorderColor('#F89818');
                break;
            case 'danger':
                setAccentBorderColor('#FF6368');
                break;
            case 'base':
                setAccentBorderColor('#D1D5DB');
                break;
            case 'default':
                setAccentBorderColor('#D3E5FF');
                break;

            default:
                setAccentBorderColor('#F89818');
                break;
        }
    }, [accentBorderType])

    useEffect(() => {
        switch (circleColorType) {
            case 'warning':
                setCircleFillColor('bg-cBrand');
                break;
            case 'danger':
                setCircleFillColor('bg-[#FF6368]');
                break;
            case 'base':
                setCircleFillColor('bg-cTextButtonHover');
                break;

            default:
                setCircleFillColor('bg-cBrand');
                break;
        }
    }, [circleColorType])

    useEffect(() => {
        switch (accentType) {
            case 'warning':
                setAccentColor('#F89818');
                break;
            case 'on_hold':
                setAccentColor('#F89818');
                break;
            case 'danger':
                setAccentColor('#FCE4E4');
                break;
            case 'transparent':
                setAccentColor('#ffffff00');
                break;

            default:
                setAccentColor('#D3E5FF');
                break;
        }
    }, [accentType])

    useEffect(() => {
        switch (topRightComponentType) {
            case 'success':
                setTopRightComponentColor('#D1D5DB');
                break;
            case 'danger':
                setTopRightComponentColor('#FF6368');
                break;
            case 'warning':
                setTopRightComponentColor('#F89818');
                break;
            case 'on_hold':
                setTopRightComponentColor('#FFF1DF');
                break;
            case 'base':
                setTopRightComponentColor('#D1D5DB');
                break;

            default:
                setTopRightComponentColor('#F89818');
                break
        }
    }, [topRightComponentType]);

    return (
        <div className='flex'>

            <div className='flex items-center justify-center'>
                <div className='w-[80px] flex flex-col items-center justify-center'>

                    {/* circle */}
                    <div className={`rounded-full ${circleFillColor}  flex justify-center w-s40 h-s40`}>
                        <div className={`text-cMainWhite text-center text-fs16 font-fw500 py-s8`}>{count}</div>
                    </div>

                    <div className='pt-1 text-cMainBlack text-fs8 font-fw500'>{totalKm}, {time}</div>
                    <div className='pt-1 capitalize text-cMainBlack text-fs8 font-fw500'>{routeType}</div>
                </div>
            </div>

            <div
                style={{
                    backgroundColor: selected ? '#ffffff' : onGoing ? '#FFF1DF' : accentColor,
                    borderColor: accentBorderColor,


                    //todo: if selection feature required, then will have to start from here
                    //  borderColor: selected || inHoverState ? mainBlue : onGoing ? '#FFF1DF' : accentColor,

                }}

                //todo: if hover effect correction req: start here
                // onMouseEnter={() => setInHoverState(true)}
                // onMouseLeave={() => setInHoverState(false)}
                onClick={onClick}
                className={`px-2 w-full rounded-br5 cursor-pointer transition-all duration-300 ease-in-out relative border-[2px] py-2`}>

                {/*g     top right component */}
                {topRightComponent ? <div
                    style={{
                        // inHoverState && !selected ? mainBlue : 
                        borderColor: topRightComponentColor,
                        backgroundColor: topRightComponentColor,
                    }}
                    className={`absolute text-[10px] overflow-hidden duration-300 ease-in-out capitalize
                    ${selected ? "top-0 right-0 rounded-tr-[3px]" : "-top-[2px] -right-[2px] rounded-tr-br5"}
                    ${typeof (topRightComponent) === "string" ? `border-t-[2px] border-r-[2px] ${topRightComponentType === 'on_hold' ? 'text-cBrand' : 'text-white'} px-1.5 pb-0.5 min-w-[70px] text-center font-semibold` : "pt-0.5 pr-0.5"}
                   `}>
                    {topRightComponent}
                </div> : ""}


                {/* b   main titles and other texts */}
                <div className={`flex flex-col items-start`}>
                    <div className={`text-sm 
                    ${accentType === 'on_hold' ? 'text-white' : topRightComponentType === 'base' ? 
                    'text-[#D1D5DB]' : 'text-cMainBlack'} w-full break-words font-medium  break-all truncate`}>
                        <Tooltip title={title}>{title}</Tooltip>
                        </div>
                    <div className={`text-xs max-W-full truncate ${accentType === 'on_hold' ? 'text-white'
                     : topRightComponentType === 'base' ? 'text-[#D1D5DB]' : 'text-cMainBlack'}`}>{subTitleOne}</div>
                    <div title={subTitleTwo} className={`text-xs ${accentType === 'on_hold' ? 'text-white' : topRightComponentType === 'base' ? 'text-[#D1D5DB]' : 'text-cMainBlack'} w-[${title_max_width}px] truncate break-all`}>{subTitleTwo}</div>
                </div>
            </div>
        </div>
    )
}

export default CommonStopsList