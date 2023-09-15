import { Rating } from '@mui/material';
import React from 'react'

export default function RatingChipContent({ value = 0, onChange }) {
  return (
    <div className='flex items-center'>
      <Rating
        className='text-cMainBlack text-fs14 font-fw400'
        name="simple-controlled"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
