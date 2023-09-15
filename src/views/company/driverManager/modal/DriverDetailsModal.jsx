import React from 'react'
import useDriverStore from '../../../../app/stores/company/driverStore';
import Image from '../../../../components/image/Image';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import CommonButton from '../../../../components/button/CommonButton';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

export default function DriverDetailsModal({ showModal, setShowModal }) {

  const { setShowEditDriverModal, setShowDriverDeleteModal, driverDetails, setSelectedDriverDeleteId, } = useDriverStore();

  const { t } = useTranslation();

  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalTitle={t("Driver Details")}
      mainContent={
        <>
          {driverDetails?.email ? <div className=''>

            <div className='flex flex-wrap md:flex-nowrap mt-s16'>
              <div className='max-w-[160px] min-w-[160px]'>
                <Image src={driverDetails?.image} roundedFull={true} className='w-[160px] h-[160px]' />
              </div>

              <div className="w-full mt-s20 md:mt-0 md:ml-s30">
                <div>
                  <div className='text-cMainBlack text-fs24 font-fw600 mb-s8'>{t("Profile Info")}</div>
                  <div className='text-cMainBlack text-fs14 mb-s2'>
                    <span className='font-fw600'>{t("Name")}: </span>
                    <span className='font-fw500 break-all '>{driverDetails?.name ? driverDetails?.name : 'NA'}</span></div>
                  <div className='text-cMainBlack text-fs14 mb-s2'>
                    <span className='font-fw600'>{t("Email")}: </span>
                    <span className='font-fw500 break-all'>{driverDetails?.email ? driverDetails?.email : 'NA'}</span></div>

                  <div className='text-cMainBlack text-fs14 mb-s2'>
                    <span className='font-fw600'>{t("Phone")}: </span>
                    <span className='font-fw500 break-all'>{driverDetails?.phone_from_driver ? driverDetails?.phone_from_driver : 'NA'}</span></div>

                  <div className='text-cMainBlack text-fs14'>
                    <span className='font-fw600'>{t("Instruction")}: </span>
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
              <CommonButton onClick={() => {
                setShowEditDriverModal(true);
                setShowModal(false);
              }} btnLabel={t('Edit')} width='w-[100px]' />
            </div>
          </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
           {t("Select list item to view details.")}
          </div>}
        </>
      }

    />
  )
}
