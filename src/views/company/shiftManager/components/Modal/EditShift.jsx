/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useShiftStore, { getAllShiftCarsAndDriversList, updateShift } from '../../../../../app/stores/company/shiftStore';
import { Toastr, checkPastTime, formatTimeHourMinutes, forwardDate, getStringFromDateObject } from '../../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../../components/button/CommonButton';
import CommonCheckbox from '../../../../../components/input/CommonCheckbox';
import CommonDatePicker from '../../../../../components/input/CommonDatePicker';
import CommonInput from '../../../../../components/input/CommonInput';
import CommonTimePicker from '../../../../../components/input/CommonTimePicker';
import CommonModal from '../../../../../components/modal/CommonModal';
import CommonSelect from '../../../../../components/select/CommonSelect';
import CommonViewComponent from '../../../../../components/viewer/CommonViewComponent';
import { useTranslation } from 'react-i18next';

const EditShift = () => {
    const [reset_car_driver_data, setResetCarDriverData] = useState(false);

    const { t } = useTranslation();

    const {
        showEditShiftModal,
        setShowEditShiftModal,
        shiftUpdateData,
        setShiftUpdateData,
        allShiftDriverList,
        allShiftCarList,
        shiftDetailsData,
        changeShiftUpdateData,
    } = useShiftStore();


    // b    date/time validation 
    const isTimeValid = (startTime, endTime, startDate = shiftUpdateData?.start_date, endDate = shiftUpdateData?.end_date) => {
        // Combine the start date and time into a single Date object
        const startDateTime = new Date(startDate + 'T' + startTime);

        // Combine the end date and time into a single Date object
        const endDateTime = new Date(endDate + 'T' + endTime);

        // Check if the start date/time is before the end date/time  
        return startDateTime < endDateTime;
    }

    const fetchCarAndDrivers = async () => {
        console.log('xyz', shiftUpdateData?.is_maintenance, reset_car_driver_data);
        let validatedTime = await isTimeValid(shiftUpdateData?.start_time, shiftUpdateData?.end_time);
        let x;
        if (shiftUpdateData?.is_maintenance) {
            if (validatedTime) {
                //the loading can be removed from here by sending false as 5th parameter to load the data silently
                x = await getAllShiftCarsAndDriversList(shiftUpdateData?.start_date, shiftUpdateData?.end_date, shiftUpdateData?.start_time, shiftUpdateData?.end_time, true, 1, shiftDetailsData?.id);
            } else {
                let start_date_next = shiftUpdateData?.start_date ? new Date(shiftUpdateData?.start_date) : null;
                start_date_next?.setDate(start_date_next?.getDate() + 1);

                console.log('new gen end date:', getStringFromDateObject(start_date_next ?? new Date()));
                x = await getAllShiftCarsAndDriversList(shiftUpdateData?.start_date, getStringFromDateObject(start_date_next ?? new Date()), shiftUpdateData?.start_time, shiftUpdateData?.end_time, true, 1, shiftDetailsData?.id);
            }
            return;

        } else {
            if (validatedTime) {
                //the loading can be removed from here by sending false as 5th parameter to load the data silently
                x = await getAllShiftCarsAndDriversList(shiftUpdateData?.start_date, shiftUpdateData?.end_date, shiftUpdateData?.start_time, shiftUpdateData?.end_time, true, 1, shiftDetailsData?.id);
            } else {
                let start_date_next = shiftUpdateData?.start_date ? new Date(shiftUpdateData?.start_date) : null;
                start_date_next?.setDate(start_date_next?.getDate() + 1);

                console.log('new gen end date:', getStringFromDateObject(start_date_next ?? new Date()));
                x = await getAllShiftCarsAndDriversList(shiftUpdateData?.start_date, getStringFromDateObject(start_date_next ?? new Date()), shiftUpdateData?.start_time, shiftUpdateData?.end_time, true, 1, shiftDetailsData?.id);
            }
            // console.log('x', x);
            if (x?.cars?.length === 0 || x?.drivers?.length === 0) Toastr({ message: "No car & driver found", type: "warning" });
            else setResetCarDriverData(false);
            return;
        }
    };

    const defineEndDate = async (start_date, start_time, end_time) => {

        if (start_date && start_time && end_time) {
            console.log('shift update data', shiftUpdateData);
            console.log('here', start_time, end_time);
            if (start_time < end_time) {
                const x = start_date
                await changeShiftUpdateData('end_date', x);
                console.log('end_date1', x);
                return;
            }
            if (start_time >= end_time) {
                const x = forwardDate(start_date);
                await changeShiftUpdateData('end_date', x);
                console.log('end_date2', x);
                return;
            }
        }
    }

    useEffect(() => {
        if (parseInt(shiftUpdateData?.is_maintenance))
            setShiftUpdateData({ ...shiftUpdateData, comment: "", driver_user_id: null });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shiftUpdateData?.is_maintenance]);

    useEffect(() => {
        if (showEditShiftModal) {
            setShiftUpdateData({
                id: shiftDetailsData?.id,
                driver_user_id: shiftDetailsData?.driver_user_id,
                car_id: shiftDetailsData?.car_id,
                car_license_plate_number: shiftDetailsData?.car?.car_license_plate_number,
                start_date: shiftDetailsData?.start_date,
                end_date: shiftDetailsData?.end_date,

                start_time: formatTimeHourMinutes(shiftDetailsData?.start_time),
                end_time: formatTimeHourMinutes(shiftDetailsData?.end_time),

                comment: shiftDetailsData?.comment,
                is_maintenance: shiftDetailsData?.is_maintenance,
            });
            setResetCarDriverData(false);
        }
    }, [showEditShiftModal]);

    return (
        <div>
            <CommonModal
                showModal={showEditShiftModal}
                setShowModal={setShowEditShiftModal}
                modalTitle={t('edit shift')}
                mainContent={
                    <form onSubmit={(e) => e.preventDefault()}>

                        {/*l         maintenance state selection */}
                        <div className="py-5 flex items-center space-x-2.5 cursor-pointer select-none w-fit">
                            <CommonCheckbox
                                label={t('in maintenance')}
                                checked={parseInt(shiftUpdateData?.is_maintenance) === 1 ? true : false}
                                onChange={async (e) => {
                                    await changeShiftUpdateData('is_maintenance', parseInt(shiftUpdateData?.is_maintenance) === 0 ? 1 : 0);
                                    console.log('is_maintenance', parseInt(shiftUpdateData?.is_maintenance));
                                }}
                            />
                        </div>

                        {/*e      date pickers */}
                        <div className="pb-[26px] grid grid-cols-2 items-center gap-7">
                            <CommonDatePicker
                                label={t('start date')}
                                required={true}
                                value={shiftUpdateData?.start_date}
                                onChange={async (date) => {
                                    if (isTimeValid(shiftUpdateData?.start_time, shiftUpdateData?.end_time, getStringFromDateObject(date), shiftUpdateData?.end_date))
                                        await setShiftUpdateData({ ...shiftUpdateData, start_date: getStringFromDateObject(date) });
                                    else
                                        await setShiftUpdateData({ ...shiftUpdateData, start_date: getStringFromDateObject(date), end_date: getStringFromDateObject(date) });

                                    setResetCarDriverData(true);
                                    defineEndDate(getStringFromDateObject(date), shiftUpdateData?.start_time, shiftUpdateData?.end_time);
                                }}
                                show_asterisk={false}
                                allowPastDate={false}

                            />
                            {
                                parseInt(shiftUpdateData?.is_maintenance) ?
                                    <CommonDatePicker
                                        label={t('end date')}
                                        required={parseInt(shiftUpdateData?.is_maintenance) ? true : false}
                                        value={shiftUpdateData?.end_date}
                                        onChange={(date) => {
                                            setShiftUpdateData({ ...shiftUpdateData, end_date: getStringFromDateObject(date) })
                                            setResetCarDriverData(true);
                                        }}
                                        show_asterisk={false}
                                        allowPastDate={false}
                                    />
                                    : <div></div>}
                        </div>

                        {/*p      time pickers */}
                        <div className="pb-[15px] grid grid-cols-2 items-center gap-7">
                            <CommonTimePicker
                                showExtendedTimeUi={false}
                                label={t('start time')}
                                required={true}
                                init_time={formatTimeHourMinutes(shiftUpdateData?.start_time)}
                                onChange={(time) => {
                                    setShiftUpdateData({ ...shiftUpdateData, start_time: time });
                                    setResetCarDriverData(true);
                                    defineEndDate(shiftUpdateData?.start_date, time, shiftUpdateData?.end_time);
                                }}
                                show_asterisk={false}
                            />
                            <CommonTimePicker
                                showExtendedTimeUi={false}
                                required={true}
                                label={t('end time')}
                                init_time={formatTimeHourMinutes(shiftUpdateData?.end_time)}
                                onChange={(time) => {
                                    setShiftUpdateData({ ...shiftUpdateData, end_time: time });
                                    setResetCarDriverData(true);
                                    defineEndDate(shiftUpdateData?.start_date, shiftUpdateData?.start_time, time);
                                }}
                                show_asterisk={false}
                            />
                        </div>

                        <div onClick={() => {
                            if (reset_car_driver_data && !parseInt(shiftUpdateData?.is_maintenance)) fetchCarAndDrivers()
                        }}
                            className={`${(reset_car_driver_data || parseInt(shiftUpdateData?.is_maintenance)) ? "pt-0" : "mb-[35px]"} grid grid-cols-2 items-center gap-7`}>
                            {
                                (reset_car_driver_data || parseInt(shiftUpdateData?.is_maintenance)) ?
                                    <>

                                        <div className="pt-[18px]">
                                            <CommonViewComponent
                                                selectComponent={true}
                                                disabled={true}
                                                labelText={t("select car / license plate")}
                                            />
                                        </div>
                                        <div className="pt-[18px]">
                                            <CommonViewComponent
                                                selectComponent={true}
                                                disabled={true}
                                                labelText={t("select driver")}
                                            />
                                        </div>

                                    </>
                                    :
                                    <>
                                        <CommonSelect
                                            showExtendedTimeUi={false}
                                            label={t('select car / license plate')}
                                            dataArray={allShiftCarList}
                                            required={true}
                                            value={shiftUpdateData?.car_license_plate_number}
                                            onChange={(e) => {
                                                let car_id_found = allShiftCarList?.find((car) => car?.value === e.target.value);
                                                console.log('car_id_found', car_id_found?.id);
                                                setShiftUpdateData({ ...shiftUpdateData, car_id: parseInt(car_id_found?.id), car_license_plate_number: e.target.value });
                                            }}
                                            show_asterisk={false}
                                        />

                                        <CommonSelect
                                            showExtendedTimeUi={false}
                                            label={t('select driver')}
                                            disabled={parseInt(shiftUpdateData?.is_maintenance) ? true : false}
                                            required={parseInt(shiftUpdateData?.is_maintenance) ? false : true}
                                            dataArray={allShiftDriverList}
                                            value={shiftUpdateData?.driver_user_id}
                                            onChange={(e) => setShiftUpdateData({ ...shiftUpdateData, driver_user_id: e.target.value })}
                                            show_asterisk={false}
                                        />
                                    </>}
                        </div>


                        {/*g         textarea */}
                        <div className="">
                            <CommonInput
                                textarea={true}
                                max_input={255}
                                labelText={t('Shift Instruction')}
                                disabled={parseInt(shiftUpdateData?.is_maintenance) ? true : false}
                                required={parseInt(shiftUpdateData?.is_maintenance) ? false : true}
                                value={shiftUpdateData?.comment ?? ""}
                                onChange={(e) => {
                                    if (e.target.value !== " ") {
                                        const trimmedValue = e.target.value.replace(/\s+/g, " ");
                                        setShiftUpdateData({ ...shiftUpdateData, comment: trimmedValue })
                                    }
                                }}
                                show_asterisk={false}
                            />
                        </div>

                        {/*y         submit form */}
                        <div className="flex flex-row-reverse pt-10">
                            <CommonButton
                                type='submit'
                                btnLabel={t('save changes')}
                                onClick={async () => {
                                    console.log('shiftUpdateData : ', shiftUpdateData);
                                    let updateSuccess;

                                    if (checkPastTime(shiftUpdateData?.start_time, shiftUpdateData?.start_date)) {
                                        return Toastr({ message: t("Start Time: Past Time not allowed.") });
                                    }

                                    let x = shiftUpdateData;
                                    if (shiftUpdateData?.start_time && (shiftUpdateData?.start_time > shiftUpdateData?.end_time)) {
                                        const date = new Date(shiftUpdateData?.start_date);
                                        date.setDate(date.getDate() + 1);
                                        await setShiftUpdateData({ ...shiftUpdateData, end_date: date.toISOString().slice(0, 10) });
                                        x = { ...x, end_date: date.toISOString().slice(0, 10) }
                                    }

                                    if (shiftUpdateData?.start_date && shiftUpdateData?.end_date && shiftUpdateData?.start_time && shiftUpdateData?.end_time && shiftUpdateData?.car_license_plate_number) {
                                        if (parseInt(shiftUpdateData?.is_maintenance) !== 1 && shiftUpdateData?.driver_user_id && shiftUpdateData?.comment)
                                            updateSuccess = await updateShift(x, shiftDetailsData?.id);
                                        else if (parseInt(shiftUpdateData?.is_maintenance) === 1)
                                            updateSuccess = await updateShift(x, shiftDetailsData?.id);
                                    }

                                    // updateSuccess = await updateShift(shiftUpdateData, shiftDetailsData?.id);

                                    if (updateSuccess) {
                                        setShowEditShiftModal(false);
                                    }
                                }} />
                        </div>
                    </form>
                }
            />
        </div>
    )
}

export default EditShift