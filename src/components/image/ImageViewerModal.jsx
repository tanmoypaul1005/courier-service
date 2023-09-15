import React from 'react';
import { base_url_src } from '../../app/utility/const';
import { iNoImage } from '../../app/utility/imageImports';
import CommonModal from '../modal/CommonModal';
import { useTranslation } from 'react-i18next';


const ImageViewerModal = ({ showModal, setShowModal, src = null, is_signature = false, url }) => {

  const fileExtension = url?.split('.')?.pop()?.toLowerCase();

  const fileType = url?.split('/')[1]?.split(';')[0];

  // Define the known image file extensions
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

  // Define the known PDF file extensions
  const pdfExtensions = ["pdf"];


  const { t } = useTranslation();

  return (
    <>
      <CommonModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={t("Attachment Preview")}
        mainContent={
          <div className='mb-s10'>

            <div className={`mt-s20 w-full flex flex-row justify-center ${is_signature ? 'h-[320px]' : 'h-auto max-h-[90vh]'} `}>

              {imageExtensions.includes(fileExtension) && <img
                src={src ? (base_url_src + src) : iNoImage}
                alt="img"
                className="object-cover "
                onError={(e) => { e.target.onerror = null; e.target.src = iNoImage; }}
              />}
            </div>

            {
              pdfExtensions.includes(fileExtension) && <div className='w-full truncate border-2 border-dashed border-cLightSkyBlue p-s10 rounded-br5'>
                <a
                  href={base_url_src + url}
                  download="Attachment.pdf"
                  target="_blank"
                  rel="noreferrer"
                  alt=""
                  className="text-cLightSkyBlue "
                > Attachment.pdf</a>
              </div>
            }

            {/* {fileType === "pdf" ?
            <div className='w-full truncate border-2 border-dashed border-cLightSkyBlue p-s10 rounded-br5'>
              <a
                href={url}
                download="Example-PDF-document"
                target="_blank"
                rel="noreferrer"
                alt=""
                className="text-cLightSkyBlue "
              > Attachment.pdf</a>
            </div>
              :
              <img
                src={src ? (base_url_src + src) : iNoImage}
                alt="img"
                className="object-cover "
                onError={(e) => { e.target.onerror = null; e.target.src = iNoImage; }}
              />
            } */}
          </div>
        }
      />
    </>
  );
};

export default ImageViewerModal;