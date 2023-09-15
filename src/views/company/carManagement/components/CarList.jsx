/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useCarStore, { getAllLicenseList } from '../../../../app/stores/company/carStore';
import { iCar } from '../../../../app/utility/imageImports';
import CommonEmptyData from '../../../../components/emptyData/CommonEmptyData';
import CommonListItem from '../../../../components/listItems/CommonListItem';
import CarDetails from '../CarDetails';
import { useTranslation } from 'react-i18next';

const CarList = () => {

    const { setAllCarList, selectedCarIndex, allCarList, setSelectedCarIndex, setCarDetails, setUpdateCarForm } = useCarStore();

    const { t } = useTranslation();

    useEffect(() => {
        fetchCarListAndLicense();
    }, []);

    const fetchCarListAndLicense = async () => {
        // await getAllCar();
        setSelectedCarIndex(0);
        await getAllLicenseList();
    }

    return (
        <div>
            {allCarList?.length > 0 ?
                <div className="mt-s20 grid grid-cols-12 gap-2 md:gap-8 2xl:gap-8">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="flex-col">
                            {allCarList?.map((item, index) => (
                                <div key={index} className=' mb-s20'>
                                    <CommonListItem
                                        onClick={async () => {
                                            setCarDetails(item);
                                            setUpdateCarForm(item);
                                            setAllCarList([item, ...allCarList?.filter(i => i?.id !== item?.id)])
                                            setSelectedCarIndex(0);
                                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                        }}
                                        selected={selectedCarIndex === index}
                                        imgCover={true}
                                        key={index}
                                        title={item?.name}
                                        subTitleOne={item?.car_license_plate_number}
                                        subTitleTwo={item?.comment}
                                        topRightComponent={item?.license_status === "no_license" ? "no license" : item?.license_status === "expire_warning" ? "about to expire" : item?.license_status}
                                        topRightComponentType={
                                            item?.license_status === "active" ? "success" : item?.license_status === "expired" || item?.license_status === "rejected" || item?.license_status === "no_license" ? "danger" : "warning"
                                        }
                                        withImage={true}
                                        imagePath={item?.image}
                                        imagePathDummy={iCar}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8"><CarDetails /></div>
                </div> : <CommonEmptyData
                    title={t('No Cars Found !')}
                    details={('There is no cars available now.')}
                    button={false}
                // btnLabel="Add New Car"
                // onclick={() => { setShowAddCarModal(true) }}
                />}
        </div>
    );
};

export default CarList;