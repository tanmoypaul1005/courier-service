import { Tooltip } from 'antd'
import React from 'react'
import { iDelivered, iNotDelivered, iInformation } from '../../../../../../../app/utility/imageImports'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RequestDetailsTextTitle = ({ title = '123', status = 'init', is_show_delivery_status = false, date_time = null, info = false, className }) => {
    const params = useParams();
    const { type } = params;
    const { t } = useTranslation();


    const setStatusColor = () => {
        if (type === 'history') return 'text-cMainBlack';
        else {
            return status === 'not_delivered' ? 'text-cRed' : 'text-cBrand';
        }

    }

    return (
        <div className={`sub-title capitalize flex flex-row justify-between space-x-4 items-center w-full ${className}`}>
            <div className='flex flex-row justify-start space-x-2 items-center'>
                <div> {t(title)} </div>
                {info &&
                    <Tooltip color={'#F89818'} title={t('You can update delivery time!')}>
                        <img src={iInformation} alt="" srcset="" className='cursor-help' />
                    </Tooltip>
                }
                {status === 'delivered' && <img src={iDelivered} alt="" srcset="" />}
                {status === 'not_delivered' && <img src={iNotDelivered} alt="" srcset="" />}
            </div>

            {is_show_delivery_status &&
                <div className={`${setStatusColor()} text-fs14 font-fw400`}>
                    {date_time ?? '--'}
                </div>
            }

        </div>
    )
}

export default RequestDetailsTextTitle