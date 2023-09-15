/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import CommonTable from '../../../../../components/table/CommonTable'
import OnGoingFilter from './components/OnGoingFilter';
import useGeneralStore from '../../../../../app/stores/others/generalStore';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import useRequestStore, { getTableViewRequestsData, handleRequestOrder, isTableFiltered } from '../../../../../app/stores/others/requestStore';
import { k_data_set, k_orderBy, user_role as role } from '../../../../../app/utility/const';
import { kuGetRequestsNew } from '../../../../../app/urls/commonUrl';
import { formatDate, formatDateOrTime } from '../../../../../app/utility/utilityFunctions';
import Clamp from 'react-multiline-clamp';
import { useTranslation } from 'react-i18next';

export default function Ongoing({ tableTitleClassName }) {
  const { ongoing, search_key, setSearchKey, request_take, setRequestTake, setRequestApiUrl, setRequestsOrder, setIsAsc, request_filter_form, resetRequestFilterForm, resetFilterRange, resetRequestFilterFormCopy, is_asc, requests_order, request_filter_form_copy } = useRequestStore();
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
    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 3, name: t("Type"), onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '18' },
    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 4, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '20' },
    { isActive: requests_order === k_orderBy.req_expected_complete_at, sort: is_asc, index: 5, name: t("Expected Complete"), onClickAction: () => handleRequestOrder(k_orderBy.req_expected_complete_at, getData), width: '20' },
  ] : [
    { index: 0, name: "#", onClickAction: () => { console.log('click event: #'); }, width: '2' },
    (user_role === role.customer) ?
      { isActive: requests_order === k_orderBy.awarded_company, sort: is_asc, index: 1, name: t("Company"),onClickAction: () => handleRequestOrder(k_orderBy.awarded_company, getData), width: '18' }: { isActive: requests_order === k_orderBy.customer_from, sort: is_asc, index: 1, name: t("Customer"),onClickAction: () => handleRequestOrder(k_orderBy.customer_from, getData), width: '18' },
    { isActive: requests_order === k_orderBy.driver_name, sort: is_asc, index: 2, name: t("Driver"), onClickAction: () => handleRequestOrder(k_orderBy.driver_name, getData), width: '18' },

    { isActive: requests_order === k_orderBy.title, sort: is_asc, index: 2, name: t("Title"), onClickAction: () => handleRequestOrder(k_orderBy.title, getData), width: '18' },
    { isActive: requests_order === k_orderBy.transport_type, sort: is_asc, index: 3, name: t("Type"),onClickAction: () => handleRequestOrder(k_orderBy.transport_type, getData), width: '18' },
    { isActive: requests_order === k_orderBy.stops_count, sort: is_asc, index: 4, name: t("Stops/Packages"), onClickAction: () => handleRequestOrder(k_orderBy.stops_count, getData), width: '20' },
    { isActive: requests_order === k_orderBy.req_expected_complete_at, sort: is_asc, index: 5, name: t("Expected Complete"), onClickAction: () =>handleRequestOrder(k_orderBy.req_expected_complete_at, getData), width: '18' },
  ];

  const getData = () => getTableViewRequestsData({
    data_set: k_data_set.ongoing, filter: {
      transport_type: request_filter_form?.transport_type,
      exp_date_to: request_filter_form?.exp_date_to,
      exp_date_from: request_filter_form?.exp_date_from,
      awarded_company: user_role === role.customer ? request_filter_form?.awarded_company : null,
      shift_driver: user_role === role.company ? request_filter_form?.shift_driver : null,
    }
  });

  const resetTable = async () => {
    if (searchValue?.length > 0) await setSearchKey('');
    await setRequestApiUrl(kuGetRequestsNew);
    if (request_take !== 10) await setRequestTake(10);
    await setRequestsOrder(k_orderBy.req_expected_complete_at);
    await setIsAsc(1);
    await resetRequestFilterForm();
    await resetFilterRange();
    await resetRequestFilterFormCopy();
    getTableViewRequestsData({ data_set: k_data_set.ongoing, filter: {} });
  }

  const handleInitialSetup = async () => {
    setTimeout(async () => {
      if (!path_record?.old?.includes('/requests/on-going/details/') || !path_record?.old?.includes('/')) {
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
        tableTitle={t('Ongoing')}
        showSearchBox={true}
        showTopRightFilter={true}
        showTakeOption={true}
        showPagination={true}
        showPageCountText={true}
        headers={headers}
        outerPadding='p-s0'
        topRightFilterComponentOnClick={() => setShowModal(true)}
        tableTitleClassName={tableTitleClassName}
        paginationObject={ongoing}

        withClearSearch={true}
        onSearchClear={()=>{setSearchKey("")}}
        searchValue={search_key}
        searchOnChange={(e) => {
          setRequestApiUrl(kuGetRequestsNew);
          setSearchKey(e.target.value)
        }}

        currentTakeAmount={request_take}
        withReloader={true}
        onReload={resetTable}
        filtered={isTableFiltered(k_data_set.ongoing, request_filter_form_copy)}
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
          ongoing?.data?.map((item, index) =>
            <tr className='border border-collapse hover:bg-cCommonListBG cp' onClick={() => navigateTo(`/requests/on-going/details/${item?.id}`)}>
              <td className='py-2 text-center border-r table-title'>
              {(ongoing?.current_page * 10 - 10) + index + 1}
              </td>
              {(user_role === role.customer) ?
                <td className='py-2 text-center border-r table-info'><Clamp lines={2}> {item?.awarded_company ?? 'NA'}</Clamp></td>
                :
                <td className='py-2 text-center border-r table-info'><Clamp lines={2}> {item?.customer_from ?? 'NA'}</Clamp></td>}
              {(user_role === role.company) ? <td className='py-2 text-center border-r table-info'><Clamp lines={2}> {item?.driver_name ?? 'NA'}</Clamp></td> : <></>}
              <td className='py-2 text-center border-r table-info'><Clamp lines={2}> {item?.title ?? 'NA'}</Clamp></td>
              <td className='py-2 text-center border-r table-info'>{item?.transport_type ?? 'NA'}</td>
              <td className='relative py-2 text-center border-r table-info'>
                {`${item?.stops_complete_count ?? 0} of ${item?.stops_count ?? 0} / ${item?.products_complete_count ?? 0} of ${item?.products_count ?? 0}`}

              </td>
              <td className='py-2 text-center border-r table-info'>{`${formatDate(item?.req_expected_complete_at) ?? '--'}, ${formatDateOrTime(item?.req_expected_complete_at) ?? '--'}`}</td>
            </tr>
          )
        }

      />

      <OnGoingFilter showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
