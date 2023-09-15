/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { k_data_set, k_orderBy } from '../../../app/utility/const';
import useShiftStore, { defineScheduleInfo, defineShiftStatus, getAllShiftCarsAndDriversList, getShiftTableData, handleOrder } from '../../../app/stores/company/shiftStore';
import { kuShiftManagerTableData } from '../../../app/urls/companyUrl';
import CommonTable from '../../../components/table/CommonTable';
import CommonButton from '../../../components/button/CommonButton';
import { iFilterBlue, iFilterWhite, iWhitePlus } from '../../../app/utility/imageImports';
import CommonButtonOutlined from '../../../components/button/CommonButtonOutlined';
import { isTableFiltered } from '../../../app/stores/others/requestStore';
import { useNavigate } from 'react-router-dom';
import useGeneralStore from '../../../app/stores/others/generalStore';
import ShiftManagerFilter from './components/ShiftManagerFilter';
import { formatDateV2 } from '../../../app/utility/utilityFunctions';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function ShiftManagerTable({ tableTitleClassName }) {

  const { t } = useTranslation();

  const { shift_table_data, search_key, setSearchKey, take, setTake, setApiUrl, setOrder, setIsAsc, is_asc, order, filter_form_copy, setAllShiftCarList, setAllShiftDriverList, setShowAddShiftModal, filter_form, resetFilterForm, resetFilterFormCopy } = useShiftStore();

  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();
  const { path_record } = useGeneralStore();
  const [showModal, setShowModal] = useState(false);

  const headers = [
    { index: 0, name: "#", width: '2', onClickAction: () => { console.log('click event: #'); } },

    { isActive: order === k_orderBy.driver_name, sort: is_asc, width: '25', index: 1, name: t("Driver"), onClickAction: () => handleOrder(k_orderBy.driver_name, getData), },

    { isActive: order === k_orderBy.car_number, sort: is_asc, width: '10', index: 2, name: t("License"), onClickAction: () => handleOrder(k_orderBy.car_number, getData), },

    { isActive: order === k_orderBy.shift_date_time_raw, sort: is_asc, width: '25', index: 3, name: t("Date & Time"), onClickAction: () => handleOrder(k_orderBy.shift_date_time_raw, getData), },

    { isActive: order === k_orderBy.location, sort: is_asc, width: '15', index: 4, name: t("Location"), onClickAction: () => handleOrder(k_orderBy.location, getData), },

    { isActive: order === k_orderBy.status, sort: is_asc, width: '15', index: 4, name: t("Status"), onClickAction: () => handleOrder(k_orderBy.status, getData), },
  ];

  const getData = () => getShiftTableData({
    //?? formatDateV2()
    filter: {
      start_date: filter_form?.start_date,
      end_date: filter_form?.end_date,
      start_time: filter_form?.start_time,
      end_time: filter_form?.end_time,
      plate_number: filter_form?.plate_number,
      driver_id: filter_form?.driver_id,
      is_maintenance: filter_form?.is_maintenance,
      status: filter_form?.status,
    }
  });

  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setApiUrl(kuShiftManagerTableData);
    if (take !== 10) await setTake(10);
    await setOrder(k_orderBy.shift_date_time_raw);
    await setIsAsc(1);
    await resetFilterForm();
    await resetFilterFormCopy();
    // start_date: formatDateV2()
    await getShiftTableData({ filter: { start_date: "" } });
    return;
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/shift-manager/details/')) {
        await resetTable();
        getAllShiftCarsAndDriversList(null, null, null, null, false);
      } else {
        getData();
      }
    }, 1000);
  }

  useEffect(() => { handleInitialSetup() }, []);

  useEffect(() => { getData() }, [searchValue]);

  return (
    <>
      <CommonTable
        tableTitle={t('Shift Manager')}
        showSearchBox={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        showTopRightFilter={true}
        headers={headers}
        outerPadding='p-s0'
        tableTitleClassName={tableTitleClassName}
        paginationObject={shift_table_data}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setApiUrl(kuShiftManagerTableData);
          setSearchKey(e.target.value);
        }}

        currentTakeAmount={take}
        withReloader={true}
        onReload={resetTable}
        takeOptionOnChange={async (e) => {
          await setTake(e.target.value);
          await setApiUrl(kuShiftManagerTableData);
          getData();
        }}
        paginationOnClick={async (url) => {
          await setApiUrl(url);
          getData();
        }}
        topRightMainComponent={
          <>
            <CommonButton
              btnLabel={t('Add Shift')}
              icon={iWhitePlus} width="w-[140px]"
              type='button'
              onClick={() => {
                setAllShiftCarList([]);
                setAllShiftDriverList([]);
                setShowAddShiftModal(true)
              }} />
          </>
        }
        topRightFilterComponent={
          <div className="relative">
            {isTableFiltered(k_data_set.shift, filter_form_copy) && <div className="absolute h-2 w-2 rounded-full bg-cMainBlue right-1 top-1 z-50"></div>}
            <CommonButtonOutlined btnLabel={t('Filter')} onClick={() => setShowModal(true)} colorType="primary" iconLeft={iFilterWhite} iconLeftHover={iFilterBlue} />
          </div>
        }



        items={
          shift_table_data?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={async () => {
              navigateTo('details/' + item?.id);
            }}>
              <td className='border-r text-center py-2 table-title'>
                {(shift_table_data?.current_page * 10 - 10) + index + 1}
              </td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.driver_name ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'>{item?.car_number ?? 'NA'}</td>
              {/* <td className='border-r text-center py-2 table-info'>{(item?.shift_date_time ?? 'NA')} </td> */}
              <td className='border-r text-center py-2 table-info'>{defineScheduleInfo({ start_date: item?.shift_start_date, end_date: item?.shift_end_date, start_time: item?.shift_start_time, end_time: item?.shift_end_time })} </td>
              <td className='border-r text-center py-2 table-info'>{item?.location ?? 'NA'}</td>
              <td className='border-r text-center py-2 table-info capitalize'>{defineShiftStatus(item?.status) ?? 'NA'} </td>
            </tr>
          )
        }

      />

      <ShiftManagerFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
