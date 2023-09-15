/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useCreateRequestStore, { getInitData, loadCreateRequestData } from '../../../app/stores/others/createRequestStore'
import useGeneralStore from '../../../app/stores/others/generalStore'
import useRequestStore from '../../../app/stores/others/requestStore'
import { getRequestDetails } from '../../../app/stores/others/requestStore'
import { create_request_steps, create_request_type, k_cr_status, user_role as role } from '../../../app/utility/const'
import { changePageTitle } from '../../../app/utility/utilityFunctions'
import Content from './components/content/Content'
import CreateRequestSummary from './components/summary/CreateRequestSummary'
import TitleAndActions from './components/titleAndActions/TitleAndActions'
import { useTranslation } from 'react-i18next'

export default function CreateRequest() {
  const { setCurrentSetup, setCreateRequestType, resetCreateRequest, setFavSelected, setRate, setSearchCompanyKey } = useCreateRequestStore();
  const { user_role } = useGeneralStore();
  const params = useParams();
  const { request_id } = params;
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation();

  useEffect(() => {
    changePageTitle(t('Limadi | Create Request'));
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setCurrentSetup(create_request_steps.pickup);
    setCreateRequestType(create_request_type.normal);

    loadRequest();

    return () => {
      resetCreateRequest();
      setFavSelected(false);
      setRate(0);
      setSearchCompanyKey('');
    }
  }, []);

  useEffect(() => {
    if (path.includes('/request/create')) resetCreateRequest();
    if (path.includes('/request/edit')) loadRequest()
  }, [path])


  const loadRequest = async () => {

    if (request_id) {
      await getRequestDetails('saved', request_id);
      const { request_details } = useRequestStore.getState();
      if (request_details?.is_mass) setCreateRequestType(create_request_type.mass_import);

      if ((request_details?.status === k_cr_status.init)) {
        setCurrentSetup(create_request_steps.pickup);
      } else if (request_details?.status === create_request_steps.mass_import) {
        setCurrentSetup(create_request_steps.mass_import);
      } else {

        (user_role === role.customer) ? setCurrentSetup(create_request_steps.select_company) : setCurrentSetup(create_request_steps.select_shift);
      }
      loadCreateRequestData(request_details)
    }
    getInitData();
  }

  return (
    <div className='relative flex w-full flex-col justify-start scroll-smooth'>

      <TitleAndActions />

      <div className='flex flex-row justify-between space-x-5'>
        <Content />
        <CreateRequestSummary />
      </div>
    </div>
  )
}
