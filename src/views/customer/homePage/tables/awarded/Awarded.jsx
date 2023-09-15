/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CommonTable from '../../../../../components/table/CommonTable'
import AwardedFilter from './components/AwardedFilter';
import useRequestStore, { getTableViewRequestsData, handleRequestOrder, isTableFiltered } from '../../../../../app/stores/others/requestStore';
import useGeneralStore from '../../../../../app/stores/others/generalStore';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { k_data_set, k_orderBy, user_role as role } from '../../../../../app/utility/const';
import { kuGetRequestsNew } from '../../../../../app/urls/commonUrl';
import { formatDate, formatTime } from '../../../../../app/utility/utilityFunctions';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function Awarded({ tableTitleClassName }) {
  const { awarded, search_key, setSearchKey, request_take, setRequestTake, setRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, clearFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy } = useRequestStore();
  const { path_record, user_role } = useGeneralStore();

  const [showModal, setShowModal] = useState(false);
  const [searchValue] = useDebounce(search_key, 500);
  const navigateTo = useNavigate();
  const { t } = useTranslation();


  const headers = (user_role === role.customer) ? [
    { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '2' },
    (user_role === role.customer) ?
      { isActive: requests_order === k_orderBy.awarded_company, sort: is_asc, index: 1, name: t("Company"), onClickAction: () => handleRequestOrder(k_orderBy.awarded_company, getData), width: '20' }
      : { isActive: requests_order === k_orderBy.customer_from, sort: is_asc, index: 1, name: t("Customer"), onClickAction: () => handleRequestOrder(k_orderBy.customer_from, getData), width: '20' },
    { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 2, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },
    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 3, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '20' },
    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 4, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '20' },
    { isActive: requests_order === k_orderBy.pickup_starts_at, sort: is_asc, index: 5, name: t("Date & Time"), onClickAction: () => handleRequestOrder(k_orderBy.pickup_starts_at, getData), width: '20' },
    { isActive: requests_order === k_orderBy.awarded_budget, sort: is_asc, index: 6, name: t("Budget"), onClickAction: () => handleRequestOrder(k_orderBy.awarded_budget, getData), width: '20' },
  ] :
    [
      { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '2' },
      (user_role === role.customer) ?
        { isActive: requests_order === k_orderBy.awarded_company, sort: is_asc, index: 1, name: t("Company"), onClickAction: () => handleRequestOrder(k_orderBy.awarded_company, getData), width: '20' }
        : { isActive: requests_order === k_orderBy.customer_from, sort: is_asc, index: 1, name: t("Customer"), onClickAction: () => handleRequestOrder(k_orderBy.customer_from, getData), width: '20' },
      { isActive: requests_order === k_orderBy.driver_name, sort: is_asc, index: 2, name: t("Driver"), onClickAction: () => handleRequestOrder(k_orderBy.driver_name, getData), width: '20' },
      { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 2, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '20' },
      { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 3, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '20' },
      { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 4, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '20' },
      { isActive: requests_order === k_orderBy.pickup_starts_at, sort: is_asc, index: 5, name: t("Date & Time"), onClickAction: () => handleRequestOrder(k_orderBy.pickup_starts_at, getData), width: '20' },
      { isActive: requests_order === k_orderBy.awarded_budget, sort: is_asc, index: 6, name: t("Budget"), onClickAction: () => handleRequestOrder(k_orderBy.awarded_budget, getData), width: '20' },
    ];

  const getData = () => getTableViewRequestsData({
    data_set: k_data_set.awarded, filter: {
      is_planned: user_role === role.company ? 1 : null,
      transport_type: request_filter_form?.transport_type,
      pickup_date_from: request_filter_form?.pickup_date_from,
      pickup_date_to: request_filter_form?.pickup_date_to,
      min_budget: request_filter_form?.min_budget,
      max_budget: request_filter_form?.max_budget,
      awarded_company: user_role === role.customer ? request_filter_form?.awarded_company : null,
      shift_driver: user_role === role.company ? request_filter_form?.shift_driver : null,
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
    getTableViewRequestsData({ data_set: k_data_set.awarded, filter: { is_planned: user_role === role.company ? 1 : null } });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/requests/awarded/details/') || !path_record?.old?.includes('/')) {
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
        tableTitle={t('Awarded')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={awarded}

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
        filtered={isTableFiltered(k_data_set.awarded, request_filter_form_copy)}
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
          awarded?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => navigateTo(`/requests/awarded/details/${item?.id}`)}>
              <td className='py-2 text-center border-r table-title'>
                {(awarded?.current_page * 10 - 10) + index + 1}
              </td>
              {(user_role === role.customer) ?
                <td className='py-2 text-center border-r table-info'><Clamp lines={1}> {item?.awarded_company ?? 'NA'}</Clamp></td>
                :
                <td className='py-2 text-center border-r table-info'><Clamp lines={1}> {item?.customer_from ?? 'NA'}</Clamp></td>}
              {(user_role === role.company) && <td className='py-2 text-center border-r table-info'><Clamp lines={1}>{item?.driver_name ?? 'NA'}</Clamp></td>}
              <td className='py-2 text-center border-r table-info'><Clamp lines={1}> {item?.title ?? 'NA'}</Clamp></td>
              <td className='py-2 text-center border-r table-info min-w-[80px] max-w-[80px]'>{item?.transport_type ?? 'NA'}</td>
              <td className='border-r text-center py-2 table-info min-w-[100px] max-w-[100px]'>{(item?.stops_count ?? 0) + '/' + (item?.products_count ?? 0)} </td>
              <td className='py-2 text-center border-r table-info min-w-[150px] max-w-[150px]'>{`${formatDate(item?.pickup_starts_at) ?? '--'}, ${formatTime(item?.pickup_starts_time) ?? '--'}`}</td>
              <td className='py-2 text-center border-r table-info min-w-[150px] max-w-[150px]'>DKK {item?.awarded_budget?.toLocaleString("da-DK") ?? 'NA'}</td>
            </tr>
          )
        }
      />

      <AwardedFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
