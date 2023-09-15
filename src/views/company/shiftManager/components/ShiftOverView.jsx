import React, { useEffect, useState } from 'react';
import useShiftStore from '../../../../app/stores/company/shiftStore';
import { secondsToHms } from '../../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

const ShiftOverView = () => {
    const { shiftDetailsData } = useShiftStore();
    const [shiftStatusColor, setShiftStatusColor] = useState('');
    const [shiftStatusTitle, setShiftStatusTitle] = useState('');
    const { t } = useTranslation();

    //console.log("shiftStatusTitle",shiftStatusTitle)

    useEffect(() => {

        switch (shiftDetailsData?.status) {
            case 'complete':
                setShiftStatusColor('text-cSuccess'); setShiftStatusTitle('Completed');
                break;
            case 'break':
                setShiftStatusColor('text-cBrand'); setShiftStatusTitle('Break');
                break;

            case "ongoing":
                setShiftStatusColor('text-cBrand'); setShiftStatusTitle('Ongoing');
                break;

            case 'init':
                if (shiftDetailsData?.is_maintenance === 1) {
                    setShiftStatusColor('text-cBrand'); setShiftStatusTitle('In Maintenance');
                }
                else if (shiftDetailsData?.is_maintenance === 0) {
                    setShiftStatusColor('text-cRed'); setShiftStatusTitle('Not Started');
                }
                break;

            default:
                setShiftStatusColor('text-cBrand'); setShiftStatusTitle('');
                break;
        }
    }, [shiftDetailsData]);
    return (
        <div
            onClick={() => {
                console.log("shiftDetailsData", shiftDetailsData);
            }}
            className='w-full'
        >
            <div className='flex items-center space-x-2 pb-4'>
                <div className='sub-title'>{t("Shift Overview")}</div>
                <div className={`text-xs font-normal ${shiftStatusColor}`} >({shiftStatusTitle})</div>
            </div>


            {shiftStatusTitle !== "In Maintenance" && <div className="grid grid-cols-3 md:grid-cols-6 w-full gap-4">

                <OverViewItem title={t('requests')} data={(shiftDetailsData?.request_completed ?? 0) + '/' + (shiftDetailsData?.request_count ?? 0)} />
                <OverViewItem title={t('stops')} data={(shiftDetailsData?.stops_completed ?? 0) + '/' + (shiftDetailsData?.stops_count ?? 0)} />
                <OverViewItem title={t('packages')} data={(shiftDetailsData?.products_completed ?? 0) + '/' + (shiftDetailsData?.products_count ?? 0)} />

                <OverViewItem title={t('breaks')} data={secondsToHms(shiftDetailsData?.breaks ?? 0)} />
                <OverViewItem title={t('working hours')} data={secondsToHms(shiftDetailsData?.work_time ?? 0)} />
                <OverViewItem title={t('total hours')}data={secondsToHms(shiftDetailsData?.shift_hours ?? 0)} />

            </div>}
        </div>
    )
}

export default ShiftOverView

const OverViewItem = ({ title = 'Title', data = 'DATA' }) => {
    return (
        <div className='flex flex-col items-center justify-center border-[1px] border-cLightGrayishBlue py-2 px-2 rounded-sm'>
            <div className='text-xs capitalize text-center'>{title}</div>
            <div className='text-base limadi-medium text-center' >{data}</div>
        </div>
    )
}