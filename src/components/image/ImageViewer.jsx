import React, { useState } from 'react'
import { iImageUploadIcon, iSignature } from "../../app/utility/imageImports";
import ImageViewerModal from './ImageViewerModal';

export default function ImageViewer({ src = null, label = 'Attachment', className = '', is_signature = false }) {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`border bg-cMainWhite w-[150px] h-[45px] px-2 flex justify-center rounded-br4 cp relative ${is_signature ? 'border-cMainBlue' : 'border-cMainBlue'} ${className}`}>
      <div onClick={() => setShowModal(true)} className="flex justify-center items-center text-center space-x-2">
        <img
          src={is_signature ? iSignature : iImageUploadIcon}
          alt="img"
          className="w-[15px] h-[15px]"
        />
        <span className="text-fs16 font-fw500 text-[#0E1826] overflow-clip max-w-[125px] whitespace-nowrap">{label}</span>
      </div>

     <ImageViewerModal showModal={showModal} setShowModal={setShowModal} url={src} src={src} is_signature={is_signature}/> 
    </div>
  )
}
