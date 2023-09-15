/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CommonTable from '../../../../../components/table/CommonTable';
import InBiddingFilter from './components/InBiddingFilter';
import { defineOfferedPrice, getTableViewRequestsData, handleRequestOrder, isTableFiltered } from '../../../../../app/stores/others/requestStore';
import { k_data_set, k_orderBy, user_role as role } from '../../../../../app/utility/const';
import useRequestStore from '../../../../../app/stores/others/requestStore';
import { formatDate, formatTime } from '../../../../../app/utility/utilityFunctions';
import { kuGetRequestsNew } from '../../../../../app/urls/commonUrl';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import useGeneralStore from '../../../../../app/stores/others/generalStore';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function InBiddings({ tableTitleClassName }) {
  const { in_bidding, search_key, setSearchKey, request_take, setRequestTake, setRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, clearFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy } = useRequestStore();
  const { path_record, user_role } = useGeneralStore();

  const [showModal, setShowModal] = useState(false);
  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();
  const { t } = useTranslation();


  const headers = user_role === role.customer ?
    [
      { index: 0, name: "#", onClickAction: () => { }, width: '2' },

      { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 1, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },

      { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 2, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '17' },

      { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 3, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '16' },

      { isActive: requests_order === k_orderBy.submitted_to, sort: is_asc, index: 4, name: t("Submitted"), onClickAction: () => handleRequestOrder(k_orderBy.submitted_to, getData), width: '15' },

      { isActive: requests_order === k_orderBy.pickup_starts_at, sort: is_asc, index: 5, name: t("Bid Ends"), onClickAction: () => handleRequestOrder(k_orderBy.pickup_starts_at, getData), width: '15' },

      { isActive: requests_order === k_orderBy.min_budget, sort: is_asc, index: 6, name: t("Offered Price"), onClickAction: () => handleRequestOrder(k_orderBy.min_budget, getData), width: '15' },
    ] :
    [
      { index: 0, name: "#", onClickAction: () => { }, width: '2' },

      { isActive: requests_order === k_orderBy.customer_from, sort: is_asc, index: 4, name: t("Customer"), onClickAction: () => handleRequestOrder(k_orderBy.customer_from, getData), width: '15' },

      { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 1, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },

      { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 2, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '17' },

      { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 3, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '16' },



      { isActive: requests_order === k_orderBy.pickup_starts_at, sort: is_asc, index: 5, name: t("Bid Ends"), onClickAction: () => handleRequestOrder(k_orderBy.pickup_starts_at, getData), width: '15' },

      { isActive: requests_order === k_orderBy.my_bid, sort: is_asc, index: 6, name: t("Budget"), onClickAction: () => handleRequestOrder(k_orderBy.my_bid, getData), width: '15' },
    ];

  const getData = () => getTableViewRequestsData({
    data_set: k_data_set.in_bidding, filter: {
      transport_type: request_filter_form?.transport_type,
      pickup_date_from: request_filter_form?.pickup_date_from,
      pickup_date_to: request_filter_form?.pickup_date_to,
      min_budget: request_filter_form?.min_budget,
      max_budget: request_filter_form?.max_budget,
    }
  });

  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setRequestApiUrl(kuGetRequestsNew);
    if (request_take !== 10) await setRequestTake(10);
    await setRequestsOrder(k_orderBy.pickup_starts_at);
    await setIsAsc(1);
    await resetRequestFilterForm();
    await resetFilterRange();
    await clearFilterRange();
    await resetRequestFilterFormCopy();
    getTableViewRequestsData({ data_set: k_data_set.in_bidding, filter: {} });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/requests/in-bidding/details/') || !path_record?.old?.includes('/')) {
        resetTable();
      } else {
        getData();
      }
    }, 1000);
  }

  useEffect(() => { handleInitialSetup() }, []);

  useEffect(() => { getData() }, [searchValue])


  return (
    <>
      <CommonTable
        tableTitle={t('In Bidding')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={in_bidding}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setRequestApiUrl(kuGetRequestsNew);
          setSearchKey(e.target.value);
        }}


        currentTakeAmount={request_take}
        withReloader={true}
        onReload={resetTable}
        filtered={isTableFiltered(k_data_set.in_bidding, request_filter_form_copy)}
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
          in_bidding?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => navigateTo(`/requests/in-bidding/details/${item?.id}`)}>
              <td className='border-r text-center py-2 table-title'>
                {(in_bidding?.current_page * 10 - 10) + index + 1}
              </td>
              {user_role === role.company && <td className='border-r text-center py-2 table-info capitalize'><Clamp lines={2}> {item?.customer_from ?? 'NA'}</Clamp></td>}
              <td className='border-r text-center py-2 table-info capitalize'><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'>{item?.transport_type ?? 'NA'}</td>
              <td className='border-r text-center py-2 table-info'>{(item?.stops_count ?? 0) + '/' + (item?.products_count ?? 0)} </td>
              {user_role === role.customer && <td className='border-r text-center py-2 table-info'>{item?.submitted_to ?? 'NA'}</td>}
              <td className='border-r text-center py-2 table-info'>{`${formatDate(item?.pickup_starts_at) ?? '--'}, ${formatTime(item?.pickup_starts_time) ?? '--'}`}</td>
              <td className='border-r text-center py-2 table-info'>{user_role === role.customer ? defineOfferedPrice(item) : ('DKK ' + item?.my_bid?.toLocaleString("da-DK") ?? 'NA')}</td>
            </tr>
          )
        }
      />

      <InBiddingFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
