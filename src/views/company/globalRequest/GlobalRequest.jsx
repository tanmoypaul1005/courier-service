import React from 'react'
import { Outlet } from 'react-router-dom'
// import LimadiMap from '../../../components/map/LimadiMap'

export default function GlobalRequest() {

  return (
    <div className=''>
      <Outlet />
    </div>
  )
}
