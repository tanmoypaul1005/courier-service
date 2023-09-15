import { Radio } from '@mui/material';
import React from 'react';
import Image from '../image/Image';
import RatingFiveStar from '../rating/RatingFiveStar';
import { iFavoriteIcon, iPlus2, iRedCancel } from '../../app/utility/imageImports'


const CompanyListItem = ({
    thickBordered = false,
    withCheckbox = false,
    image = "",
    dummyImage = "",
    selected = false,
    onSelect = () => { },
    title = "ONE",
    onClick = () => { },
    rating = 2,
    is_favorite = false,
    has_action_btn = false,
    is_add_type = true,
    onActionBtnClick = () => { },
}) => {

// console.log("log",rating)
// console.log("title",title)

    return (
        <div className={`flex items-center space-x-2 px-s8 py-s10 rounded-br5 cursor-pointer transition-all
                duration-300 ease-in-out relative hover:bg-cBgLayout bg-white border-cBrand
                ${thickBordered ? "border-[2px]" : "border-[1px]"}`}>

            <div
                className={`flex items-center justify-center rounded-full transition-all duration-300 ease-in-out overflow-hidden
                max-w-[50px] min-w-[50px] h-s50`}>
                <Image src={image} dummyImage={dummyImage} alt="" className='object-cover rounded-full max-w-[50px] min-w-[50px] h-s50' />
            </div>

            {/* b  main titles and other texts */}
            <div onClick={onClick} className={`flex flex-col space-y-2 items-start w-[calc(100%-60px)] `}>
                <div className='max-w-[50px] sm:max-w-[80px] lg:max-w-[150px] font-medium capitalize truncate text-cMainBlack'>{title}</div>

                {/*g rating component */}
                <div className='w-full flex flex-row justify-between items-center space-x-3'>
                    <div className={`duration-300 ease-in-out mt-s0`}>
                        <RatingFiveStar rating={rating} />
                    </div>
                    {is_favorite ? <img src={iFavoriteIcon} alt="" /> : <></>}
                </div>

            </div>

            {withCheckbox ? <div className="flex items-center justify-center">
                <Radio
                    checked={selected}
                    onChange={onSelect}
                    name="radio-buttons"
                />
            </div> : ""}

            {has_action_btn ? <img onClick={onActionBtnClick} className='absolute -top-s6 -right-s6 h-4 w-4' src={is_add_type ? iPlus2 : iRedCancel} alt="" /> : <></>}
        </div>
    )
}

export default CompanyListItem


