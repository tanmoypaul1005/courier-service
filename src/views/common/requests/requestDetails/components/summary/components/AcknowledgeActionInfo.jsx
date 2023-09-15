import React from 'react'
import { useTranslation } from 'react-i18next';

export default function AcknowledgeActionInfo() {
  const { t } = useTranslation();

  return (
    <>

      <div className='p-3 mt-5 text-cShadeBlueGray text-fs14 font-fw400 text-center border border-cMainBlue rounded'>
        {t('Please Acknowledge the request so the customer can leave a feedback of this request.')}
      </div>
    </>
  )
}
