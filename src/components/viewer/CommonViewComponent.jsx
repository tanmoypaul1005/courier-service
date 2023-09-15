import React from 'react'
import { iBottomArrow } from '../../app/utility/imageImports'
import { useTranslation } from 'react-i18next';

const CommonViewComponent = ({
  onClick = () => { },
  labelText = 'some label',
  value = 'NA',
  underline = false,
  className = '',
  selectComponent = false,
  disabled = false,
  capitalizedData = false,
}) => {
  const { t } = useTranslation();

  return (
    selectComponent ?
      <div onClick={onClick} className='pt-0 w-full h-[35px] '>
        <div className='flex items-center justify-between border-b border-dotted border-[#757575]'>
          <div className={`capitalize ${disabled ? "text-[#939699]" : ""} `}>{labelText}</div>
          <img src={iBottomArrow} alt="" className='w-3 h-3' />
        </div>
        {/* <div className="mt-1.5 w-full h-s1 bg-[#757575]"></div> */}
      </div>
      :
      <div onClick={onClick} className={`flex flex-col justify-end  ${underline ? 'w-full' : 'w-fit'} ${className}`}>
        <div className='capitalize text-xs font-medium text-[#89919E]'>{t(labelText)}</div>
        <div className={`${capitalizedData ? "capitalize" : ""}`}>{value ?? 'NA'}</div>
        {underline ? <div className="w-full h-s1 bg-[#757575]"></div> : ''}
      </div>
  )
}

export default CommonViewComponent