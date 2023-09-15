/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Draggable from 'react-draggable';
import { iSlideRight } from "../../app/utility/imageImports";
import { useTranslation } from "react-i18next";

const SlideToSubmit = ({ width = 500, onSubmission = () => { } }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [submittedData, setSubmittedData] = useState(false);

    let rightMax = width - 60;

    const { t } = useTranslation();

    const trackPos = (data) => {
        setPosition({ x: data.x, y: 0 });
    };

    const ResetPositionSmooth = (xPosition) => {
        // console.log("ResetPositionSmooth", xPosition);
        let counter = xPosition;

        var interval = setInterval(function () {
            // console.log("counter::", counter);
            // console.log("xPosition::", xPosition);
            setPosition({ x: counter, y: 0 });
            counter = counter - 15;
            if (counter <= 1) {
                setPosition({ x: 0, y: 0 });
                clearInterval(interval);
            }
            return;
        }, 15)
    }

    return (
        <div style={{ width: width }} className={` ring-2 ${rightMax === position?.x ? "ring-cMainBlue" : "ring-cMainBlue"}  rounded-full relative h-[56px]`}>

    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 limadi-medium" >{t("Slide to Submit")}</div>
            <Draggable
                onDrag={(e, data) => { if (data?.x <= rightMax) setPosition({ x: data.x, y: 0 }) }}
                onStop={(e, data) => {
                    trackPos(data);
                    // console.log("DATA: ", data);
                    if (rightMax !== data?.x) {
                        ResetPositionSmooth(data?.x)

                        setSubmittedData(false);
                        onSubmission(false);
                    } else onSubmission(true);
                }}
                bounds={{ left: 0, top: -20, right: rightMax, bottom: 0 }}
                disabled={rightMax === position?.x ? true : false}
                defaultPosition={{ x: 40, y: 0 }}
                // axis="x"
                position={position}
            >
                <div className="box">
                    <div className={`flex items-center justify-center bg-cMainBlue py-2.5 px-4 rounded-full text-white space-x-2 h-[44px] w-[44px]`}>                        
                        <img src={iSlideRight} alt="" />
                    </div>
                </div>
            </Draggable>

        </div >
    );
};

export default SlideToSubmit