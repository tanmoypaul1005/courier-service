import React from 'react';
import { base_url_src } from '../../app/utility/const';
import { iUserAvatar } from '../../app/utility/imageImports';

const Image = ({ src, src2, className, onClick = () => { }, dummyImage, withPreview = false, isCategoryImage = false,
    cursorPointerClass = "cursor-default", alt = "Attachment", roundedFull = false }) => {

    return (
        <>
            <img
                onClick={() => {
                    onClick();
                }}
                className={`${roundedFull && 'rounded-full'} 
                    ${isCategoryImage ? "" : "object-cover"}
                    ${className}
                    ${withPreview ? "cursor-pointer" : cursorPointerClass}
                `}
                src={src ? base_url_src + src : (src2 ? src2 : dummyImage ? dummyImage : iUserAvatar)}
                alt={alt}
                onError={(e) => {
                    e.target.onerror = null; e.target.src = dummyImage ? dummyImage : iUserAvatar;
                }}
            />
        </>
    )
}

export default Image