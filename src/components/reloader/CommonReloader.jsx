import React from 'react';
import { ImSpinner11, ImSpinner2 } from "react-icons/im";
import useGeneralStore from '../../app/stores/others/generalStore';
import useUtilityStore from '../../app/stores/others/utilityStore';

const CommonReloader = ({
    onClick = () => { },
}) => {
    // const { isLoading } = useUtilityStore();
    const { isLoading } = useGeneralStore();

    return (
        <div onClick={onClick} className='cursor-pointer' >
            {
                !isLoading ? <ImSpinner11 className="text-gray-500 border-gray-400 w-[20px] h-[20px]" />
                    :
                    <ImSpinner2 className="animate-spin duration-150 text-gray-500 border-gray-400 w-[20px] h-[20px]" />
            }
        </div>
    )
}

export default CommonReloader