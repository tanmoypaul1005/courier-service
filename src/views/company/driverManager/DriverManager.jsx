/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import useDriverStore, { getDrivers, searchDriver } from '../../../app/stores/company/driverStore';
import { iWhitePlus } from '../../../app/utility/imageImports';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton';
import CommonSearchBox from '../../../components/input/CommonSearchBox';
import CommonTitle from '../../../components/title/CommonTitle';
import { useDebounce } from 'use-debounce';
import DriverListAndDetails from './components/DriverListAndDetails';
import DriverManagerTable from './DriverManagerTable';
import { useTranslation } from 'react-i18next';

const DriverManager = () => {

    const { setAddDriver_form, setShowAddDriverModal, driverList, driverSearchValue, setDriverSearchValue } = useDriverStore();

    const [searchValue] = useDebounce(driverSearchValue, 500);

    const { t } = useTranslation();

    useEffect(() => {
        changePageTitle(t("Limadi | Driver Manager"))
        // setDriverSearchValue("")
    }, [])

    useEffect(() => {
        searchDriver(searchValue)
    }, [searchValue])

    return (
        <div>
            <div className='hidden'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:flex-wrap md:flex-nowrap'>
                    <CommonTitle
                        withReloader={true}
                        onReload={async () => {
                            await setDriverSearchValue("")
                            await getDrivers();
                        }}
                        title={t("Driver Manager")} count={driverList?.length} />
                    <div className='flex flex-col md:flex-row md:justify-between mt-s16 md:mt-0'>
                        <CommonSearchBox
                            onChange={(e) => { setDriverSearchValue(e.target.value) }}
                            name="searchKey"
                            value={driverSearchValue}
                        />
                        <div className='mt-s16 md:mt-0 md:ml-s10 '>
                            <CommonButton
                                onClick={() => {
                                    setAddDriver_form({ email: "", name: "", phone: "", comment: "" })
                                    setShowAddDriverModal(true)
                                }}
                                btnLabel={t('Add Driver')}
                                icon={iWhitePlus}
                                width="w-[140px]" /></div>
                    </div>
                </div>

                <DriverListAndDetails />
            </div>

            <DriverManagerTable tableTitleClassName={'title'} />
        </div>
    );
};

export default DriverManager;