import React from 'react';
import { iCommonEmptyImage, iNoBiddingIcon, iWhiteAdd } from '../../../../app/utility/imageImports';
import CommonButton from '../../../../components/button/CommonButton';
import { useNavigate } from 'react-router-dom';

const NoBidding = () => {
    const navigateTo = useNavigate();

    return (
        <div className='h-[400px] w-full flex justify-center items-center '>
            <div className='flex flex-col justify-center items-center'>
                <img src={iCommonEmptyImage} alt="iNoBiddingIcon" className='h-[300px] w-[300px] my-s15' />
                <div className='text-fs24 font-fw500 text-cCustomerBlack '>Nothing in In Bidding</div>
                <div className='text-fs14 font-fw400 text-cGrey mb-s15'>You have nothing in In Bidding list. Please create a request first.</div>
                <CommonButton
                    icon={iWhiteAdd}
                    btnLabel="Create Request"
                    isDisabled={false}
                    // width="w-[200px]"
                    // smallSize={true}
                    // mediumSize={true}
                    bigSize={true}
                    onClick={() => navigateTo('/request/create')}
                />
            </div>
        </div>
    );
};

export default NoBidding;