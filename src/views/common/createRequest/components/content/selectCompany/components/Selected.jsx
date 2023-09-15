import React from 'react'
import useCreateRequestStore from '../../../../../../../app/stores/others/createRequestStore';
import { iFavCompanyGray } from '../../../../../../../app/utility/imageImports';
import CommonEmptyData from '../../../../../../../components/emptyData/CommonEmptyData';
import CompanyListItem from '../../../../../../../components/listItems/CompanyListItem'
import CompanyDetailsModal from '../../../../../../../components/modal/CompanyDetailsModal';
import { useTranslation } from 'react-i18next';

export default function Selected({ companies }) {

  const { setSelectedCompanies, selected_companies } = useCreateRequestStore();
  const [showModal, setShowModal] = React.useState(false);
  const [company_id, setCompanyId] = React.useState(null);
  const { t } = useTranslation();

  console.log("companies",companies)

  return (
    <div className='my-6'>
      <div className='flex flex-row justify-between space-x-3 items-center text-fs16 font-fw500 mb-2'>
        <div className=''>{t('Selected')}({selected_companies?.length})</div>
        {companies?.length > 0 && <div className='text-cRed cp' onClick={() => setSelectedCompanies([])}>{t('Remove All')}</div>}
      </div>

      {companies?.length > 0 ? <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-y-4 xl:grid-cols-2 2xl:grid-cols-3'>



        {
          companies?.map((company, index) => (
            <CompanyListItem
              key={index}
              title={company?.name}
              rating={Math.round(company?.rate)}
              image={company?.image}
              dummyImage={iFavCompanyGray}
              is_favorite={company?.is_fav || company?.is_favorite}
              has_action_btn={true}
              is_add_type={false}
              onActionBtnClick={() => {
                let x = selected_companies;
                x.splice(index, 1);
                setSelectedCompanies(x);
              }}
              onClick={() => {
                console.log('company', company);
                setCompanyId(company?.id);
                setShowModal(true);
              }}
            />
          ))

        }

      </div>
        :
        <CommonEmptyData title={t('No Company Selected')} details={t('Select company to send request!')} />
      }

      <CompanyDetailsModal showModal={showModal} setShowModal={setShowModal} company_id={company_id} bidding_details={false} />
    </div >
  )
}
