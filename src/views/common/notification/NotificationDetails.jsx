import React from 'react';
import { formatDate } from '../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

const NotificationDetails = ({ selectedNotification }) => {

    const { t } = useTranslation();

    return (
        <>
            {selectedNotification ? <div>
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <span className='text-cMainBlack text-fs24 font-fw500 '>{t("Notification Details")}</span>
                    <span className="text-cDisable text-fs12 font=fw400 md:text-center md:items-center md:flex md:justify-center">
                        <span>{formatDate(selectedNotification?.created_date)}, {selectedNotification?.created_time}</span></span>
                </div>

                <div className='text-cMainBlack text-fs16 font-fw500 mt-s15 break-all'>
                    {selectedNotification?.title}
                </div>
                <span className='mt-s4 text-cMainBlack text-fs14 font-fw400 break-all'>{selectedNotification?.description}</span>
            </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
                {("Select list item to view details.")}
            </div>}
        </>
    );
};

export default NotificationDetails;