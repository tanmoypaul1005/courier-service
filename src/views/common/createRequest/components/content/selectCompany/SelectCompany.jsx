/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useCreateRequestStore, { handleCompany, searchCompany } from '../../../../../../app/stores/others/createRequestStore'
import { iGLobe, } from '../../../../../../app/utility/imageImports'
import CommonButton from '../../../../../../components/button/CommonButton'
import CommonSearchBox from '../../../../../../components/input/CommonSearchBox'
import Filter from './components/Filter'
import Selected from './components/Selected'
import SubmittedForGlobal from './components/SubmittedForGlobal'
import Suggestions from './components/Suggestions'
import { useTranslation } from 'react-i18next'

export default function SelectCompany() {

  const {cr_form, changeCrForm, search_company_key, setSearchCompanyKey, rate, is_company_searching, company_search_result, available_companies, is_fav_selected, selected_companies } = useCreateRequestStore();
  const { t } = useTranslation();

  useEffect(() => {
    // ! Using debounce
    const x = [];
    // for (let index = 0; index < rate; index++)  x.push(index + 1);
    let timer
    if(rate){for (let i = rate; i <= 5; i++) x.push(parseInt(i));}
    timer = setTimeout(() => searchCompany(search_company_key, x), 500);

    return () => clearTimeout(timer)
  }, [search_company_key, rate]);

  useEffect(() => {
    handleCompany();
  }, [company_search_result, is_fav_selected, selected_companies]);

  return (
    <>
      <div className='flex flex-row justify-between space-x-5 mb-5 items-start'>
        <div className='text-cMainBlack text-fs24 font-fw500 '> {t('Select Company')} </div>
        <CommonButton
          btnLabel={t('Global Invite')}
          icon={iGLobe}
          mediumSize={true}
          colorType={cr_form?.is_global ? 'primary' : 'basic'}
          onClick={() => changeCrForm('is_global', cr_form?.is_global ? 0 : 1)}
        />
      </div>

      <div className='pl-[.5px]'>
        <CommonSearchBox
          fullWidth={true}
          placeholder={t('Search Company')}
          value={search_company_key}
          onChange={(e) => {
            setSearchCompanyKey(e.target.value);
          }}
          search_loading={is_company_searching}
        />
      </div>

      <Filter />

      {cr_form?.is_global ? <SubmittedForGlobal /> : <></>}

      <Suggestions companies={available_companies} />

      {((available_companies?.length + selected_companies?.length) > 0) && <Selected companies={selected_companies} />}

    </>

  )
}
