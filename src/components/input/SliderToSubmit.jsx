import React, { useEffect } from 'react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SliderToSubmit = ({ onSubmission = () => { } }) => {
    const [rangeValue, setRangeValue] = useState(0);
    const [showMessage, setShowMessage] = useState(true);
    const { t } = useTranslation();

    const ResetPositionSmooth = (valueRange) => {
        // console.log("ResetPositionSmooth", valueRange);
        let counter = valueRange;

        var interval = setInterval(function () {
            // console.log("counter::", counter);
            // console.log("valueRange::", valueRange);
            setRangeValue(counter);
            counter = counter - 15;
            if (counter <= 1) {
                setRangeValue(0);
                clearInterval(interval);
            }
            return;
        }, 15)
    }

    useEffect(() => {
        if (parseInt(rangeValue) === 1000) {
            console.log('SUCCESS !!!!');
            onSubmission(true);
        }

        if (rangeValue > 0 && rangeValue < 1000) {
            setShowMessage(false);
            onSubmission(false);
        } else {
            setShowMessage(true);
        }

    }, [rangeValue]);

    return (
        <div className='relative h-s55'>
            <input
                className='slider'
                onMouseUp={(e) => {
                    if (rangeValue < 1000) ResetPositionSmooth(rangeValue);
                }}
                type="range"
                min="0"
                max="1000"
                value={rangeValue}
                onChange={(e) => {
                    // console.log(e.target.value);
                    setRangeValue(e.target.value);
                }}
            />
            {showMessage ? <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">{t("Slide to submit")}</div> : ""}
        </div>
    )
}

export default SliderToSubmit