/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGeneralStore from '../../../../../../../../app/stores/others/generalStore'
import useRequestStore, { checkIsBiddingDetailsShow, checkIsCustomerProfileShow, checkIsShowDeliveryOverview, checkIsShowPickupOrDeliveryStatus, defineNotPlannedDeliveryDate, definePickupAndDeliveryStatus } from '../../../../../../../../app/stores/others/requestStore'
import { k_arcd_status, user_role as role } from '../../../../../../../../app/utility/const'
import { formatDate, formatTime } from '../../../../../../../../app/utility/utilityFunctions'
import ImageViewer from '../../../../../../../../components/image/ImageViewer'
import CommonTimePicker from '../../../../../../../../components/input/CommonTimePicker'
import CommonViewComponent from '../../../../../../../../components/viewer/CommonViewComponent'
import RequestDetailsTextTitle from '../RequestDetailsTextTitle'
import BiddingDetails from './components/BiddingDetails'
import CustomerProfile from './components/CustomerProfile'
import DeliveryOverview from './components/DeliveryOverview'
import ProposalInfo from '../../../summary/components/ProposalInfo'
import { iRedCancel } from '../../../../../../../../app/utility/imageImports.js'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'

export default function Deliveries({ data }) {
  const params = useParams();
  const { type } = params;
  const { generateStops, updateStopInfo, not_planned_stops, request_details } = useRequestStore();
  const { user_role } = useGeneralStore();
  const { t } = useTranslation();

  const addressValidation = (address) => {
    let x = address?.replace(/, 0000/g, "");
    let y = x?.replace(/, 0/g, "");
    return y?.length > 0 ? y : null
  }

  useEffect(() => {
    if (type === 'not-planned') {
      generateStops({ stops: data?.stops, date: data?.pickup_date });
    }
  }, [request_details])


  return (
    <>
      <div className='pt-5 space-y-5 w-[calc(100%-380px)]'>
        {
          data?.stops?.map((stop, index) => (
            <div className='border-cGrey border-[0.5px] p-3 space-y-2' key={index}>
              <div className='flex flex-row justify-between items-center '>
                <RequestDetailsTextTitle
                  title={`${t('Delivery')} ${index + 1}`}
                  is_show_delivery_status={checkIsShowPickupOrDeliveryStatus(stop?.status, type)}
                  status={stop?.status}
                  date_time={definePickupAndDeliveryStatus(stop, 'delivery')}
                  info={type === 'not-planned' && data?.awarded?.status === k_arcd_status.init}
                />


              </div>


              <CommonViewComponent labelText={t('Delivery Address')} value={addressValidation(stop?.address)} className='my-[20px]' />

              {/* only for company */}
              {
                (useGeneralStore.getState().user_role === role.company && type !== 'invitation' && type !== 'in-bidding') &&
                <>
                  {type !== 'not-planned' &&
                    <>
                      <CommonViewComponent labelText={t('Delivery Date')} value={formatDate(stop?.date)} className='my-[20px]' />
                      <CommonViewComponent labelText={t('Delivery Time')} value={formatTime(stop?.start_time)} className='my-[20px]' />
                    </>
                  }

                  {
                    type === 'not-planned' && data?.awarded?.status === 'init' &&

                    <>
                      <CommonViewComponent labelText={t('Delivery Date')} value={defineNotPlannedDeliveryDate(data?.pickup_date, not_planned_stops[index]?.start_time, data?.pickup_start_time)} className='my-[20px]' />
                      <div className='flex flex-row justify-start items-center space-x-2 w-1/2 relative '>
                        <CommonTimePicker
                          label={t('Delivery Time')}
                          name={'start_time'}
                          init_time={not_planned_stops[index]?.start_time}
                          endTime={not_planned_stops[index]?.end_time}
                          onChange={(start_time, end_time) => {
                            updateStopInfo(index, 'start_time', start_time)
                            updateStopInfo(index, 'end_time', end_time)
                            // console.log('onchange', start_time, end_time, not_planned_stops);
                          }}
                          selectAction={(start_time, end_time) => {
                            updateStopInfo(index, 'start_time', start_time);
                            updateStopInfo(index, 'end_time', end_time);
                            // console.log('selectAction', start_time, end_time, not_planned_stops);
                          }}
                        />

                        {not_planned_stops[index]?.start_time ? <Tooltip title={t('Clear delivery time')} color={'#F89818'} >
                          <img onClick={() => {
                            updateStopInfo(index, 'start_time', '')
                            updateStopInfo(index, 'end_time', '')
                          }} className='h-4 w-4 cp' src={iRedCancel} alt=""  />
                        </Tooltip> : <></>}

                      </div>
                    </>
                  }

                </>
              }

              {
                stop?.products?.map((product, index) => (
                  <CommonViewComponent key={index} labelText={t(`Product`)} value={product?.text} className='my-[20px]' />
                ))
              }

              <CommonViewComponent
                labelText={t('Comment')}
                value={stop?.comment ?? 'NA'}
                className='my-[20px]'
              />

              {stop?.attachment && <div className='my-[20px]'>
                <ImageViewer src={stop?.attachment} label={t('Attachment')} />
              </div>}

              {checkIsShowDeliveryOverview(stop, type) && <DeliveryOverview index={index} stop={stop} />}


            </div>
          ))
        }

        {checkIsCustomerProfileShow(type) && <CustomerProfile data={data?.user} />}

        {checkIsBiddingDetailsShow(type) && <BiddingDetails data={data} />}

        {((type === 'awarded' || type === 'not-planned') && user_role === role.company) && <ProposalInfo type={type} in_summary={false} />}

      </div>
    </>
  )
}
