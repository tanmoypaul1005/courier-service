import React from 'react';
import useDriverStore from '../../../../app/stores/company/driverStore';
import CommonButton from '../../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import Image from '../../../../components/image/Image';
import { useTranslation } from 'react-i18next';

const DriverDetails = () => {

    const { setShowEditDriverModal, setShowDriverDeleteModal, driverDetails, setSelectedDriverDeleteId } = useDriverStore();

    const { t } = useTranslation();

    return (
        <>
            {driverDetails?.email ? <div className=''>
                <div className='flex justify-between'>
                    <span className='text-cMainBlack text-fs24 font-fw600'>{t("Driver Details")}</span>
                </div>
                <div className='flex flex-wrap md:flex-nowrap mt-s16'>
                    <div className='max-w-[160px] min-w-[160px]'>
                    <Image src={driverDetails?.image} roundedFull={true} className='w-[160px] h-[160px]' />
                    </div>

                    <div className="w-full mt-s20 md:mt-0 md:ml-s30">
                        <div>
                            <div className='text-cMainBlack text-fs24 font-fw600 mb-s8'>{t("Profile Info")}</div>
                            <div className='text-cMainBlack text-fs14 mb-s2'>
                                <span className='font-fw600 '>{t("Name")} : </span>
                                <span className='font-fw500 break-all capitalize'>{driverDetails?.name ? driverDetails?.name : 'NA'}</span></div>
                            <div className='text-cMainBlack text-fs14 mb-s2'>
                                <span className='font-fw600'>{t("Email")} : </span>
                                <span className='font-fw500 break-all'>{driverDetails?.email ? driverDetails?.email : 'NA'}</span></div>

                            <div className='text-cMainBlack text-fs14 mb-s2'>
                                <span className='font-fw600'>{t("Phone")} : </span>
                                <span className='font-fw500 break-all'>{driverDetails?.phone_from_driver ? driverDetails?.phone_from_driver : 'NA'}</span></div>

                            <div className='text-cMainBlack text-fs14'>
                                <span className='font-fw600'>{t("Instruction")} : </span>
                                <span className='font-fw500 break-all'>{driverDetails?.comment ? driverDetails?.comment : 'NA'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end space-x-4 mt-s20 items-center'>
                    <CommonButtonOutlined onClick={() => {
                        setSelectedDriverDeleteId(driverDetails?.id)
                        setShowDriverDeleteModal(true)
                    }} btnLabel={t('Delete')} colorType='danger' width='w-[100px]' />
                    <CommonButton onClick={() => { setShowEditDriverModal(true) }} btnLabel={t('Edit')} width='w-[100px]' />
                </div>
            </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
                {("Select list item to view details.")}
            </div>}
        </>
    );
};

export default DriverDetails;