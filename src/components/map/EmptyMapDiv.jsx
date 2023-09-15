import React from 'react'
import EmptyMessage from '../EmptyMessage'

export default function EmptyMapDiv({ mapVH = 40, content = "No Pickup Points Available!" }) {
    return (
        <div className={`bg-white  p-2 md:p-4 shadow rounded-xl flex-col my-5 h-[${mapVH}vh] flex justify-center items-center`}>
            <EmptyMessage message={content} />
        </div>
    )
}
