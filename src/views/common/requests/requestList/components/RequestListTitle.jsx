import React from 'react'
import CommonReloader from '../../../../../components/reloader/CommonReloader'

export default function RequestListTitle({
  title = '',
  counter = '',
  rightSideComponent,
  onReload = () => { },
}) {
  return (
    <div className='flex xl:items-center items-baseline justify-between bg-white mb-6'>
      <div className='title flex items-center space-x-2.5'>
        <div className='flex items-center space-x-4'>
          <div className='capitalize'>{title} {counter ? <span>{` (${counter})`}</span> : ''} </div>
          <div className=' bg-cBgSideBar p-2 rounded-full shadow-sm' title='Refresh' >
            <CommonReloader onClick={onReload} />
          </div>

        </div>
      </div>
      <div>{rightSideComponent}</div>
    </div>
  )
}
