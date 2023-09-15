/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CommonTable from '../../../../../components/table/CommonTable'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useGeneralStore from '../../../../../app/stores/others/generalStore';
import useRequestStore, { getTableViewRequestsData, handleRequestOrder, isTableFiltered } from '../../../../../app/stores/others/requestStore';
import { k_data_set, k_orderBy } from '../../../../../app/utility/const';
import { kuGetRequestsNew } from '../../../../../app/urls/commonUrl';
import { formatDate, formatTime } from '../../../../../app/utility/utilityFunctions';
import InvitationFilter from './components/InvitationFilter';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function Invitation({ tableTitleClassName }) {
  const { invitation, search_key, setSearchKey, request_take, setRequestTake, setRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy } = useRequestStore();
  const { path_record } = useGeneralStore();

  const [showModal, setShowModal] = useState(false);
  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();
  const { t } = useTranslation();


  const headers = [
    { index: 0, name: "#", width: '2', onClickAction: () => { console.log('click event: #'); } },

    { isActive: requests_order === k_orderBy.customer_from, sort: is_asc, width: '20', index: 1, name: t("Customer"), onClickAction: () => handleRequestOrder(k_orderBy.customer_from, getData), },

    { isActive: requests_order === k_orderBy.title, sort: is_asc, width: '20', index: 1, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), },

    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, width: '15', index: 2, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), },

    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, width: '15', index: 3, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), },

    { isActive: requests_order === k_orderBy.pickup_starts_at, sort: is_asc, width: '17', index: 4, name: t("Bids End"), onClickAction: () => handleRequestOrder(k_orderBy.pickup_starts_at, getData), },

  ];

  const getData = () => getTableViewRequestsData({
    data_set: k_data_set.invitation, filter: {
      transport_type: request_filter_form?.transport_type,
      bids_end_from: request_filter_form?.bids_end_from,
      bids_end_to: request_filter_form?.bids_end_to,
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
    await resetRequestFilterFormCopy();
    getTableViewRequestsData({ data_set: k_data_set.invitation, filter: {} });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/requests/invitation/details/')) {
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
        tableTitle={t('Invitation')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={invitation}

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
        filtered={isTableFiltered(k_data_set.invitation, request_filter_form_copy)}
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
          invitation?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => navigateTo(`/requests/invitation/details/${item?.id}`)}>
              <td className='border-r text-center py-2 table-title'>
              {(invitation?.current_page * 10 - 10) + index + 1}
              </td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.customer_from ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
              <td className='border-r text-center py-2 table-info'>{item?.transport_type ?? 'NA'}</td>
              <td className='border-r text-center py-2 table-info'>{(item?.stops_count ?? 0) + '/' + (item?.products_count ?? 0)} </td>
              <td className='border-r text-center py-2 table-info'>{`${formatDate(item?.pickup_starts_at) ?? '--'}, ${formatTime(item?.pickup_starts_time) ?? '--'}`}</td>

            </tr>
          )
        }

      />

      <InvitationFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
