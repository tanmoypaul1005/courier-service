import React from 'react'
import { iRedCancel } from '../../app/utility/imageImports'

const SearchFilterChip = ({ title = 'chup chap chip', onCloseChip = () => { }, clearChip = false, clearChipTitle = 'clear all' }) => {
    return (
        clearChip ?
            <div onClick={(e) => onCloseChip(e)} className='bg-cRed text-xs text-white limadi-medium flex items-center justify-center h-s32 px-4 rounded-full capitalize cursor-pointer select-none'>
                {clearChipTitle}
            </div>
            :
            <div className='text-xs border-2 border-cMainBlue py-1 px-2 rounded-full flex items-center space-x-1 w-fit' >
                <div className='font-medium capitalize max-w-[180px] truncate'>{title}</div>
                <div onClick={(e) => onCloseChip(e)} className='cursor-pointer'><img src={iRedCancel} alt="" /></div>
            </div>
    )
}

export default SearchFilterChip