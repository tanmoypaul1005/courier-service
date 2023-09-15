import React from 'react';
import { iLogin1, iLogo2 } from '../../../../app/utility/imageImports';

const CommonLeftAuth = ({ title = "Please Login to Continue" }) => {

    return (
        <div className='w-1/2 bg-cBgSideBar h-[100vh] overflow-y-auto flex flex-col items-center justify-center custom:hidden '>
            <img className='h-[10vh]' src={iLogo2} alt="" srcSet="" />
            <div className='w-[450px] flex justify-center font-fw500 md:text-fs28 sm:text-fs20 text-fs16 text-cDisable md:my-8 sm:my-6 my-4'>
                {title}
                </div>
            <img className='h-[50vh]' src={iLogin1} alt="" srcSet="" />
        </div>

    );
};

export default CommonLeftAuth;