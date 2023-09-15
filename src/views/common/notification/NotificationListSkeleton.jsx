import React from 'react'

const NotificationListSkeleton = () => {
    const count = Math.floor(Math.random() * (6 - 8 + 1)) + 8; // max = 11; min = 8
    let numbers = [];

    for (let i = 1; i < count; i++) {
      numbers.push(i);
    }

    return (
      <>
        {numbers.map((i) => (
          <div key={i} className="w-full bg-gray-100 h-20 animate-pulse translate-3d-none-after border-b border-gray-200">
            <div className="flex items-center justify-between h-full px-4">
                <div className="h-13 w-1/5 flex flex-col justify-center mr-4 px-5">
                    {/* <div className="animate-pulse bg-gray-200 w-full rounded-full h-20 mb-2"></div> */}
                    <div className="w-12 h-12 rounded-full animate-pulse bg-gray-200 mb-2"></div>
                </div>
                <div className="h-full w-3/5 flex flex-col justify-center mr-4">
                    <div className="animate-pulse bg-gray-200 w-full rounded-xl h-2 mb-2"></div>
                    <div className="animate-pulse bg-gray-200 w-2/3 rounded-xl h-2"></div>
                </div>
                <div className="flex w-1/5 justify-end">
                    <div className="animate-pulse h-5 w-20 bg-gray-200 rounded-md mr-4"></div>
                </div>
            </div>
          </div>
        ))}
      </>
    );
}

export default NotificationListSkeleton