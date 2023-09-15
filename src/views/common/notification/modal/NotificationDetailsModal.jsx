import React from 'react'
import CommonModal from '../../../../components/modal/CommonModal'
import useNotificationStore from '../../../../app/stores/others/notificationStore'
import { iCalendar, iClock } from '../../../../app/utility/imageImports';
import { formatDate } from '../../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

function NotificationDetailsModal() {

    const { showNotificationDetailsModal, setShowNotificationDetailsModal, notificationDetails } = useNotificationStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showNotificationDetailsModal}
                setShowModal={setShowNotificationDetailsModal}
                modalTitle={t("Notification Details")}
                mainContent={
                    <>
                        <div className="text-cMainBlack text-fs20 font-fw600 mt-s15 break-all">{notificationDetails.title ?? 'NA'}</div>
                        <div className="text-cMainBlack text-fs14 font-fw400 break-all mt-s5">{notificationDetails.description ?? 'NA'}</div>

                        <div className='flex justify-end'>
                            <div className='flex justify-between mt-s5'>
                                <div className='flex'>
                                    <div className='flex mr-s10'>
                                        <img src={iCalendar} alt="" />
                                        <span className='ml-s5 text-fs12 font-fw400 text-cDisable break-all'>{formatDate(notificationDetails?.created_date)}</span></div>
                                    <div className='flex'>
                                        <img src={iClock} alt="" />
                                        <span className='ml-s5 text-fs12 font-fw400 text-cDisable break-all'>{notificationDetails?.created_time}</span></div>
                                </div>
                            </div>
                        </div>
                    </>

                }
            />
        </div>
    )
}

export default NotificationDetailsModal
