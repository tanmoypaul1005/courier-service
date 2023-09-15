/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useRequestStore, { defineScheduleInfo, getShiftDetails } from '../../../../app/stores/others/requestStore';
import { base_url_src } from '../../../../app/utility/const';
import { iUserAvatar } from '../../../../app/utility/imageImports';
import CommonListItem from '../../../listItems/CommonListItem'

export default function Shifts({ available_shifts, selected_shift_id }) {
  const { selected_shift_index, setSelectedShiftIndex, setIsFastCalculation } = useRequestStore();

  useEffect(() => {
    if (available_shifts[selected_shift_index]?.id) {
      getShiftDetails(available_shifts[selected_shift_index]?.id);
      setIsFastCalculation(true);
    }
  }, [selected_shift_index]);

  useEffect(() => {
    if (selected_shift_id) {
      for (let index = 0; index < available_shifts.length; index++) {
        if (available_shifts[index]?.id === selected_shift_id) {
          setSelectedShiftIndex(index);
          break;
        }

      }
    } else setSelectedShiftIndex(null);
  }, []);


  return (
    <>
      <div className='mb-3 sub-title'>Available Shifts</div>
      <div className='grid grid-cols-1 lg:grid-cols-1 lg:gap-3 gap-y-3'>
        {available_shifts.map((item, index) => (
          <CommonListItem
   
            key={index}
            title={item?.driver_user?.name}
            subTitleOne={item?.car?.car_license_plate_number}
            subTitleTwo={defineScheduleInfo(item)}
            iconNormal={item?.driver_user?.image ? (base_url_src + item?.driver_user?.image) : iUserAvatar}
            iconSelected={item?.driver_user?.image ? (base_url_src + item?.driver_user?.image) : iUserAvatar}
            imgCover={true}
            selected={selected_shift_index === index}
            onClick={() => {
              setSelectedShiftIndex(index);
              console.log('selected_index', selected_shift_index);
            }}
          />
        ))}
      </div>
    </>
  )
}
