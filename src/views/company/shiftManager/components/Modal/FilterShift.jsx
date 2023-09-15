import React from 'react';
import useShiftStore, { getAllShiftList } from '../../../../../app/stores/company/shiftStore';
import { getStringFromDateObject, removeEmpty } from '../../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../../components/button/CommonButton';
import CommonCheckbox from '../../../../../components/input/CommonCheckbox';
import CommonDatePicker from '../../../../../components/input/CommonDatePicker';
import CommonTimePicker from '../../../../../components/input/CommonTimePicker';
import CommonModal from '../../../../../components/modal/CommonModal';
import CommonSelect from '../../../../../components/select/CommonSelect';
import { useTranslation } from 'react-i18next';

const FilterShift = () => {
    const {
        showFilterShiftModal,
        setShowFilterShiftModal,
        filterShiftList,
        setFilterShiftList,
        filterShiftCarList,
        filterShiftDriverList,
        selectedDriver,
        setSelectedDriver,
        setShiftFilterMode,
        shiftFilterMode,
    } = useShiftStore();

    const { t } = useTranslation ();

    return (
        <div>
            <CommonModal
                showModal={showFilterShiftModal}
                setShowModal={setShowFilterShiftModal}
                onCloseModal={() => {
                    if (shiftFilterMode) {
                        setSelectedDriver(JSON.parse(localStorage.getItem('filter_shift_driver_temp')));
                        setFilterShiftList(JSON.parse(localStorage.getItem('filter_shift_temp')));
                    }
                }}
                modalTitle={
                    <div className='flex items-baseline'>
                        <div
                            onClick={() => {
                                console.log("DATA",
                                    JSON.parse(localStorage.getItem('filter_shift_driver_temp')),
                                    JSON.parse(localStorage.getItem('filter_shift_temp'))
                                );
                            }}
                        >{t('filter shift')}</div>
                        <div
                            onClick={() => {
                                console.log("CLEARING FILTERS WITHOUT SEARCH BOX .....");

                                localStorage.setItem('filter_shift_temp', JSON.stringify(filterShiftList));
                                localStorage.setItem('filter_shift_driver_temp', JSON.stringify(selectedDriver));

                                setSelectedDriver(''); //as we are maintaining the driver value separately from the main filter object
                                setFilterShiftList({
                                    start_date: null,
                                    start_time: null,
                                    end_date: null,
                                    end_time: null,
                                    plate_number: "",
                                    driver_name: "",
                                    is_maintenance: null,
                                    search: filterShiftList?.search,
                                });
                                // setShiftFilterMode(false);
                            }}
                            className='cursor-pointer select-none drop-shadow-sm text-base text-cRed pl-4'>{t("Clear")}</div>
                    </div>
                }
                mainContent={
                    <form
                        onClick={() => {
                            // console.log('car list', allShiftCarList);
                            // console.log('driver list', allShiftDriverList);
                            console.log('filterShiftList', filterShiftList);
                        }}
                        onSubmit={(e) => e.preventDefault()}>

                        {/* date pickers */}
                        <div className="pt-5 grid grid-cols-2 items-center gap-7">
                            <CommonDatePicker
                                value={filterShiftList?.start_date}
                                onChange={(date) => { setFilterShiftList({ ...filterShiftList, start_date: getStringFromDateObject(date) }) }}
                                label={t('start date')}
                            />

                            <CommonDatePicker
                                // disabled={filterShiftList?.start_date ? false : true}
                                startDate={filterShiftList?.start_date}
                                value={filterShiftList?.end_date}
                                onChange={(date) => { setFilterShiftList({ ...filterShiftList, end_date: getStringFromDateObject(date) }) }}
                                label={t('end date')}
                            />
                        </div>

                        {/* time pickers */}
                        <div className="pt-[26px] grid grid-cols-2 items-center gap-7">
                            <CommonTimePicker init_time={filterShiftList?.start_time} onChange={(date) => { setFilterShiftList({ ...filterShiftList, start_time: date }) }} showExtendedTimeUi={false} label={t('start time')} />
                            <CommonTimePicker init_time={filterShiftList?.end_time} onChange={(date) => { setFilterShiftList({ ...filterShiftList, end_time: date }) }} showExtendedTimeUi={false} label={t('end time')} />
                        </div>

                        {/*b        select dropdowns */}
                        <div className="pt-4 grid grid-cols-2 items-center gap-7">

                            <CommonSelect
                                subTitle={filterShiftCarList?.length > 0 ? t('select car / license plate') : t('No car found')}
                                value={filterShiftList?.plate_number}
                                onChange={(e, title) => {

                                    console.log('selected car', e, ', title: ', title);

                                    setFilterShiftList({ ...filterShiftList, plate_number: e.target.value });
                                }}
                                label={t('select car / license plate')}
                                dataArray={filterShiftCarList}
                            />

                            <CommonSelect
                                value={selectedDriver}
                                onChange={(e, title) => {

                                    console.log('selected driver', e.target.value, ', title: ', title);
                                    setSelectedDriver(e.target.value);
                                    setFilterShiftList({ ...filterShiftList, driver_name: title })
                                }}
                                label={t('select driver')}
                                subTitle={filterShiftDriverList?.length > 0 ? t('select driver') : t('No driver found')}
                                dataArray={filterShiftDriverList}
                            />
                        </div>

                        {/* status and maintenance state selection */}
                        <div className="pt-[35px] flex items-baseline justify-between space-x-7 cursor-pointer select-none w-full">

                            <CommonSelect
                                value={filterShiftList?.status}
                                onChange={(e, title) => {
                                    console.log('selected status', e.target.value, ', title: ', title);
                                    if (e.target.value === 'complete')
                                        setFilterShiftList({ ...filterShiftList, status: e.target.value, type: "history" });
                                    else if (e.target.value === 'init')
                                        setFilterShiftList({ ...filterShiftList, status: e.target.value, is_maintenance: false, is_maintenance_req: true });
                                    else
                                        setFilterShiftList({ ...filterShiftList, status: e.target.value, type: "" });
                                }}

                                label={t('shift status')}
                                dataArray={[
                                    { title: t('Not started'), value: 'init' },
                                    { title: t('Ongoing'), value: 'ongoing' },
                                    { title: t('Completed'), value: 'complete' },
                                ]}
                            />
                            <div className="w-full relative">
                                <div className="absolute -top-[9px]">
                                    <CommonCheckbox
                                        label={t('in maintenance')}
                                        checked={filterShiftList?.is_maintenance ? true : false}
                                        onChange={() => {
                                            setFilterShiftList({ ...filterShiftList, is_maintenance: filterShiftList?.is_maintenance ? null : 'In Maintenance' });
                                        }} />
                                </div>
                            </div>

                        </div>

                        {/* submit form */}
                        <div className="pt-5 flex flex-row-reverse">
                            <CommonButton
                                type='submit'
                                btnLabel={t('filter shift')}
                                onClick={async () => {
                                    // return 
                                    console.log('filter shift data: ', filterShiftList);

                                    setFilterShiftList(removeEmpty(filterShiftList));

                                    if (
                                        filterShiftList?.start_date ||
                                        filterShiftList?.start_time ||
                                        filterShiftList?.end_date ||
                                        filterShiftList?.end_time ||
                                        filterShiftList?.plate_number ||
                                        filterShiftList?.driver_name ||
                                        filterShiftList?.status ||
                                        filterShiftList?.type ||
                                        filterShiftList?.is_maintenance_req ||
                                        filterShiftList?.is_maintenance) {
                                        setShiftFilterMode(true);
                                    } else {
                                        setShiftFilterMode(false);
                                        console.log('Object is empty');
                                    }
                                    let filterSuccess = await getAllShiftList(filterShiftList);
                                    if (filterSuccess)
                                        setShowFilterShiftModal(false);



                                }}
                            />
                        </div>
                    </form>
                }
            />
        </div>
    )
}

export default FilterShift