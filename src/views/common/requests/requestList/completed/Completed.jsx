/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CommonTable from '../../../../../components/table/CommonTable';
import useGeneralStore from '../../../../../app/stores/others/generalStore';
import useRequestStore, { getTableViewRequestsData, handleRequestOrder, isTableFiltered } from '../../../../../app/stores/others/requestStore';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { k_data_set, k_orderBy } from '../../../../../app/utility/const';
import { kuGetRequestsNew } from '../../../../../app/urls/commonUrl';
import { formatDate, formatDateOrTime } from '../../../../../app/utility/utilityFunctions';
import CompletedFilter from './components/CompletedFilter';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function Completed({ tableTitleClassName }) {
  const { completed, search_key, setSearchKey, request_take, setRequestTake, setRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, clearFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy } = useRequestStore();
  const { path_record } = useGeneralStore();

  const [showModal, setShowModal] = useState(false);
  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();
  const { t } = useTranslation();


  const headers = [
    { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '2' },
    { isActive: requests_order === k_orderBy.customer_from, sort: is_asc, index: 1, name: t("Customer"), onClickAction: () => handleRequestOrder(k_orderBy.customer_from, getData), width: '15' },
    { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 2, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },
    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 3, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '10' },
    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 4, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '15' },
    { isActive: requests_order === k_orderBy.completed_at, sort: is_asc, index: 5, name: t("Completed"), onClickAction: () => handleRequestOrder(k_orderBy.completed_at, getData), width: '18' },
    { isActive: requests_order === k_orderBy.budget, sort: is_asc, index: 6, name: t("Budget"), onClickAction: () => handleRequestOrder(k_orderBy.budget, getData), width: '10' },
  ];

  const getData = () => getTableViewRequestsData({
    data_set: k_data_set.completed, filter: {
      transport_type: request_filter_form?.transport_type,
      customer_from: request_filter_form?.customer_from,
      completed_to: request_filter_form?.completed_to,
      completed_from: request_filter_form?.completed_from,
      min_budget: request_filter_form?.min_budget,
      max_budget: request_filter_form?.max_budget,
    }
  });

  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setRequestApiUrl(kuGetRequestsNew);
    if (request_take !== 10) await setRequestTake(10);
    await setRequestsOrder(k_orderBy.completed_at);
    await setIsAsc(1);
    await resetRequestFilterForm();
    await resetFilterRange();
    await clearFilterRange();
    await resetRequestFilterFormCopy();
    getTableViewRequestsData({ data_set: k_data_set.completed, filter: {} });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/requests/completed/details/')) {
        resetTable();
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
        tableTitle={t('Completed')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={completed}

        withClearSearch={true}
        onSearchClear={() => { setSearchKey("") }}
        searchValue={search_key}
        searchOnChange={(e) => {
          setRequestApiUrl(kuGetRequestsNew);
          setSearchKey(e.target.value);
        }}

        currentTakeAmount={request_take}
        withReloader={true}
        onReload={resetTable}
        filtered={isTableFiltered(k_data_set.completed, request_filter_form_copy)}
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
          completed?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => navigateTo(`/requests/completed/details/${item?.id}`)}>
              <td className='py-2 text-center border-r table-title'>
                {(completed?.current_page * 10 - 10) + index + 1}
              </td>
              <td className='py-2 text-center border-r table-info max-w-[200px] min-w-[200px] '><Clamp lines={1}> {item?.customer_from ?? 'NA'}</Clamp></td>
              <td className='py-2 text-center border-r table-info'><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
              <td className='py-2 text-center border-r table-info'>{item?.transport_type ?? 'NA'}</td>
              <td className='border-r text-center py-2  table-info max-w-[160px] min-w-[160px]'>
                {`${item?.stops_complete_count ?? 0} of ${item?.stops_count ?? 0} / ${item?.products_complete_count ?? 0} of ${item?.products_count ?? 0}`}
              </td>
              <td className='py-2 text-center border-r table-info'>{`${formatDate(item?.completed_at) ?? '--'}, ${formatDateOrTime(item?.completed_at) ?? '--'}`}</td>

              <td className='py-2 text-center border-r table-info max-w-[160px] min-w-[160px]'>{item?.budget ? 'DKK ' + item?.budget?.toLocaleString("da-DK") : 'NA'}</td>
            </tr>
          )
        }
      />

      <CompletedFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
