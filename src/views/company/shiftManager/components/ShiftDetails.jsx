/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useShiftStore, { getShiftDetails } from '../../../../app/stores/company/shiftStore'
import { calculateDistance, formatDate, formatTimeHourMinutes } from '../../../../app/utility/utilityFunctions'
import CommonButton from '../../../../components/button/CommonButton'
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined'
import CommonStopsList from '../../../../components/listItems/CommonStopsList'
import CommonTopTitleSection from '../../../../components/title/CommonTopTitleSection'
import SecondaryTitle from '../../../../components/title/SecondaryTitle'
import Summary from '../../../../components/utility/summary/Summary'
import ShiftDetailsTable from './ShiftDetailsTable'
import ShiftLogBookTable from './ShiftLogBookTable'
import ShiftOverView from './ShiftOverView'
import CustomStopListTable from './CustomStopListTable'
import { useTranslation } from 'react-i18next'

const ShiftDetails = () => {
    const {
        shiftDetailsData,
        setShowEditShiftModal,
        setShowDeleteShiftModal,
        shiftRouteList,
    } = useShiftStore();

    const [summaryData, setSummaryData] = useState([]);

    const { t } = useTranslation();

    const { shift_id } = useParams();

    const refreshCarAndDrivers = async () => {
        if(shift_id){
            await getShiftDetails(shift_id);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        refreshCarAndDrivers();

    }, [shift_id]);

    useEffect(() => {
        setSummaryData()
        if (shiftDetailsData?.is_maintenance === 1) {

            setSummaryData([
                // {
                //     title: t('Driver name'),
                //     description: shiftDetailsData?.driver_user?.name,
                // },
                {
                    title: t('License plate'),
                    description: shiftDetailsData?.car?.car_license_plate_number,
                },
                {
                    title: t('Shift date'),
                    description: formatDate(shiftDetailsData?.start_date),
                },
                {
                    title: t('End date'), description: formatDate(shiftDetailsData?.end_date)
                },
                {
                    title: t('Shift time'),
                    description: formatTimeHourMinutes(shiftDetailsData?.start_time ? shiftDetailsData?.start_time : "00:00:00") + ' - ' + formatTimeHourMinutes(shiftDetailsData?.end_time ? shiftDetailsData?.end_time : "00:00:00"),
                },
                // {
                //     title: t('Requests'),
                //     description: (shiftDetailsData?.reqs?.length ?? 0) + (shiftDetailsData?.reqs?.length > 1 ? ' requests' : ' request'),
                // },
                // {
                //     title: t('Stops'),
                //     description: (shiftDetailsData?.stops_count ?? 0) + (shiftDetailsData?.stops_count > 1 ? ' stops' : ' stop'),
                // },
                // {
                //     title: t('Packages'),
                //     description: (shiftDetailsData?.products_count ?? 0) + (shiftDetailsData?.products_count > 1 ? ' packages' : ' package'),
                // },
            ]);
        } else {
            setSummaryData([
                {
                    title: t('Driver name'),
                    description: shiftDetailsData?.driver_user?.name,
                },
                {
                    title: t('License plate'),
                    description: shiftDetailsData?.car?.car_license_plate_number,
                },
                {
                    title: t('Shift date'),
                    description: formatDate(shiftDetailsData?.start_date),
                },
                {
                    title: t('Shift time'),
                    description: formatTimeHourMinutes(shiftDetailsData?.start_time ? shiftDetailsData?.start_time : "00:00:00") + ' - ' + formatTimeHourMinutes(shiftDetailsData?.end_time ? shiftDetailsData?.end_time : "00:00:00"),
                },
                {
                    title: t('Requests'),
                    description: (shiftDetailsData?.reqs?.length ?? 0) + (shiftDetailsData?.reqs?.length > 1 ? ' requests' : ' request'),
                },
                {
                    title: t('Stops'),
                    description: (shiftDetailsData?.stops_count ?? 0) + (shiftDetailsData?.stops_count > 1 ? ' stops' : ' stop'),
                },
                {
                    title: t('Packages'),
                    description: (shiftDetailsData?.products_count ?? 0) + (shiftDetailsData?.products_count > 1 ? ' packages' : ' package'),
                },
            ])
        }
    }, [shiftDetailsData]);

    return (
        <div onClick={() => { console.log('shiftDetailsData', shiftDetailsData); }}>
            <CommonTopTitleSection
                withBackLink={"/shift-manager"}
                title={t('Shift Details')}
                rightSideComponent={
                    shiftDetailsData?.status === 'init' ?
                        <div className='flex xl:flex-row flex-col xl:items-center items-baseline space-y-2.5 xl:space-y-0 xl:space-x-2.5'>
                            <div className='flex items-center space-x-2.5' >
                                <CommonButtonOutlined btnLabel={t('Delete')} colorType='danger' onClick={() => setShowDeleteShiftModal(true)} />
                                <CommonButton
                                    btnLabel={t('Edit')}
                                    onClick={() => { setShowEditShiftModal(true); }}
                                />
                            </div>
                        </div>
                        : ""
                }
            />


            <div className='flex items-start h-full space-x-s30' >
                {/* b           LEFT SECTIONS MAIN */}
                <div className='w-full'>
                    {/*l         shift overview */}
                    <div className="w-full pb-6">
                        <ShiftOverView />
                    </div>
                    {
                        shiftDetailsData?.reqs?.length > 0 ?
                            <div className="w-full">
                                <ShiftDetailsTable dataArray={shiftDetailsData?.reqs} />
                            </div>
                            :
                            shiftDetailsData?.is_maintenance === 0 && <div className='w-full text-[24px] text-cTextGray limadi-semibold text-center pt-s100' >
                                {t("No request assigned to this shift yet!")}
                            </div>
                    }
                    {
                        shiftDetailsData?.custom_stops?.length > 0 ?
                            <div className="w-full pt-6">
                                <CustomStopListTable dataArray={shiftDetailsData?.custom_stops} />
                            </div>
                            :
                            shiftDetailsData?.is_maintenance === 0 && <div className='w-full text-[24px] text-cTextGray limadi-semibold text-center pt-s100' >
                                {t("No custom stops found in this shift!")}
                            </div>
                    }
                    {
                        // (shiftDetailsData?.status === 'complete' ||
                        //     shiftDetailsData?.status === 'ongoing' ||
                        //     shiftDetailsData?.status === 'break') &&

                            shiftDetailsData?.is_maintenance !== 1   ?
                            <div className="w-full pt-6">
                                <ShiftLogBookTable />
                            </div>
                            :
                            <div className='w-full text-[24px] text-cTextGray limadi-semibold text-center pt-s100' >
                                {/* {t("This shift is not started!")} */}
                            </div>
                    }
                    {
                        shiftDetailsData?.is_maintenance === 1 &&
                        <div className='w-full text-[24px] text-cTextGray limadi-semibold text-center pt-s100' >
                            {t("in maintenance")}
                        </div>
                    }
                </div>

                {/*e             right sections.. */}

                <div className='h-full max-w-[400px] min-w-[400px]'>
                    {/*l        shift summary */}
                    <Summary
                        content={summaryData}
                    />

                    {shiftDetailsData?.is_maintenance === 1 ? "" : <div className="p-4 my-4 border rounded-md border-cMainBlue">
                        <div className='text-base limadi-medium'>
                            {t("Shift Instruction")}
                        </div>
                        <div className="w-full pt-2 break-words">{shiftDetailsData?.comment ?? "NA"}</div>
                    </div>}

                    {/*b            route overview */}
                    {(shiftRouteList?.length > 0 && (shiftDetailsData?.status === 'ongoing' || shiftDetailsData?.status === 'break')) ?
                        <>
                            <div className='pt-5'>
                                {/* <SecondaryTitle title={'Route Overview (' + (dummyList?.length ?? 0) + ')'} /> */}
                                <SecondaryTitle title={`${t("Route Overview")} (` + (shiftRouteList?.length ?? 0) + ')'} />
                            </div>
                            <div className='space-y-5 pb-10 w-full'>
                                {
                                    // dummyList?.length > 0 ? dummyList?.map((item, index) =>
                                    shiftRouteList?.length > 0 ? shiftRouteList?.map((item, index) =>
                                    <div className="max-w-[320px] min-w-[320px]">
                                        <CommonStopsList
                                            key={index}
                                            totalKm={item?.status === 'hold' ? "0 KM": calculateDistance(item?.distance)?.distance +
                                                ' ' + calculateDistance(item?.distance)?.unit}
                                            time={item?.status === 'hold' ? "00:00": item?.approx_time ?? "00:00"}
                                            count={item?.q_index ?? "NA"}
                                            routeType={item?.stop_type}
                                            title={item?.title}
                                            subTitleOne={(item?.stop_details?.products?.length ?? 0) + ' Packages'}
                                            subTitleTwo={item?.address ?? "NA"}
                                            title_max_width='300'

                                            accentType={item?.status === 'hold' ? 'on_hold' : 'transparent'}

                                            accentBorderType={
                                                item?.status === 'hold' ? 'on_hold'
                                                    : item?.status === 'on_going' ? 'warning'
                                                        : item?.status === 'init' ? 'warning'
                                                            : item?.q_index && item?.status === 'un_optimized' ? 'danger'
                                                                : item?.status === 'complete' && item?.stop_status === 'not_delivered' ? 'base'
                                                                    : item?.status === 'complete' && item?.stop_status === 'delivered' ? 'base'
                                                                        : 'transparent'
                                            }

                                            circleColorType={
                                                item?.status === 'hold' || item?.status === 'on_going' ? 'warning'
                                                    : item?.status === 'init' ? 'warning'
                                                        : item?.q_index && item?.status === 'un_optimized' ? 'danger'
                                                            : item?.status === 'complete' && item?.stop_status === 'not_delivered' ? 'base'
                                                                : item?.status === 'complete' && item?.stop_status === 'delivered' ? 'base'
                                                                    : 'transparent'
                                            }

                                            topRightComponent={
                                                item?.q_index && item?.status === 'un_optimized' ? 'Not optimized'
                                                    :  item?.status === 'init' ? 'Not optimized'
                                                        : item?.status === 'complete' && item?.stop_status === 'delivered' ? 'Completed'
                                                            : item?.status === 'complete' && item?.stop_status === 'not_delivered' ? 'Completed'
                                                                : item?.status === 'on_going' ? 'Ongoing'
                                                                    : item?.status === 'hold' ? 'On Hold'
                                                                        : item?.status
                                            }

                                            topRightComponentType={
                                                item?.status === 'hold' ? 'on_hold'
                                                    : item?.status === 'on_going' ? 'warning'
                                                        : item?.status === 'init' ? 'warning'
                                                            : item?.q_index && item?.status === 'un_optimized' ? 'danger'
                                                                : item?.status === 'complete' && item?.stop_status === 'not_delivered' ? 'base'
                                                                    : item?.status === 'complete' && item?.stop_status === 'delivered' ? 'base'
                                                                        : 'transparent'
                                            }
                                        />
                                        </div>
                                    )
                                        : ""
                                }

                            </div>
                        </>
                        : ""
                    }
                </div>
            </div>
        </div>

    )
}

export default ShiftDetails