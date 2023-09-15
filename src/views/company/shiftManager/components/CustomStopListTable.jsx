import React from 'react'
import { formatDate, removeSecFromDeliveryTime } from '../../../../app/utility/utilityFunctions'
import useShiftStore from '../../../../app/stores/company/shiftStore'
import { useTranslation } from 'react-i18next';
const CustomStopListTable = ({ dataArray }) => {

    const { t } = useTranslation ();

        return (
        <div className='w-full' >
            <table className='w-full font-medium'>
                <tr className='font-semibold text-left'>
                    <td className='pl-0'>{t("Custom Stop")}</td>
                    <td className='pl-10'>{t("Address")}</td>
                    <td className='pl-0 text-right'>
                        {t("Time Range")}
                    </td>
                </tr>
                <tr className='h-4'></tr>
                {
                    dataArray?.map((item, index) =>
                        <CustomTableRow
                            key={index}
                            data={item}
                            stop={item?.title}
                            address={item?.address ?? "NA"}
                            timeRange={removeSecFromDeliveryTime(item?.start_time) + " - " + removeSecFromDeliveryTime(item?.end_time)}
                            Starts={formatDate(item?.pickup_starts_date) + ' ' + item?.pickup_starts_time + ' - ' + 'p_end_time'}
                        />
                    )
                }
            </table>
        </div>
    )
}

export default CustomStopListTable

const CustomTableRow = ({
    data = {},
    stop = "NA",
    address = "0",
    timeRange = "NA",
}) => {
    const { setShowCustomStopModal, setCustomStopModalData } = useShiftStore();
    return (
        <>
            <tr onClick={() => {
                setShowCustomStopModal(true);
                setCustomStopModalData(data);
                // console.log('CustomTableRow', data)
            }} className='w-full border-b-[1px] border-cMainBlue text-cMainBlue cursor-pointer'>
                <td className='max-w-[180px] pl-0 truncate font-semibold'>{stop}</td>
                <td className='pl-10 min-w-[90px] max-w-[90px]'>{address}</td>
                <td className='pl-0 max-w-[1px] text-right'>
                    {timeRange}
                </td>
            </tr>
            <tr className='h-3'></tr>
        </>
    )
}