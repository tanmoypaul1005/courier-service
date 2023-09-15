import React from 'react'
import { useNavigate } from 'react-router-dom'
import { iLeftArrow } from '../../app/utility/imageImports'
import CommonReloader from '../reloader/CommonReloader'

const CommonTopTitleSection = ({
    title = '',
    counter = null,
    rightSideComponent,
    withBackLink = "",
    withReloader = false,
    onReload = () => { }
}) => {
    const navigateTo = useNavigate();

    return (
        <div className='flex xl:items-center items-baseline justify-between bg-white mb-6'>
            <div className='title flex items-center space-x-2.5'>
                {withBackLink ? <div className='cursor-pointer' onClick={() => navigateTo(withBackLink ?? '/')}>< img src={iLeftArrow} alt="" /> </div> : ""}
                <div className='capitalize'>{title}</div>
                <div>{counter !== null ? `( ${counter} )` : ""}</div>
                {withReloader ?
                    <div className='ml-4 bg-cBgSideBar p-2 rounded-full shadow-sm'>
                        <CommonReloader onClick={onReload} />
                    </div>
                    : ""}
            </div>
            <div>{rightSideComponent}</div>
        </div>
    )
}

export default CommonTopTitleSection