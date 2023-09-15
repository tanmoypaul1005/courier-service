import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

export default function CommonCheckbox({ checked = false, onChange, label = '', labelClass = '' }) {
  return (

    <>
      {
        label ?
          <FormControlLabel
            className='capitalize text-sm'
            label={<div className='limadi-regular'>
              {label}
            </div>}            
            control={
              <Checkbox
                checked={checked}
                onChange={onChange}
                size='small'
                sx={{
                  color: '#989898',
                  width: 'fit-content',
                  padding: 0,
                  marginLeft: '8px',
                  marginRight: '10px',
                  backgroundColor: 'transparent !important',
                  fontFamily: 'fEuclidLimadiRegular',
                  '&.Mui-checked': {
                    color: '#2463EB',
                    fontFamily: 'fEuclidLimadiRegular',
                  },
                }
                }
              />}
          />
          :
          <Checkbox
            checked={checked}
            onChange={onChange}
            size='small'
            sx={{
              color: '#989898',
              width: 'fit-content',
              padding: 0,
              margin: 0,
              backgroundColor: 'transparent !important',
              fontFamily: 'fEuclidLimadiRegular',
              '&.Mui-checked': {
                color: '#2463EB',
                fontFamily: 'fEuclidLimadiRegular',
              },
            }}
          />}
    </>
  )
}
