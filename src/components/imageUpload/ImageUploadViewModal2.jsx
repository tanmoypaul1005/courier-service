import React from 'react';
import CommonModal from '../modal/CommonModal';
import { useTranslation } from 'react-i18next';
import { base_url_src } from '../../app/utility/const';

const ImageUploadViewModal2 = ({ src, show_modal, setShowModal, url, fileName }) => {

  const { t } = useTranslation();

  const fileExtension = url?.split('.')?.pop()?.toLowerCase();

  const fileType = url?.split('/')[1]?.split(';')[0];

  // Define the known image file extensions
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

  // Define the known PDF file extensions
  const pdfExtensions = ["pdf"];

  return (
    <div>
      <CommonModal
        showModal={show_modal}
        setShowModal={setShowModal}
        modalTitle={t("Attachment Preview")}
        widthClass={fileType === "pdf" ? "min-w-[1000px] max-w-[100px]" : "w-[600px]"}
        mainContent={
          <div className='mt-s20 mb-s10'>
            {
              imageExtensions?.includes(fileExtension) &&
              <img src={src} alt="" className="w-full h-[500px] object-cover" />
            }
            {
              pdfExtensions?.includes(fileExtension) &&
              <div className='w-full truncate border-2 border-dashed border-cLightSkyBlue p-s10 rounded-br5'>
                <a
                  href={base_url_src + url}
                  download="Attachment.pdf"
                  target="_blank"
                  rel="noreferrer"
                  alt=""
                  className="text-cLightSkyBlue "
                >Attachment.pdf </a>
              </div>
            }

            {
              fileType === "pdf" &&
              <div>
                <embed
                  src={url}
                  type="application/pdf"
                  width="100%"
                  height="530px"
                />
              </div>
            }

            {
              fileType === "jpg" || fileType === "jpeg" || fileType === "png" ?
                <img src={src} alt="" className="w-full h-[500px] object-cover" /> : ""
            }

          </div>
        }

      />
    </div>
  );
};

export default ImageUploadViewModal2;

{/* <a
  href={url}
  download={fileName ?? "Attachment.pdf"}
  target="_blank"
  rel="noreferrer"
  className="text-cLightSkyBlue"
  onClick={handleViewPdf}
>
  Attachment.pdf
</a> */}