/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import useRequestStore, { defineAllRequestsStatus, getTableViewRequestsData, handleAllRequestNavigate, handleRequestOrder, isTableFiltered } from '../../../../app/stores/others/requestStore';
import useGeneralStore from '../../../../app/stores/others/generalStore';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { k_data_set, k_orderBy } from '../../../../app/utility/const';
import { kuGetRequestsNew } from '../../../../app/urls/commonUrl';
import CommonTable from '../../../../components/table/CommonTable';
import { formatDate, formatTime } from '../../../../app/utility/utilityFunctions';
import AllRequestsFilter from './AllRequestsFilter';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';


export default function AllRequestsTable({ tableTitleClassName }) {
  const { all_requests, search_key, setSearchKey, request_take, setRequestTake, setRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy, clearFilterRange } = useRequestStore();
  const { path_record } = useGeneralStore();

  const [showModal, setShowModal] = useState(false);
  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();
  const { t } = useTranslation();

  const headers = [
    { index: 0, name: "#", onClickAction: () => { }, width: '2' },

    { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 1, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },

    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 2, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '17' },

    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 3, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '16' },

    { isActive: requests_order === k_orderBy.date_and_time_raw, sort: is_asc, index: 5, name: t("Date & Time"), onClickAction: () => handleRequestOrder(k_orderBy.date_and_time_raw, getData), width: '15' },

    { isActive: requests_order === k_orderBy.budget, sort: is_asc, index: 6, name: t("Budget"), onClickAction: () => handleRequestOrder(k_orderBy.budget, getData), width: '15' },

    { isActive: requests_order === k_orderBy.status, sort: is_asc, index: 6, name: t("Status"), onClickAction: () => handleRequestOrder(k_orderBy.status, getData), width: '15' },
  ];

  const getData = () => getTableViewRequestsData({
    data_set: k_data_set.all_requests, filter: {
      transport_type: request_filter_form?.transport_type,
      status: request_filter_form?.status,
      from_date: request_filter_form?.from_date,
      to_date: request_filter_form?.to_date,
      min_budget: request_filter_form?.min_budget,
      max_budget: request_filter_form?.max_budget,
    }
  });

  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setRequestApiUrl(kuGetRequestsNew);
    if (request_take !== 10) await setRequestTake(10);
    await setRequestsOrder();
    await setIsAsc(1);
    await resetRequestFilterForm();
    await resetFilterRange();
    await clearFilterRange();
    await resetRequestFilterFormCopy();
    getTableViewRequestsData({ data_set: k_data_set.all_requests, filter: {} });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/') || !path_record?.old?.includes('/details/')) resetTable();
      else getData();
    }, 1000);
  }

  useEffect(() => { handleInitialSetup() }, []);

  useEffect(() => { getData() }, [searchValue])

  // console.log('all_requests', all_requests)


  return (
    <>
      <CommonTable
        tableTitle={t('All Requests')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={all_requests}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setSearchKey(e.target.value);
          setRequestApiUrl(kuGetRequestsNew);
        }}

        currentTakeAmount={request_take}
        withReloader={true}
        onReload={resetTable}
        filtered={isTableFiltered(k_data_set.all_requests, request_filter_form_copy)}
        takeOptionOnChange={async (e) => {
          await setRequestTake(e.target.value);
          await setRequestApiUrl(kuGetRequestsNew);
          getData();
        }}
        paginationOnClick={async (url) => {
          await setRequestApiUrl(url);
          getData();
        }}

        items={
          all_requests?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => handleAllRequestNavigate(item, navigateTo)}>
              <td className='border-r text-center py-2 px-1 table-title'>
              {(all_requests?.current_page * 10 - 10) + index + 1}
              </td>
              <td className='border-r text-center py-2 px-1 table-info'><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp> </td>
              <td className='border-r text-center py-2 px-1 table-info'>{item?.transport_type ?? 'NA'}</td>
              <td className='border-r text-center py-2 px-1 table-info'>{`${item?.stops_complete_count ?? 0} of ${item?.stops_count ?? 0} / ${item?.products_complete_count ?? 0} of ${item?.products_count ?? 0}`} </td>
              <td className='border-r text-center py-2 px-1 table-info'>{`${formatDate(item?.date_and_time_raw,true) ?? '--'}`}</td>
              <td className='border-r text-center py-2 px-1 table-info'>{item?.budget ? ('DKK ' + item?.budget?.toLocaleString("da-DK")) : 'NA'}</td>
              <td className='border-r text-center py-2 px-1 table-info capitalize'>{defineAllRequestsStatus(item) ?? 'NA'} </td>
            </tr>
          )
        }
      />

      <AllRequestsFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
