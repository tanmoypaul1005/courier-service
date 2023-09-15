import React from 'react'
import CommonModal from '../../../../../components/modal/CommonModal'
import useShiftStore from '../../../../../app/stores/company/shiftStore'
import CommonViewComponent from '../../../../../components/viewer/CommonViewComponent';
import ImageViewer from '../../../../../components/image/ImageViewer';
import RequestDetailsTextTitle from '../../../../common/requests/requestDetails/components/mainContents/components/RequestDetailsTextTitle';
import { formatTime } from '../../../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

const CustomStopDetails = () => {
    const { t } = useTranslation ();
    const { showCustomStopModal, setShowCustomStopModal, customStopModalData } = useShiftStore();
    const defineStatus = (status) => {
        if (status === 'init') return 'Not Started';
        if (status === 'hold') return 'On Hold';
        if (status === 'not_delivered') return 'Not Delivered';
        else return status;
    }

    return (
        <CommonModal
            showModal={showCustomStopModal}
            setShowModal={setShowCustomStopModal}
            modalTitle={t('Custom Stop Details')}
            mainContent={
                <div
                    onClick={() => { console.log('customStopModalData: ', customStopModalData); }}
                    className='pt-5 space-y-5'>
                    <CommonViewComponent capitalizedData={true} labelText={t('status')} 
                    value={defineStatus(customStopModalData?.status) ?? "NA"} />
                    <CommonViewComponent capitalizedData={true} labelText={t('stop type')} value={'Custom'} />
                    <CommonViewComponent capitalizedData={false} labelText={t('title')} value={customStopModalData?.title ?? "NA"} />
                    <CommonViewComponent capitalizedData={false} labelText={t('Time Range')} value={(formatTime(customStopModalData?.start_time) ?? "--") + ' - ' + formatTime(customStopModalData?.end_time) ?? "--"} />
                    <CommonViewComponent capitalizedData={false} labelText={t('comment')}value={customStopModalData?.comment ?? "NA"} />
                    {customStopModalData?.attachment ?
                        <ImageViewer src={customStopModalData?.attachment} label={t('Attachment')} />
                        : ''
                    }

                    <RequestDetailsTextTitle title={t(`Custom Stop Overview`)} className={'text-fs16 font-fw500'} />

                    <CommonViewComponent
                        labelText={t('Driver Comment')}
                        value={customStopModalData?.driver_comment ?? 'NA'}
                        className='my-[20px]'
                    />

                    <div className='flex flex-row items-center justify-start space-x-5 my-s20'>

                        {customStopModalData?.driver_attachment && <ImageViewer src={customStopModalData?.driver_attachment} label={t('Attachment')} />}
                        {customStopModalData?.driver_signature && <ImageViewer src={customStopModalData?.driver_signature} label={t('Signature')} is_signature={true} />}

                    </div>
                </div>
            }
        />
    )
}

export default CustomStopDetails