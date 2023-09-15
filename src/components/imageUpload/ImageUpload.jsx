/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { Toastr } from "../../app/utility/utilityFunctions";
import { iImageUploadIcon, iRedCancel } from "../../app/utility/imageImports";
import ImageUploadViewModal2 from "./ImageUploadViewModal2";
import { base_url_src } from "../../app/utility/const";
import { useTranslation } from "react-i18next";

export default function ImageUpload({
    setImage,
    FileData,
    onChange = () => { },
    finalBase64 = () => { },
    imageUploader,
    imageName = "",
    image_url = null,
    src,
    setSrc,
}) {
    const [show_modal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState("Attachment.pdf");
    const [can_upload, setCanUpload] = useState(false);
    const { t } = useTranslation();

    const inputFile = useRef(null);

    const onButtonClick = () => inputFile.current.click();

    const onChangeFile = (event) => {
        var file = event.target.files[0];
        setFileName(file?.name)
        console.log("file.type",URL.createObjectURL(file))
        if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
            event.stopPropagation();
            event.preventDefault();
            //console.log("reader.result: ", event.target.files[0].name);
            var image = new Image();
            var reader = new FileReader();
            reader.onloadend = async function () {
                setSrc(reader.result);
                finalBase64(reader.result);
                (await FileData) && FileData("icon", reader.result);
                (await imageUploader) && imageUploader(imageName, reader.result);
                (await setImage) && setImage(reader.result);
                setCanUpload(false);
                // console.log("reader.result: ", reader.result);
            };
            reader.onload = (event) => {
                image.src = event.target.result;
            };

            reader.readAsDataURL(file);
            onChange(file);
        } else {
            Toastr({ message: t("Invalid file type. only jpeg and Png and jpg files are allowed."), type: "warning" });
        }
    };



    return (
        <div className="">
            {((src || image_url) && !can_upload) ? (
                <div className="border bg-cMainWhite w-[150px] h-[45px] flex justify-center rounded-br4 border-cMainBlue">
                    <input
                        onChange={onChangeFile.bind(this)}
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{ display: "none" }}
                    />

                    <div
                        onClick={() => {
                            if ((src || image_url) && !can_upload) {
                                setShowModal(true)
                            } else { onButtonClick() }
                        }
                        }
                        className="cursor-pointer flex justify-center items-center"
                    >
                        <span className="text-fs16 font-fw500 text-[#0E1826] mx-s5">{t('Attachment')} </span>

                    </div>

                    <div className="cursor-pointer flex justify-center items-center text-center">

                        <img onClick={() => {
                            setSrc(null);
                            setCanUpload(true);
                        }}
                            className="w-[20px] h-[20px] " src={iRedCancel} alt="" />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="border-2 bg-cMainWhite w-[150px] h-[45px] flex justify-center rounded-br4">
                        <input
                            onChange={onChangeFile.bind(this)}
                            type="file"
                            id="file"
                            ref={inputFile}
                            style={{ display: "none" }}
                        />

                        <div
                            onClick={onButtonClick}
                            className="cursor-pointer flex justify-center items-center text-center"
                        >
                            <span className="text-fs16 font-fw500 text-[#0E1826] mr-s5"></span>{t('Attachment')}
                            <img
                                src={iImageUploadIcon}
                                alt="upload a pic"
                                className="w-[15px] h-[15px] ml-s5"
                            />
                        </div>
                    </div>

                </div>
            )}

            <ImageUploadViewModal2 fileName={fileName} show_modal={show_modal} setShowModal={setShowModal} url={src ?? image_url} src={src ?? (base_url_src + image_url)} />
        </div>
    );
}