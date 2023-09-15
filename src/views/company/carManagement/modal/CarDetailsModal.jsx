import React, { useEffect, useState } from 'react'
import Image from '../../../../components/image/Image';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import CommonButton from '../../../../components/button/CommonButton';
import CommonModal from '../../../../components/modal/CommonModal';
import useCarStore from '../../../../app/stores/company/carStore';
import { iCar } from '../../../../app/utility/imageImports';
import { formatDate } from '../../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

export default function CarDetailsModal({ showModal, setShowModal }) {
  const { setShowEditCarModal, setShowCarLicensePackageModal, carDetails, setCarLicenseRenewID, setShowDetailsModal } = useCarStore();

  const [textColor, setTextColor] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    switch (carDetails?.license_status) {
      case 'expired':
        setTextColor('text-cRed');
        break;
      case 'rejected':
        setTextColor('text-cRed');
        break;
      case 'no_license':
        setTextColor('text-cRed');
        break;

      case 'pending':
        setTextColor('text-cBrand');
        break;
      case 'expire_warning':
        setTextColor('text-cBrand');
        break;
      case 'processing':
        setTextColor('text-cBrand');
        break;
      case 'active':
        setTextColor('text-cSuccess');
        break;

      default:
        break;
    }
  }, [carDetails?.license_status]);


  return (
    <CommonModal
      showModal={showModal}
      setShowModal={setShowModal}
      widthClass="w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[45vw]"
      modalTitle={<>
        <div className='flex items-baseline space-x-1'>
          <span className='text-cMainBlack text-fs24 font-fw600'>{t("Car Details")}</span>

          <div className={`${textColor} text-base font-fw600 capitalize`}>
            ({carDetails?.license_status === 'no_license' ? 'No License' : carDetails?.license_status === "expire_warning" ? "Expire soon" : carDetails?.license_status})
          </div>
        </div>
      </>}
      mainContent={
        <>{!carDetails ?
          <div className='flex items-center justify-center h-[20vh] text-xl'>
            {t("Select list item to view details.")}
          </div>
          :
          <div className=''>
            <div className='flex flex-wrap md:flex-nowrap mt-s16'>
              <div className='max-w-[160px] min-w-[160px] h-[164px] border-2 border-cDisable rounded-full'>
                <Image dummyImage={iCar} src={carDetails?.image} roundedFull={true} className='w-[160px] h-[160px]' />
              </div>

              <div className="w-full mt-s20 md:mt-0 md:ml-s30">
                {carDetails?.license_name ?
                  <div className='pb-4'>
                    <div className='text-cMainBlack text-fs24 font-fw600'>{t("License Info")}</div>
                    <div className='text-cMainBlack text-fs14'>
                      <span className='font-fw600'>{t("License Name")}: </span>
                      <span className='font-fw500'>{carDetails?.license_name ? carDetails?.license_name : 'NA'}</span>
                    </div>
                    <div className='text-cMainBlack text-fs14 my-s2'>
                      <span className='font-fw600'>{t("License Active On")}: </span>
                      <span className='font-fw500'>
                        {carDetails?.license_start ? carDetails?.license_start : 'NA'}
                      </span>
                    </div>

                    <div className='flex items-center text-cMainBlack text-fs14'>
                      <div className='font-fw600'>{t("License Expire On")}: </div>
                      <div className='font-fw500 pl-1'>
                        {carDetails?.license_end ? carDetails?.license_end : 'NA'}
                      </div>
                    </div>

                  </div>
                  : ""
                }

                <div>
                  <div className='text-cMainBlack text-fs24 font-fw600 mb-s8'>{t("Basic Info")}</div>

                  <div className='text-cMainBlack text-fs14 mb-s2'>
                    <span className='font-fw600'>{t('Car Name')}: </span>
                    <span className='font-fw500 break-all '>{carDetails?.name ? carDetails?.name : 'NA'}</span>
                  </div>

                  <div className='text-cMainBlack text-fs14'>
                    <span className='font-fw600'>{t("License Plate")}: </span>
                    <span className='font-fw500'>{carDetails?.car_license_plate_number ? carDetails?.car_license_plate_number : 'NA'}</span>
                  </div>

                  <div className='text-cMainBlack text-fs14'>
                    <span className='font-fw600'>{t("Car Specification")}: </span>
                    <span className='font-fw500 break-all'>{carDetails?.comment ?? 'NA'}</span>
                  </div>
                </div>


                <div className='flex flex-row items-center justify-end space-x-3 mt-s20'>

                  {/*b             edit button */}
                  <div>
                    {carDetails?.license_status === 'active' || carDetails?.license_status === 'processing' ?
                      <CommonButton
                        onClick={() => { setShowEditCarModal(true) }}
                        btnLabel={t('Edit')}
                        width='w-[100px]'
                      />
                      :
                      <CommonButtonOutlined
                        btnLabel={t('Edit')}
                        width='w-[100px]'
                        onClick={() => { setShowEditCarModal(true) }}
                      />
                    }
                  </div>

                  {/*e         license button */}
                  <div>
                    {
                      carDetails?.license_status === 'expire_warning' || carDetails?.license_status === 'expired' ?
                        <CommonButton
                          onClick={() => {
                            // setShowDetailsModal(false);
                            setShowModal(false);
                            setShowCarLicensePackageModal(true);
                            setCarLicenseRenewID(carDetails?.license_id);
                          }}
                          btnLabel={t('Renew License')}
                        />
                        : carDetails?.license_status === 'no_license' ?
                          <CommonButton
                            onClick={() => {
                              // setShowDetailsModal(false);
                              setShowModal(false)
                              setCarLicenseRenewID(carDetails?.license_id);
                              setShowCarLicensePackageModal(true);
                            }}
                            btnLabel={t('Apply for License')}
                          />
                          : carDetails?.license_status === 'rejected' ?
                            <CommonButton
                              onClick={() => {
                                // setShowDetailsModal(false);
                                setShowModal(false);
                                setCarLicenseRenewID(carDetails?.license_id);
                                setShowCarLicensePackageModal(true);
                              }}
                              btnLabel={t('Apply Again')}
                            />
                            : ''
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </>
      }

    />
  )
}
