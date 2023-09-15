import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { iCrossWhite } from "../../app/utility/imageImports";


const CommonModal = ({
    modalSpace = false,
    modalOnHide = () => { },        // modalOnHide is a function that will be called when the modal is closed. [ This is an optional parameter. ]
    heightMax = "",
    showModal,
    setShowModal,
    onCloseModal = () => { },            //do something when the modal is closed
    mainContent,
    modalTitle,
    customClose,
    subTitle = "",
    singleButton,
    primaryActionButton,
    secondaryActionButton,
    useAutoClose = true,
    withPaddingY = false,
    widthClass = "w-full md:w-[60vw] lg:w-[55vw] xl:w-[50vw] 2xl:w-[45vw]",
}) => {
    return (
        <div>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="overflow-y-auto fixed inset-0 z-[1004]"
                    onClose={() => {
                        setShowModal(false);
                        onCloseModal();
                    }}
                >
                    <div
                        className={`
                        px-4 min-h-screen text-center opacity-100 bg-cModalDropBg backdrop-blur-sm
                        ${withPaddingY ? 'py-10' : 'py-0'}
                    `}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            afterLeave={() => modalOnHide()}
                        >
                            <div
                                className={` inline-block p-5 text-left align-middle bg-white rounded-lg shadow-xl opacity-100 transition-all transform gs-text-main-black ${widthClass} ${heightMax} `}
                            >
                                <div
                                    onClick={() => {
                                        setShowModal(false);
                                        onCloseModal();
                                    }}
                                    className="absolute top-2 right-2 cursor-pointer p-2 z-50"
                                >
                                    {customClose ?
                                        <img src={customClose} alt="" className="" />
                                        : <img className="p-1 bg-cRed rounded-full h-5 w-5" src={iCrossWhite} alt="" />
                                    }
                                </div>
                                <div className="flex relative flex-col justify-between">

                                    {modalTitle ? <div className="capitalize title">
                                        {modalTitle}
                                    </div> : ""}


                                    <div className="sub-title">{subTitle}</div>
                                </div>
                                {mainContent}
                                {singleButton ? (
                                    <div
                                        onClick={() => {
                                            if (useAutoClose) {
                                                setShowModal(false);
                                            }
                                        }}
                                        className="flex justify-center items-center mx-auto w-fit"
                                    >
                                        {singleButton}
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="flex justify-between items-center">
                                    <div onClick={() => setShowModal(false)}>
                                        {secondaryActionButton}
                                    </div>
                                    <div
                                        onClick={() => {
                                            if (useAutoClose) {
                                                setShowModal(false);
                                            }
                                        }}
                                    >
                                        {primaryActionButton}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default CommonModal;
