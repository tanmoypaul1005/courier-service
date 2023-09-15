import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { changePageTitle } from '../../../app/utility/utilityFunctions';

const ShiftManager = () => {
    useEffect(() => { changePageTitle('Limadi | Shift Manager'); }, []);
    return (
        <div className=''>
            <Outlet />
        </div>
    )
}

export default ShiftManager
