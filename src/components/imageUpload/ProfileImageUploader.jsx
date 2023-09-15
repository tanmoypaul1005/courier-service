import React, { useRef, useState } from "react";
import { base_url_src } from "../../app/utility/const";
import { iImageUploader, iNoProfileImg, iUserAvatar } from "../../app/utility/imageImports";

import { Toastr } from '../../app/utility/utilityFunctions';

export default function ProfileImageUploader({
    setImage,
    FileData,
    onChange = () => { },
    finalBase64 = () => { },
    iImage = "",
    imageUploader,
    imageName = "",
    rounded = true,
    editMode = true,
    height = 'h-[144px]',
    width = 'w-[144px]',
    dummyImage=iUserAvatar

}) {

    const [tempImage, setTempImage] = useState();

    const [hoverImage, setHoverImage] = useState(false);

    const inputFile = useRef(null);

    const onButtonClick = () => inputFile.current.click();

    const onChangeFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];

        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {

            var image = new Image();
            var reader = new FileReader();
            reader.onloadend = async function () {
                setTempImage(reader.result);
                finalBase64(reader.result);
                (await FileData) && FileData("icon", reader.result);
                (await imageUploader) && imageUploader(imageName, reader.result);
                (await setImage) && setImage(reader.result);

                //console.log("reader.result: ", reader.result);
            };
            reader.onload = (event) => {
                //setTempImage(reader.result);
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
            setHoverImage(false);
            onChange(file);

        } else {
            Toastr({ message: "Invalid file type. Only jpeg and png and jpg files are allowed.", type: "warning" })
        }
    };

    return (
        <>
            <div className="relative">
                <div
                    onMouseEnter={() => {
                        setHoverImage(true);
                    }}
                    onMouseLeave={() => {
                        setHoverImage(false);
                    }} className={`${rounded ? `${height}` : `${height}`}  ${rounded ? `${width}` : "w-[400px]"}${rounded ? "rounded-full" : "rounded-br10"}  
                     bg-cBackgroundAndCategory overflow-hidden select-none relative `}
                >
                    <input
                        onChange={onChangeFile.bind(this)}
                        type="file"
                        id="file"
                        ref={inputFile}
                        style={{ display: "none" }}
                    />

                    <div
                        // style={{filter: 'brightness(40%)'}}
                        className="">
                        <img
                            onClick={editMode && onButtonClick}
                            className={`border-2 border-cDisable rounded-full cursor-pointer ${ editMode && hoverImage? 'brightness-50' : 'brightness-100'}
                          ${rounded ? `${height}` : `${height}`}  ${rounded ? `${width}` : "w-[400px]"}
                          ${rounded ? "rounded-full" : "rounded-br10"}
                          bg-cBackgroundAndCategory overflow-hidden select-none relative object-cover`}
                            src={tempImage ? tempImage : base_url_src + iImage}
                            alt="profile-pic"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = dummyImage;
                            }}
                        />
                    </div>
                </div>
                { hoverImage && editMode ? <div
                        onClick={editMode && onButtonClick}
                        className={`cursor-pointer pointer-events-none absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`}>
                    <img
                        src={iImageUploader}
                        alt="upload a pic"
                        className="w-[34px]  z-20 "
                    />
                </div> : ''}
            </div>
        </>
    );
}
