import React from 'react'
import useCreateRequestStore from '../../../../../../app/stores/others/createRequestStore'
import CommonInput from '../../../../../../components/input/CommonInput'
import { useTranslation } from 'react-i18next';

export default function BiddingOverview() {
  const { cr_form, changeCrForm } = useCreateRequestStore();
  const { t } = useTranslation();


  return (
    <div className='border border-cMainBlue mt-4 rounded-br4 p-3'>
      <div className='sub-title'>{t('Bidding Overview')}</div>

      <CommonInput show_asterisk={false} required={true} min_input={0} max_input={8} labelText={t('Budget')} type='number' name={'budget'} value={cr_form?.budget} 
      onChange={(e) => {
          const newValue = e.target.value.replace(/[^0-9]/g, ''); 
          changeCrForm('budget', newValue);
      }} />
      <CommonInput show_asterisk={false} required={true} textareaWithoutBorderBottom={false} value={cr_form?.bid_details} className='mt-2' rows={3} labelText={t('Description')} textarea={true} name={'bid_details'} onChange={(e) => changeCrForm('bid_details', e.target.value)} />
      <div className="pb-5"></div>

    </div>
  )
}
