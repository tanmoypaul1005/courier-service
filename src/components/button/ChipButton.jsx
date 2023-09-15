import React from 'react'

export default function ChipButton({content, onClick, is_selected = false}) {
  return (
    <div onClick={onClick} className={`${is_selected ? 'bg-cMainBlue text-cMainWhite' : 'bg-cMainWhite border'} shadow-sm text-fs16 font-fw500  rounded-full p-1 cursor-pointer flex items-center h-s36 px-2`} >
    {content}
    </div>
  )
}
