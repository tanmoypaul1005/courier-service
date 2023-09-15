/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import useRequestStore, { getTableViewGlobalRequestsData, handleRequestOrder, isTableFiltered } from '../../../app/stores/others/requestStore';
import useGeneralStore from '../../../app/stores/others/generalStore';
import { k_data_set, k_orderBy } from '../../../app/utility/const';
import { kuGlobalRequestTableIndex } from '../../../app/urls/companyUrl';
import CommonTable from '../../../components/table/CommonTable';
import { formatDate, formatTime } from '../../../app/utility/utilityFunctions';
import GlobalRequestFilter from './components/GlobalRequestFilter';
import { getGlobalReqDataList } from '../../../app/stores/company/globlaReqStore';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function GlobalRequestTable({ tableTitleClassName }) {
  const { global_request, search_key, setSearchKey, request_take, setRequestTake, setGlobalRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, clearFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy } = useRequestStore();
  const { path_record } = useGeneralStore();

  const [showModal, setShowModal] = useState(false);
  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();

  const { t } = useTranslation ();


  const headers = [
    { index: 0, name: "#", onClickAction: () => { }, width: '2' },

    { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 1, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },

    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 2, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '17' },

    { isActive: requests_order === k_orderBy.city, sort: is_asc, index: 3, name: t("Location"), onClickAction: () => handleRequestOrder(k_orderBy.city, getData), width: '17' },

    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 4, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '16' },

    { isActive: requests_order === k_orderBy.pickup_starts_at, sort: is_asc, index: 5, name: t("Bid Ends"), onClickAction: () => handleRequestOrder(k_orderBy.pickup_starts_at, getData), width: '15' },

  ];

  const getData = () => getTableViewGlobalRequestsData({
    filter: {
      transport_type: request_filter_form?.transport_type,
      pickup_date_from: request_filter_form?.pickup_date_from,
      pickup_date_to: request_filter_form?.pickup_date_to,
      start_time: request_filter_form?.start_time,
      end_time: request_filter_form?.end_time,
      city: request_filter_form?.city,
    }
  });

  const resetTable = async () => {
    await setGlobalRequestApiUrl(kuGlobalRequestTableIndex);
    if (searchValue?.length > 0) await setSearchKey('');
    if (request_take !== 10) await setRequestTake(10);
    await setRequestsOrder(k_orderBy.pickup_starts_at);
    await setIsAsc(1);
    await resetRequestFilterForm();
    await resetFilterRange();
    await clearFilterRange();
    await resetRequestFilterFormCopy();
    getTableViewGlobalRequestsData({ filter: {} });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/global-request/details/') || !path_record?.old?.includes('/')) {
        resetTable();
      } else {
        getData();
      }
    }, 1000);
  }

  useEffect(() => {
    handleInitialSetup();
    getGlobalReqDataList()
  }, []);

  useEffect(() => { getData() }, [searchValue])


  return (
    <>
      <CommonTable
        tableTitle={t('Global Request')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={global_request}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setGlobalRequestApiUrl(kuGlobalRequestTableIndex);
          setSearchKey(e.target.value);
        }}

        currentTakeAmount={request_take}
        withReloader={true}
        onReload={resetTable}
        filtered={isTableFiltered(k_data_set.global, request_filter_form_copy)}
        takeOptionOnChange={async (e) => {
          await setRequestTake(e.target.value);
          await setGlobalRequestApiUrl(kuGlobalRequestTableIndex);
          getData();
        }}
        paginationOnClick={async (url) => {
          await setGlobalRequestApiUrl(url);
          getData();
        }}

        items={
          global_request?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => navigateTo("details/" + item?.id)}>
              <td className='border-r text-center py-2 table-title'> {(global_request?.current_page * 10 - 10) + index + 1}</td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'>{item?.transport_type ?? 'NA'}</td>
              <td className='border-r text-center py-2 table-info'>{(item?.city ?? 'NA')} </td>
              <td className='border-r text-center py-2 table-info'>{(item?.stops_count ?? 0) + '/' + (item?.products_count ?? 0)} </td>
              <td className='border-r text-center py-2 table-info'>{`${formatDate(item?.pickup_starts_at) ?? '--'}, ${formatTime(item?.pickup_starts_time) ?? '--'}`}</td>
            </tr>
          )
        }
      />

      <GlobalRequestFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
