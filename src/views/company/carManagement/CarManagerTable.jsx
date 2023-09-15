/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDebounce } from 'use-debounce';
import { k_orderBy } from '../../../app/utility/const';
import CommonTable from '../../../components/table/CommonTable';
import CommonButton from '../../../components/button/CommonButton';
import { kuAllCarTableData } from '../../../app/urls/companyUrl';
import useCarStore, { defineCarStatus, getAllLicenseList, getCarsTableData, handleOrder } from '../../../app/stores/company/carStore';
import CarDetailsModal from './modal/CarDetailsModal';
import { iWhitePlus } from '../../../app/utility/imageImports';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function CarManagerTable({ tableTitleClassName }) {
  const { car_table_data, search_key, setSearchKey, take, setTake, setApiUrl, setOrder, setIsAsc, is_asc, order, setAddCarForm, setShowAddCarModal, setCarDetails, showDetailsModal, setShowDetailsModal, setUpdateCarForm } = useCarStore();

  const [searchValue] = useDebounce(search_key, 500);

  const { t } = useTranslation();

  const headers = [
    { index: 0, name: "#", width: '2', onClickAction: () => { console.log('click event: #'); } },

    { isActive: order === k_orderBy.name, sort: is_asc, width: '30', index: 1, name: t("Name"), onClickAction: () => handleOrder(k_orderBy.name, getCarsTableData), },

    { isActive: order === k_orderBy.car_license_plate_number, sort: is_asc, width: '20', index: 2, name: t("License"), onClickAction: () => handleOrder(k_orderBy.car_license_plate_number, getCarsTableData), },

    { isActive: order === k_orderBy.license_start_raw, sort: is_asc, width: '30', index: 3, name: t("Duration"), onClickAction: () => handleOrder(k_orderBy.license_start_raw, getCarsTableData), },

    { isActive: order === k_orderBy.license_status, sort: is_asc, width: '18', index: 4, name: t("Status"), onClickAction: () => handleOrder(k_orderBy.license_status, getCarsTableData), },
  ];


  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setApiUrl(kuAllCarTableData);
    if (take !== 10) await setTake(10);
    await setOrder(null);
    await setIsAsc(1);
    getCarsTableData();
  }

  const handleInitialSetup = async () => {
    resetTable();
    getAllLicenseList();
  }

  useEffect(() => { handleInitialSetup() }, []);

  useEffect(() => { getCarsTableData() }, [searchValue]);

  return (
    <>
      <CommonTable
        tableTitle={t('Car Manager')}
        showSearchBox={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        showTopRightFilter={false}
        headers={headers}
        outerPadding='p-s0'
        tableTitleClassName={tableTitleClassName}
        paginationObject={car_table_data}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setApiUrl(kuAllCarTableData);
          setSearchKey(e.target.value);
        }}

        currentTakeAmount={take}
        withReloader={true}
        onReload={resetTable}
        takeOptionOnChange={async (e) => {
          await setTake(e.target.value);
          await setApiUrl(kuAllCarTableData);
          getCarsTableData();
        }}
        paginationOnClick={async (url) => {
          await setApiUrl(url);
          getCarsTableData();
        }}
        topRightMainComponent={
          <>
            <CommonButton btnLabel={t('Add Car')} type='button' icon={iWhitePlus} onClick={async () => {
              await setAddCarForm({
                id: 0,
                name: '',
                license_id: '',
                car_license_plate_number: '',
                license_start: '',
                image: '',
                comment: '',
              })
              setShowAddCarModal(true)
            }} />
          </>
        }

        items={
          car_table_data?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={async () => {
              setCarDetails(item);
              setUpdateCarForm(item);
              setShowDetailsModal(true);
            }}>
              <td className='border-r text-center py-2 table-title'>{(car_table_data?.current_page * 10 - 10) + index + 1}</td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.name ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'>{item?.car_license_plate_number ?? 'NA'}</td>
              <td className='border-r text-center py-2 table-info'>{((item?.license_start ?? 'NA') + ' - ' + (item?.license_end ?? 'NA'))} </td>
              <td className='border-r text-center py-2 table-info capitalize'>{defineCarStatus(item?.license_status) ?? 'NA'}</td>
            </tr>
          )
        }

      />

      <CarDetailsModal showModal={showDetailsModal} setShowModal={setShowDetailsModal} />
    </>
  )
}
