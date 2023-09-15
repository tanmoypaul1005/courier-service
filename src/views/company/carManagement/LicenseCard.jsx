import React from 'react';
import { iLicense, iLicenseWhite } from '../../../app/utility/imageImports';

const LicenseCard = ({ onClick, active, number, amount }) => {
    return (
        <div>
            <div
                onClick={onClick}
                className={`cursor-pointer  shadow-3xl w-[158px] rounded-br8 py-s10 ${active ? 'text-cMainWhite bg-cMainBlue' : 'text-cMainBlack'}`}>
                <div className='flex justify-center'><img className='w-s60 h-s60' src={active ? iLicenseWhite : iLicense} alt="" /></div>
                <div>
                    <div className='flex justify-center'><div className='text-fs16  font-fw500 mt-s20 mb-s4 capitalize'>{number}</div></div>
                    <div className='flex justify-center'><div className='text-fs24  font-fw500'>DKK {amount.toLocaleString("da-DK")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LicenseCard;