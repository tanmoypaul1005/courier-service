import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <RotatingLines
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={2}
                strokeWidthSecondary={3}
                color="#f89818"
                strokeColor="#f89818"
                secondaryColor="white"
            />
        </div>
    )
}
