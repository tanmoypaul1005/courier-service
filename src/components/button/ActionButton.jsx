import * as React from 'react';
import { iDownArrowBlack } from '../../app/utility/imageImports';


const ActionButton = ({
    label = "Action Button",
    width = "w-[180px]",
    dataArray = [
        { title: "one", action: () => { console.log("one clicked !"); } },
        { title: "two", action: () => { console.log("two clicked !"); } },
        { title: "three", action: () => { console.log("three clicked !"); } },
        { title: "four", action: () => { console.log("four clicked !"); } },
    ],
}) => {

    const [open, setOpen] = React.useState(false);
    const [panelHeight, setPanelHeight] = React.useState(100);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        setPanelHeight(44 * (dataArray?.length + 1))
    }, [dataArray]);

    return (

        <div
            style={{
                // height: open ? panelHeight : "44px",
            }}
            tabIndex={0}
            onBlur={handleClose}
            // transition-all duration-300 ease-in-out
            // overflow-hidden
            className={`
                bg-white border-2 border-cMainBlue rounded-t-md relative  
                ${width} h-s40
                ${open ? '' : "rounded-b-md"}
            `}>
            <div
                onClick={handleOpen}
                className={`
                        flex items-center justify-center py-1.5 rounded-md cursor-pointer
                        select-none relative duration-300 font-fw500 text-fs16 capitalize bg-white
                    `}
            >
                <div className='mr-1'>{label}</div>
                <img src={iDownArrowBlack} alt="" className={`w-s16 transition-all duration-300 ease-in-out ${open ? 'rotate-180' : 'rotate-0'}`} />
            </div>
            {/* {open ? <div className={`bg-cMainBlue w-full h-[1.5px]`}></div> : ""} */}

            {open ? <div className={`absolute h-[${(panelHeight - 44)}px] top-[36px] left-[-2px] z-[10002] ${width} bg-white border-2 border-cMainBlue shadow-lg rounded-b-md overflow-hidden`} >
                {dataArray?.map((item, index) => (
                    <div key={index} className='w-full space-y-5 hover:bg-gray-100 text-center'>
                        <div onClick={() => { handleClose(); item?.action(); }} className='w-full cursor-pointer'>
                            <div className='w-full p-[9px]'>{item?.title}</div>
                            {/* {(dataArray?.length - 1) === index ? "" : <div className='bg-cLightGrayishBlue h-[2px] w-full'></div>} */}
                        </div>
                    </div>

                ))}
            </div> : ""}

        </div>

    );
}
export default ActionButton

