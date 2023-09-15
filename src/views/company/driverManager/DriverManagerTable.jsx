/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDebounce } from 'use-debounce';
import { k_orderBy } from '../../../app/utility/const';
import CommonTable from '../../../components/table/CommonTable';
import useDriverStore, { getDriversTableData, handleOrder } from '../../../app/stores/company/driverStore';
import { kuDriverTableData } from '../../../app/urls/companyUrl';
import CommonButton from '../../../components/button/CommonButton';
import DriverDetailsModal from './modal/DriverDetailsModal';
import { iWhitePlus } from '../../../app/utility/imageImports';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../../app/stores/others/settingsStore';

export default function DriverManagerTable({ tableTitleClassName }) {
  const { driver_table_data, search_key, setSearchKey, take, setTake, setApiUrl, setOrder, setIsAsc, is_asc, order, setAddDriver_form, setShowAddDriverModal, setDriverDetails, showDetailsModal, setShowDetailsModal } = useDriverStore();

  const [searchValue] = useDebounce(search_key, 500);

  const { t } = useTranslation();

  const headers = [
    { index: 0, name: "#", width: '2', onClickAction: () => { console.log('click event: #'); } },

    { isActive: order === k_orderBy.name, sort: is_asc, width: '33', index: 1, name: t("Name"), onClickAction: () => handleOrder(k_orderBy.name, getDriversTableData), },

    { isActive: order === k_orderBy.email, sort: is_asc, width: '25', index: 2, name: t("Email"), onClickAction: () => handleOrder(k_orderBy.email, getDriversTableData), },

    { isActive: order === k_orderBy.phone_from_company, sort: is_asc, width: '20', index: 3, name: t("Phone"), onClickAction: () => handleOrder(k_orderBy.phone_from_company, getDriversTableData), },

    { isActive: order === k_orderBy.joined_date, sort: is_asc, width: '20', index: 4, name: t("Joining Date"), onClickAction: () => handleOrder(k_orderBy.joined_date, getDriversTableData), },
  ];


  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setApiUrl(kuDriverTableData);
    if (take !== 10) await setTake(10);
    await setOrder(k_orderBy.joined_date);
    await setIsAsc(1);
    getDriversTableData();
  }

  const handleInitialSetup = async () => {
    resetTable()
  }

  useEffect(() => { handleInitialSetup() }, []);

  useEffect(() => { getDriversTableData() }, [searchValue]);

  const { app_lang_code } = useSettingsStore.getState();

  return (
    <>
      <CommonTable
        tableTitle={t('Driver Manager')}
        showSearchBox={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        showTopRightFilter={false}
        headers={headers}
        outerPadding='p-s0'
        tableTitleClassName={tableTitleClassName}
        paginationObject={driver_table_data}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setApiUrl(kuDriverTableData);
          setSearchKey(e.target.value)
        }}

        currentTakeAmount={take}
        withReloader={true}
        onReload={resetTable}
        takeOptionOnChange={async (e) => {
          await setTake(e.target.value);
          await setApiUrl(kuDriverTableData);
          getDriversTableData();
        }}
        paginationOnClick={async (url) => {
          await setApiUrl(url);
          getDriversTableData();
        }}
        topRightMainComponent={
          <>
            <CommonButton btnLabel={t('Add Driver')} type='button' icon={iWhitePlus} width={app_lang_code ==="en" ? "w-[145px]" :"w-[170px]"} onClick={() => {
              setAddDriver_form({ email: "", name: "", phone: "", comment: "" })
              setShowAddDriverModal(true);
            }} />
          </>
        }



        items={
          driver_table_data?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={async () => {
              await setDriverDetails(item);
              setShowDetailsModal(true);
            }}>
              <td className='border-r text-center py-2 table-title'>
              {(driver_table_data?.current_page * 10 - 10) + index + 1}
              </td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.name ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.email ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'>{(item?.phone_from_company ?? 'NA')} </td>
              <td className='border-r text-center py-2 table-info'>{`${item?.joined_date ?? 'NA'}`}</td>
            </tr>
          )
        }

      />

      <DriverDetailsModal showModal={showDetailsModal} setShowModal={setShowDetailsModal} />
    </>
  )
}
