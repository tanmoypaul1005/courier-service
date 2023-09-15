import { Rating } from '@mui/material'
import React from 'react'
import useRequestStore from '../../../../../../../app/stores/others/requestStore'
import CommonViewComponent from '../../../../../../../components/viewer/CommonViewComponent';
import { useTranslation } from 'react-i18next';
import { user_role as role } from '../../../../../../../app/utility/const';
import useGeneralStore from '../../../../../../../app/stores/others/generalStore';

export default function AcknowledgeDetails() {
  const { request_details } = useRequestStore();
  const { t } = useTranslation();
  const { user_role } = useGeneralStore.getState();

  return (
    <div className='mt-5'>

      {request_details?.acknowledge ? <div className='p-3  border border-cMainBlue rounded flex flex-col justify-start items-start space-y-2'>
        <div className='text-cMainBlack text-fs16 font-fw500 flex flex-row justify-between items-center w-full'>
          {user_role=== role.customer && <div>{request_details?.is_rated ? t('Review') : t('Acknowledgement')}</div>}

          {(request_details?.rate &&  user_role=== role.customer) && <Rating
            name="size-large"
            size="small"
            value={Math.round(request_details?.rate) ?? 0}
            readOnly={true}
            datatype={'number'}
          />}

        </div>

        {
          (request_details?.is_rated && user_role=== role.customer)  ? <CommonViewComponent
            labelText={t('Comment')}
            value={request_details?.review ?? 'NA'}
          /> : <></>
        }

        {request_details?.is_rated ?
          ( <CommonViewComponent
            labelText={t('Acknowledgement Comment')}
            value={request_details?.acknowledge ?? 'NA'}
          />): <CommonViewComponent
            labelText={t('Company Comment')}
            value={request_details?.acknowledge ?? 'NA'}
          />
        }

      </div>
        :
        <div className='p-3 text-cShadeBlueGray text-fs14 font-fw400 text-center border border-cMainBlue rounded'>
          {t('Company has not been acknowledged yet!')}
        </div>
      }
    </div>
  )
}
