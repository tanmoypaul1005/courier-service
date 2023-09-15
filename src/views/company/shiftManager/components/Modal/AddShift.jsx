/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useShiftStore, {
  addNewShift, getAllShiftCarsAndDriversList
} from "../../../../../app/stores/company/shiftStore";
import { checkPastTime, getStringFromDateObject, Toastr } from "../../../../../app/utility/utilityFunctions";
import CommonButton from "../../../../../components/button/CommonButton";
import CommonCheckbox from "../../../../../components/input/CommonCheckbox";
import CommonDatePicker from "../../../../../components/input/CommonDatePicker";
import CommonInput from "../../../../../components/input/CommonInput";
import CommonTimePicker from "../../../../../components/input/CommonTimePicker";
import CommonModal from "../../../../../components/modal/CommonModal";
import CommonSelect from "../../../../../components/select/CommonSelect";
import CommonViewComponent from "../../../../../components/viewer/CommonViewComponent";
import { useTranslation } from "react-i18next";

const AddShift = () => {
  const {
    showAddShiftModal,
    setShowAddShiftModal,
    addShiftForm,
    setAddShiftForm,
    setAllShiftCarList,
    setAllShiftDriverList,
    resetAddShiftForm,
    allShiftCarList,
    allShiftDriverList,
    resetFilterFormCopy
  } = useShiftStore();

  const [carDriverChooseMode, setCarDriverChooseMode] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const { t } = useTranslation();

  const resetCarDriverData = () => {
    setAllShiftCarList([]);
    setAllShiftDriverList([]);
  }

  // b    time validation 
  const isTimeValid = (startTime, endTime, startDate = addShiftForm?.start_date, endDate = addShiftForm?.end_date) => {
    // console.log('endDate', endDate);
    const startDateTime = new Date(startDate + 'T' + startTime);

    const endDateTime = new Date(endDate + 'T' + endTime);

    return startDateTime < endDateTime;

  }

  const fetchCarAndDrivers = async () => {
    let validatedTime = await isTimeValid(addShiftForm?.start_time, addShiftForm?.end_time);
    let x;
    if (addShiftForm?.is_maintenance) {
      if (validatedTime) {
        //the loading can be removed from here by sending false as 5th parameter to load the data silently
        x = await getAllShiftCarsAndDriversList(addShiftForm?.start_date, addShiftForm?.end_date, addShiftForm?.start_time, addShiftForm?.end_time, true);
      } else {
        let start_date_next = addShiftForm?.start_date ? new Date(addShiftForm?.start_date) : null;
        start_date_next?.setDate(start_date_next?.getDate() + 1);

        console.log('new gen end date:', getStringFromDateObject(start_date_next ?? new Date()));
        x = await getAllShiftCarsAndDriversList(addShiftForm?.start_date, getStringFromDateObject(start_date_next ?? new Date()), addShiftForm?.start_time, addShiftForm?.end_time, true);
      }
      return;

    } else {
      if (validatedTime) {
        //the loading can be removed from here by sending false as 5th parameter to load the data silently
        x = await getAllShiftCarsAndDriversList(addShiftForm?.start_date, addShiftForm?.end_date, addShiftForm?.start_time, addShiftForm?.end_time, true);
      } else {
        let start_date_next = addShiftForm?.start_date ? new Date(addShiftForm?.start_date) : null;
        start_date_next?.setDate(start_date_next?.getDate() + 1);

        console.log('new gen end date:', getStringFromDateObject(start_date_next ?? new Date()));
        x = await getAllShiftCarsAndDriversList(addShiftForm?.start_date, getStringFromDateObject(start_date_next ?? new Date()), addShiftForm?.start_time, addShiftForm?.end_time, true);
      }
      // console.log('x', x);
      if (x?.cars?.length === 0 || x?.drivers?.length === 0) Toastr({ message: "No car & driver found", type: "warning" });
      return;
    }
  };


  useEffect(() => {
    localStorage.setItem('add_shift_driver_user_id', 0);
    localStorage.setItem('add_shift_comment', '');
  }, []);

  useEffect(() => {
    if (addShiftForm?.is_maintenance && addShiftForm?.start_date && addShiftForm?.end_date && addShiftForm?.start_time && addShiftForm?.end_time) {
      setCarDriverChooseMode(true);
      if (addShiftForm?.car_id && addShiftForm?.car_license_plate_number) setCanSubmit(true);
      else setCanSubmit(false);
    }
    else if (!addShiftForm?.is_maintenance && addShiftForm?.start_date && addShiftForm?.start_time && addShiftForm?.end_time) {
      setCarDriverChooseMode(true);
      if (addShiftForm?.car_id && addShiftForm?.car_license_plate_number && addShiftForm?.driver_user_id) setCanSubmit(true);
      else setCanSubmit(false);
    }
    else setCarDriverChooseMode(false);

  }, [addShiftForm]);


  useEffect(() => {
    let local_comment = localStorage.getItem('add_shift_comment');
    let local_driver_user_id = localStorage.getItem('add_shift_driver_user_id');

    if (addShiftForm?.is_maintenance) {
      setAddShiftForm({ ...addShiftForm, comment: "", driver_user_id: null });
    } else {

      // check if new end date is required
      let validTimeValues = isTimeValid(addShiftForm?.end_time, addShiftForm?.start_time, addShiftForm?.start_date, addShiftForm?.start_date);

      if (!validTimeValues) {
        let end_date_next = addShiftForm?.start_date ? new Date(addShiftForm?.start_date) : null;
        // console.log('222 end_date_next : ', end_date_next);
        end_date_next?.setDate(end_date_next?.getDate() + 1);
        setAddShiftForm({ ...addShiftForm, comment: local_comment, driver_user_id: local_driver_user_id > 0 ? parseInt(local_driver_user_id) : null, end_date: end_date_next });
      } else
        setAddShiftForm({ ...addShiftForm, comment: local_comment, driver_user_id: local_driver_user_id > 0 ? parseInt(local_driver_user_id) : null, end_date: addShiftForm?.start_date });
    }
  }, [addShiftForm?.is_maintenance]);

  return (
    <div>
      <CommonModal
        showModal={showAddShiftModal}
        setShowModal={setShowAddShiftModal}
        onCloseModal={() => {
          console.log("AUTO CLEAR");
          setAddShiftForm({});
          resetCarDriverData();
          localStorage.setItem('add_shift_comment', "");
          localStorage.setItem('add_shift_driver_user_id', 0);
        }}
        modalTitle={
          <div className='flex items-baseline'>
            <div>{t("add shift")}</div>
            <div
              onClick={() => {
                setAddShiftForm({});
                resetCarDriverData();
                localStorage.setItem('add_shift_comment', "");
                localStorage.setItem('add_shift_driver_user_id', 0);
              }}
              className='pl-4 text-base cursor-pointer select-none drop-shadow-sm text-cRed'>{t("Clear")}</div>
          </div>
        }
        mainContent={
          <form
            onClick={() => {

            }}
            onSubmit={(e) => e.preventDefault()}>
            {/* maintenance state selection */}
            <div className="pt-5 flex items-center space-x-2.5 cursor-pointer select-none w-fit">
              <CommonCheckbox
                label={t("in maintenance")}
                checked={addShiftForm?.is_maintenance}
                onChange={() =>
                  setAddShiftForm({ ...addShiftForm, is_maintenance: !addShiftForm?.is_maintenance })
                }
              />
            </div>

            {/*e       date pickers */}
            <div className="grid items-center grid-cols-2 pt-5 gap-7">
              <CommonDatePicker
                label={t("start date")}
                required={true}
                allowPastDate={false}
                value={addShiftForm?.start_date}
                onChange={(date) => {
                  resetCarDriverData();
                  if (!addShiftForm?.is_maintenance)
                    setAddShiftForm({ ...addShiftForm, start_date: getStringFromDateObject(date), end_date: getStringFromDateObject(date), car_id: null, car_license_plate_number: "", driver_user_id: "" });
                  else
                    setAddShiftForm({ ...addShiftForm, start_date: getStringFromDateObject(date), car_id: null, car_license_plate_number: "", driver_user_id: "" });
                }}
                show_asterisk={false}
              />
              {
                addShiftForm?.is_maintenance ? (
                  <CommonDatePicker
                    disabled={addShiftForm?.start_date ? false : true}
                    label={t("end date")}
                    required={addShiftForm?.is_maintenance}
                    startDate={getStringFromDateObject(addShiftForm?.start_date)}
                    value={addShiftForm?.end_date}
                    onChange={(date) => {
                      resetCarDriverData();
                      // if (addShiftForm?.start_time && addShiftForm?.end_time) {
                      //   if (isStartTimeAfterEndTime(addShiftForm?.start_time, addShiftForm?.end_time) && !addShiftForm?.is_maintenance) {
                      //     setAddShiftForm({ ...addShiftForm, end_time: null });
                      //   }
                      // }
                      setAddShiftForm({ ...addShiftForm, end_date: getStringFromDateObject(date), car_id: null, car_license_plate_number: "", driver_user_id: "" });
                    }}
                    show_asterisk={false}
                  />
                ) : (
                  <div></div>
                )}
            </div>

            {/*p     time pickers */}
            <div className="mt-[26px] h-[38px] grid grid-cols-2 items-center gap-7">
              <CommonTimePicker
                heightClass="h-[38px]"
                disabled={addShiftForm?.start_date ? false : true}
                required={true}
                showExtendedTimeUi={false}
                label={t("start time")}
                init_time={addShiftForm?.start_time}
                onChange={(time) => {
                  resetCarDriverData();
                  setAddShiftForm({ ...addShiftForm, start_time: time, car_id: null, car_license_plate_number: "", driver_user_id: "" });
                }}
                show_asterisk={false}
              />


              <CommonTimePicker
                heightClass="h-[38px]"
                required={true}
                disabled={addShiftForm?.start_date ? false : true}
                showExtendedTimeUi={false}
                label={t("end time")}
                init_time={addShiftForm?.end_time}
                onChange={(time) => {
                  resetCarDriverData();
                  console.log("CHANGED !");

                  if (!isTimeValid(addShiftForm?.start_time, time)) {
                    let start_date_next = addShiftForm?.start_date ? new Date(addShiftForm?.start_date) : null;
                    start_date_next?.setDate(start_date_next?.getDate() + 1);

                    setAddShiftForm({ ...addShiftForm, end_time: time, end_date: getStringFromDateObject(start_date_next ?? new Date()), car_id: null, car_license_plate_number: "", driver_user_id: "" });
                    console.log('88888 auto generating end_date', addShiftForm);

                    console.log('88888 new end_date DONE: ', getStringFromDateObject(start_date_next));
                  } else {
                    console.log('88888 valid timing, no date change required !');
                    if (isTimeValid(addShiftForm?.start_time, time, addShiftForm?.start_date, addShiftForm?.start_date))
                      setAddShiftForm({ ...addShiftForm, end_time: time, end_date: addShiftForm?.start_date, car_id: null, car_license_plate_number: "", driver_user_id: "" });
                    else
                      setAddShiftForm({ ...addShiftForm, end_time: time, car_id: null, car_license_plate_number: "", driver_user_id: "" });
                  }
                }}
                show_asterisk={false}
              />
            </div>

            {/*v           dropdowns          */}
            <div onClick={() => { if (!allShiftCarList?.length || !allShiftDriverList?.length) fetchCarAndDrivers() }}
              className={`${(!allShiftCarList?.length || !allShiftDriverList?.length) ? "pt-4" : "mt-[18px]"} grid grid-cols-2 items-center gap-7`}>
              {(!allShiftCarList?.length || !allShiftDriverList?.length) ?
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
                      labelText={!addShiftForm?.is_maintenance ? t("select driver") : t("select driver")}
                    />
                  </div>

                </>
                :
                <>
                  <div className="mb-5">
                    <CommonSelect
                      disabled={carDriverChooseMode ? false : true}
                      required={true}
                      label={t("select car / license plate")}
                      dataArray={allShiftCarList}
                      value={addShiftForm?.car_license_plate_number}
                      onChange={(e) => {
                        let car_id_found = allShiftCarList.find((car) => car.value === e.target.value);
                        console.log('car_id_found', car_id_found?.id);
                        setAddShiftForm({ ...addShiftForm, car_id: parseInt(car_id_found?.id), car_license_plate_number: e.target.value });
                      }}
                      show_asterisk={false}
                    />
                  </div>

                  <div className="mb-5">
                    <CommonSelect
                      disabled={!addShiftForm?.is_maintenance && carDriverChooseMode ? false : true}
                      required={!addShiftForm?.is_maintenance}
                      label={t("select driver")}
                      dataArray={allShiftDriverList}
                      value={addShiftForm?.is_maintenance ? null : addShiftForm?.driver_user_id}
                      onChange={(e) => {
                        localStorage.setItem('add_shift_driver_user_id', e.target.value);
                        setAddShiftForm({ ...addShiftForm, driver_user_id: e.target.value });
                      }}
                      show_asterisk={false}
                    />
                  </div>
                </>
              }
            </div>

            {/*g    comments  */}
            <div className="-mt-1">
              <CommonInput
                disabled={addShiftForm?.is_maintenance}
                required={!addShiftForm?.is_maintenance}
                textarea={true}
                max_input={255}
                labelText={t("Shift Instruction")}
                value={addShiftForm?.is_maintenance ? '' : addShiftForm?.comment}
                onChange={(e) => {
                  if (e.target.value !== " ") {
                    localStorage.setItem('add_shift_comment', e.target.value);
                    setAddShiftForm({ ...addShiftForm, comment: e.target.value });
                  }
                }}
                show_asterisk={false}
              />
            </div>

            {/* submit form */}
            <div className="flex flex-row-reverse pt-10">
              <CommonButton
                type="submit"
                // isDisabled={!canSubmit}
                btnLabel={t("add shift")}
                onClick={async () => {
                  //time validations.
                  if (checkPastTime(addShiftForm?.start_time, addShiftForm?.start_date)) {
                    return Toastr({ message: t("Start Time: Past Time not allowed.") });
                  }


                  let x = addShiftForm;
                  if (addShiftForm?.start_time && (addShiftForm?.start_time > addShiftForm?.end_time)) {
                    const date = new Date(addShiftForm?.start_date);
                    date.setDate(date.getDate() + 1);
                    await setAddShiftForm({ ...addShiftForm, end_date: date.toISOString().slice(0, 10) });
                    x = { ...x, end_date: date.toISOString().slice(0, 10) }
                  }

                  if (addShiftForm?.start_date && addShiftForm?.end_date && addShiftForm?.start_time && addShiftForm?.end_time) {
                    if (addShiftForm?.is_maintenance) {
                      let addSuccess = await addNewShift(x);
                      if (addSuccess) {
                        resetAddShiftForm();
                        await resetFilterFormCopy();
                        setShowAddShiftModal(false);
                      }
                    } else if (!addShiftForm?.is_maintenance && addShiftForm?.car_license_plate_number && addShiftForm?.driver_user_id && addShiftForm?.comment) {
                      let addSuccess = await addNewShift(x);
                      if (addSuccess) {
                        localStorage.setItem('add_shift_driver_user_id', 0);
                        localStorage.setItem('add_shift_comment', '');
                        resetAddShiftForm();
                        await resetFilterFormCopy();
                        setShowAddShiftModal(false);
                      }
                    } else Toastr({ message: t("Please fill up all required fields") })
                  }
                }}
              />
            </div>
          </form>
        }
      />
    </div>
  );
};

export default AddShift;
