import React from 'react'
import useRequestStore from '../../../../../../app/stores/others/requestStore'
import Pickup from './components/Pickup'
import Deliveries from './components/deliveries/Deliveries';

export default function MainContents() {
  const { request_details } = useRequestStore();
  const data = request_details;

  return (
    <div className='max-w-[1268px]'>
      <Pickup data={data} />

      <Deliveries data={data} />
    </div>
  )
}
