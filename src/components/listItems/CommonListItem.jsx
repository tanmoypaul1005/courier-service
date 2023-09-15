import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import useGeneralStore from '../../app/stores/others/generalStore';
import { user_role as role } from '../../app/utility/const';
import { iCdRequest, iCdRequest2, iLocationNormal, iLocationSelected, iRadioChecked, iRadioNotChecked, iUserAvatar } from '../../app/utility/imageImports';
import Image from '../image/Image';


const CommonListItem = ({
  dummyImage=iUserAvatar,
  withRadioButton = false,
  radioButtonChecked = false,
  radioOnClick = () => { },
  title = "ONE",
  capitalizedTitle = false,
  subTitleOne = "subTitleOne",
  subTitleOneRed = false,
  imgCover = false,
  subTitleTwo = "subTitleTwo",
  selected = false,
  withImage = false,
  imagePath,
  imagePathDummy,
  onClick = () => { },
  iconNormal = iLocationNormal,
  iconSelected = iLocationSelected,
  topRightComponent, //example  = <div className='px-5 text-white bg-cBrand'>123</div>,
  topRightComponentType = 'warning', //example  = 'success', 'danger', 'warning',
  accentType = 'default', //to change the component default color; example  = 'default', 'danger', 'warning',
  seen = false,
  className = '',
  borderColor = null,
  isDanger = false,
  isCancelRequest = false, // cancel request send
  isCancelRequest2 = false, // cancel request receive
}) => {
  const [accentColor, setAccentColor] = useState('#D3E5FF');
  const [inHoverState, setInHoverState] = useState(false);
  const [topRightComponentColor, setTopRightComponentColor] = useState('#F89818');
  const { user_role } = useGeneralStore();

  let mainBlue = '#2257AA';
  // let accentRed = '#FCE4E4';

  useEffect(() => {
    switch (accentType) {
      case 'default':
        setAccentColor('#D3E5FF');
        break;
      case 'danger':
        setAccentColor('#FCE4E4');
        break;
      case 'danger-red':
        setAccentColor('#FF6368');
        break;
      case 'white':
        setAccentColor('#ffffff');
        break;

      default:
        setAccentColor('#D3E5FF');
        break;
    }
  }, [accentType])

  useEffect(() => {
    switch (topRightComponentType) {
      case 'success':
        setTopRightComponentColor('#4CAF50');
        break;
      case 'danger':
        setTopRightComponentColor('#FF6368');
        break;
      case 'warning':
        setTopRightComponentColor('#F89818');
        break;
      case 'accent':
        setTopRightComponentColor('#ffffff00');
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
    <div
      style={{
        backgroundColor: accentColor ?? '#FFFFFF',
        borderColor: selected || inHoverState ? (borderColor ?? mainBlue) : accentColor,

      }}
      onMouseEnter={() => setInHoverState(true)}
      onMouseLeave={() => setInHoverState(false)}
      onClick={onClick}
      className={`
      flex items-center justify-between px-3 rounded-br5 cursor-pointer transition-all duration-300 ease-in-out relative
      hover:border-cMainBlue border-[2px]
      ${topRightComponent ? "py-3" : "py-3"}
      ${className}
    `}>

      {/*g     top right component */}
      {topRightComponent ?
        <div
          style={{
            borderColor: inHoverState && !selected ? (borderColor ?? mainBlue) : topRightComponentColor,
            backgroundColor: topRightComponentColor,
          }}
          className={`
          absolute text-[10px] overflow-hidden duration-300 ease-in-out capitalize
          ${selected ? "top-0 right-0 rounded-tr-[3px]" : "-top-[2px] -right-[2px] rounded-tr-br5"}
          ${typeof (topRightComponent) === "string" ? `border-t-[2px] border-r-[2px] text-white px-1.5 pb-0.5 min-w-[70px] text-center limadi-semibold` : "pt-0.5 pr-0.5"}
      `}>
          {topRightComponent}
        </div> : ""}

      {/* radio button */}
      {withRadioButton ?
        <div onClick={radioOnClick} className="absolute p-1 right-1">
          <img src={radioButtonChecked ? iRadioChecked : iRadioNotChecked} alt="" className='h-s18 w-s18' />
        </div> : ""}

      {/* icon */}
      <div
        className={`
          flex items-center justify-center h-s50 w-s50 rounded-full transition-all duration-300 ease-in-out
          ${!selected ? "bg-white" : `${!withImage && 'bg-cCommonListIconColor'} relative`} 
        `}
      >

        {isCancelRequest && <Tooltip color={'#FF6368'} title={`Cancel${user_role === role.company ? '/Delete' : ''} Request Received!`} > <img src={iCdRequest2} className={'absolute left-10 bottom-5'} alt="" /> </Tooltip>}

        {isCancelRequest2 && <Tooltip color={'#FF6368'} title={`Cancel${user_role === role.company ? '/Delete' : ''} Request Sent!`} > <img src={iCdRequest} className={'absolute left-10 bottom-5'} alt="" /> </Tooltip>}

        {
          withImage ?
            <Image className="h-s50 w-s50" roundedFull={true} src={imagePath} dummyImage={imagePathDummy} />
            :
            <Image dummyImage={dummyImage} src={selected ? iconSelected : iconNormal} alt="" className={`${imgCover ? "h-full w-full object-cover rounded-full " : 'h-full w-s30 object-contain rounded-full'} `} />
        }
      </div>

      {/* b  main titles and other texts */}
      <div className={`flex flex-col ${topRightComponent && 'mt-s5'} items-start w-[calc(100%-70px)]`}>
        <div className={`text-base ${seen ? 'text-cShadeBlueGray' : isDanger ? 'text-white' : 'text-cMainBlack'}  font-medium max-w-full truncate ${capitalizedTitle ? "capitalize" : ""}`} title={title} >{title}</div>
        <div className={`text-xs max-w-full truncate ${seen ? 'text-cShadeBlueGray' : subTitleOneRed ? "text-cRed" : isDanger ? 'text-white' : "text-cSecondaryTextColor "}`}  >{subTitleOne}</div>
        <div className={`text-xs ${seen ? 'text-cShadeBlueGray' : isDanger ? 'text-white' : 'text-cSecondaryTextColor'} max-w-full truncate`}  >{subTitleTwo}</div>
      </div>
    </div>
  )
}

export default CommonListItem