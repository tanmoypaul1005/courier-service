/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Slider } from '@mui/material'
import React, { useEffect } from 'react'
import useRequestStore from '../../app/stores/others/requestStore';
import { useTranslation } from 'react-i18next';

export default function FilterRange({ className, max = 1500, min = 0, defaultValue = 100, value, onChange }) {
  const { changeFilterRange, filter_range, changeRequestFilterForm } = useRequestStore.getState();
  const { t } = useTranslation();

  const handleMinMaxChange = (e, type) => {
    const x = parseInt(e.target.value.toString());
    let value = filter_range?.value;
    type === 'min' ? value[0] = x : value[1] = x;
    if (x < min || !x) type === 'min' ? value[0] = min : value[1] = max;
    if (x > max || !x) type === 'min' ? value[0] = min : value[1] = max;
    if (x < value[0] || x > value[1]) type === 'min' ? value[0] = min : value[1] = max;


    changeFilterRange('filter_range', value);
    changeRequestFilterForm('min_budget', value[0]);
    changeRequestFilterForm('max_budget', value[1]);
  }


  return (
    <div onClick={() => {

    }} className={`w-full flex flex-col justify-start items-start ${className}`}>
      <div className='text-fs12 font-fw400 text-cGrey'>{t('Budget Range')}</div>

      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{ color: '#2257AA', }}
        onChange={onChange}
        value={value}
      />

      <div className='flex flex-row w-full justify-between items-center space-x-4 text-fs14 font-fw400 limadi-font-regular'>
        <div className='flex flex-row justify-start items-center space-x-1'>
          <div>{('DKK')}</div>
          <input className='bg-cMainWhite w-s100 py-1 px-s2 border-cGrey outline-none' type="number" value={filter_range?.value[0]} onChange={(e) => handleMinMaxChange(e, 'min')} />
        </div>

        <div className='flex flex-row justify-end items-center space-x-1'>
          <div>{('DKK')}</div>
          <input className='bg-cMainWhite w-s100 py-1 px-s2 border-cGrey outline-none' type="number" value={filter_range?.value[1]} onChange={(e) => handleMinMaxChange(e, 'max')} />
        </div>

      </div>
    </div>
  )
}
