import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequestStore, { checkRequestStatus, getRequestDetails } from '../../../../app/stores/others/requestStore';
import { formatDate, formatTime, formatTimeHourMinutes } from '../../../../app/utility/utilityFunctions';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import ImageViewer from '../../../../components/image/ImageViewer';
import ShiftDetailsAndPlanModal from '../../../../components/modal/shiftDetailsAndPlanModal.jsx/ShiftDetailsAndPlanModal';
import CommonTopTitleSection from '../../../../components/title/CommonTopTitleSection';
import Summary from '../../../../components/utility/summary/Summary';
import CommonViewComponent from '../../../../components/viewer/CommonViewComponent';
import RequestDetailsTextTitle from '../../../common/requests/requestDetails/components/mainContents/components/RequestDetailsTextTitle';
import PlaceBid from '../../../common/requests/requestDetails/components/summary/components/PlaceBid';
import { useTranslation } from 'react-i18next';

const GlobalReqDetails = () => {
    // const { isSidebarOpen } = useLayoutStore();
    const [show_plan_tool_modal, setShowPlanToolModal] = useState(false);
    const { request_details } = useRequestStore();

    const { request_id } = useParams();

    const { t } = useTranslation();

    const requestSummaryContents = [
        {
            title: t('Status'),
            // description: (request_details?.status) ?? "NA",
            description: checkRequestStatus(request_details?.status) ?? "NA",
        },
        {
            title: t('Title'),
            description: request_details?.title ?? "NA",
        },
        {
            title: t('Transportation Type'),
            description: request_details?.transport_type ?? "NA",
            className: 'capitalize'
        },
        {
            title: t('Pickup Date'),
            description: formatDate(request_details?.pickup_date) ?? "NA",
        },
        {
            title: (request_details?.status === 'on-going' || request_details?.status === 'history') ? t('Picked Up Time') : t('Pickup Time'),
            description: (formatTime(request_details?.pickup_start_time) ?? "NA") + ' - ' + (formatTime(request_details?.pickup_end_time) ?? "NA"),
        },
        {
            title: t('Delivery Overview'),
            description: `${request_details?.stops?.length ?? 0} ${request_details?.stops?.length > 1 ? 'Stops' : 'Stop'} ( ${request_details?.products?.length ?? 0} ${request_details?.products?.length > 1 ? 'Packages' : 'Package'} )`,
        },
    ]

    useEffect(() => {
        console.log('request_id', request_id);
        getRequestDetails("invitation", request_id);
    }, [request_id]);
    return (
        <div>

            {/* top title bar */}
            <CommonTopTitleSection
                withBackLink='/global-request'
                title={t('Global Request Details')}

                rightSideComponent={
                    <div className='flex items-center space-x-2.5' >
                        <CommonButtonOutlined onClick={() => setShowPlanToolModal(true)} btnLabel={t('Available Shifts')} width='w-[150px]' />
                    </div>
                }
            />

            {/*v         right side section */}
            <div className='w-[355px] absolute right-0 top-[150px] mr-8'>
                <Summary content={requestSummaryContents} />
                {/* <div className="w-full py-2.5"><hr /></div> */}
                {/* <BiddingOverview /> */}
                <PlaceBid />
                {/* <div className="flex flex-row-reverse pt-5">
                    <CommonButton width='w-[120px]' btnLabel='place bid' />
                </div> */}
            </div>


            {/*b         main content (left) */}
            <div className='border border-cGrey p-3 space-y-2 w-[calc(100%-380px)]'>
                <RequestDetailsTextTitle title={t('pickup overview')} />

                <CommonViewComponent labelText={t('title')} value={request_details?.pickup_title ?? "NA"} />

                <CommonViewComponent labelText={t('type of transportation')} value={request_details?.transport_type ?? "NA"} />
                <CommonViewComponent labelText={t('pickup address')} value={request_details?.pickup_address ?? "NA"} />
                {/* <div className="flex items-center justify-between space-x-5">
                </div> */}

                {/* <div className="flex items-center space-x-5">
                </div> */}
                <CommonViewComponent labelText={t('pickup date')} value={request_details?.pickup_date ? formatDate(request_details?.pickup_date) : "NA"} />
                <CommonViewComponent labelText={t('pickup time')} value={formatTimeHourMinutes(request_details?.pickup_expected_time)} />

                <CommonViewComponent
                    labelText={t('comment')}
                    value={request_details?.pickup_comment ?? "NA"}
                />

                {request_details?.pickup_attachment &&
                    <ImageViewer src={request_details?.pickup_attachment} label={t('Attachment')}
                    />}

            </div>

            {
                request_details?.stops?.length > 0 ? request_details?.stops?.map((stop, index) => (

                    <div key={index} className='pt-5' >

                        {/* 2nd main content */}
                        <div className='border border-cGrey p-3 space-y-2 w-[calc(100%-380px)]'>
                            <RequestDetailsTextTitle title={`${t("delivery")} ` + (index + 1)} />

                            <CommonViewComponent labelText={t('delivery address')} value={stop?.address ?? "NA"} />
                            {/* <CommonViewComponent labelText='Delivery date' value={formatDate(stop?.date)} />
                            <CommonViewComponent labelText='Delivery time' value={formatTime(stop?.start_time)} /> */}

                            {/* list of products */}
                            {stop?.products?.length > 0 ? stop?.products?.map((product, index) => (

                                <CommonViewComponent key={index} labelText={t('Product')} value={product?.text ?? "NA"} />
                            ))
                                : ""
                            }

                            <CommonViewComponent
                                labelText={t('comment')}
                                value={stop?.comment ?? "NA"}
                            />

                            {stop?.attachment ?
                                <ImageViewer src={stop?.attachment} label={t('Attachment')} />
                                : ""
                            }
                        </div>

                    </div>
                ))
                    : ""
            }
            {
                request_details?.pickup_start_time && request_details?.pickup_date ?

                    <ShiftDetailsAndPlanModal
                        title=' '
                        showModal={show_plan_tool_modal}
                        setShowModal={setShowPlanToolModal}
                        start_time={request_details?.pickup_start_time}
                        end_time={request_details?.pickup_end_time}
                        start_date={request_details?.pickup_date}
                    />
                    : ""
            }
        </div >
    )
}

export default GlobalReqDetails