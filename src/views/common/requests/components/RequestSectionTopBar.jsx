import React from 'react'
import useLayoutStore from '../../../../app/stores/others/layoutStore';

const RequestSectionTopBar = ({
  title = 'title goes here',
  rightComponents,
}) => {
  const { isSidebarOpen } = useLayoutStore();

  return (
    <div className={`${isSidebarOpen ? "lg:w-[calc(100%-310px)] w-[calc(100%-40px)]" : "lg:w-[calc(100%-175px)] w-[calc(100%-135px)]"}  fixed -mt-4 bg-white z-[10]`}>
      <div className='w-full flex items-center justify-between py-5'>

        <div className='font-medium text-fs28'>{title}</div>
        <div>{rightComponents}</div>
      </div>
    </div>
  )
}

export default RequestSectionTopBar