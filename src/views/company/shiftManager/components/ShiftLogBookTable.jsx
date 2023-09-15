import React from 'react';
import useShiftStore from '../../../../app/stores/company/shiftStore';
import { formatDate, formatTimeHourMinutes, getOrdinalNumber } from '../../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

const ShiftLogBookTable = ({ summaryData }) => {

    const { shiftDetailsData } = useShiftStore();
    const status = shiftDetailsData?.log_books_details?.shift_status;
    const { t } = useTranslation();

    return (
        <div className='w-full' >
            <div className='text-base limadi-medium pb-4'>{("Logbook")}</div>
            <table className='w-full font-medium'>

                <LogTableRow breakIndex='Shift Starts'
                    timeFrame={shiftDetailsData?.start_date && shiftDetailsData?.start_time ?
                        `${formatDate(shiftDetailsData?.start_date)}, ${formatTimeHourMinutes(shiftDetailsData?.start_time)}` ?? '--, --' : '--, --'} />

                {(shiftDetailsData?.status === "init") &&
                    (shiftDetailsData?.starts_in_raw <= -1 && shiftDetailsData?.starts_in_time_unit === "days") ||
                    (shiftDetailsData?.starts_in_raw <= -24 && shiftDetailsData?.starts_in_time_unit === "hour") ?
                    <LogTableRow breakIndex='Shift Time' timeFrame={"Expired"} />
                    : <>
                        {(status === 'ongoing' || status === 'break' || status === 'complete') &&
                            <LogTableRow breakIndex={t('Driver Started')}
                                timeFrame={shiftDetailsData?.log_books_details?.shift_start ? formatDate(shiftDetailsData?.log_books_details?.shift_start, true) ?? '--, --' : '--, --'} />}

                        {
                            shiftDetailsData?.log_books?.length ? shiftDetailsData?.log_books?.map((item, index) =>
                                <>
                                    <LogTableRow
                                        key={index}
                                        breakIndex={getOrdinalNumber((index + 1)) + ' Break  Starts'}
                                        timeFrame={item?.break_start ? formatDate(item?.break_start, true) ?? '--, --' : '--, --'}
                                    />
                                    {item?.break_end && <LogTableRow
                                        key={index + 500}
                                        breakIndex={getOrdinalNumber((index + 1)) + ' Break  Ends'}
                                        timeFrame={item?.break_end ? formatDate(item?.break_end, true) ?? '--, --' : '--, --'}
                                    />}
                                </>
                            )
                                : ""
                        }
                        {status === 'complete' && shiftDetailsData?.ended_at?
                                        <LogTableRow breakIndex={t('Shift Ended')}
                                            timeFrame={shiftDetailsData?.ended_at ?
                                                formatDate(shiftDetailsData?.ended_at, true) ?? '--, --' : '--, --'} /> : ""}
                    </>
                }
            </table>
        </div>
    )
}

export default ShiftLogBookTable


const LogTableRow = ({
    breakIndex = '1st Break',
    startsAt = 'Start/End: ',
    timeFrame = 'Start/End: 9. Mar. 2023, 08:50',
}) => {
    return (
        <>
            <tr className='border-b-[1px] border-cMainBlack text-cMainBlack text-sm'>
                {/* <td className='max-w-[180px] pl-0 truncate font-normal'>{breakIndex}</td> */}
                <td className='min-w-[80px] text-left'>{breakIndex}:</td>
                <td className='min-w-[80px] text-right'>{timeFrame}</td>
            </tr> <tr className='h-3'></tr>
        </>
    )
}