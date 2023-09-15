
import React from 'react'
import useCreateRequestStore from '../../../../../../app/stores/others/createRequestStore';
import { create_request_type } from '../../../../../../app/utility/const';
import Delivery from './components/Delivery'
import Pickup from './components/Pickup'

export default function PickupAndDeliveryForm() {
  const { request_type } = useCreateRequestStore();

  return (
    <div className='flex flex-col justify-start'>

      <Pickup />

      {request_type === create_request_type.normal && <Delivery/>}


    </div>
  )
}
