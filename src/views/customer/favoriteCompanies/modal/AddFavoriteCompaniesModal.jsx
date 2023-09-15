/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useFavoriteCompaniesStore, { addFavoriteCompany, getCompanyDetails, getNotFavoriteCompany } from '../../../../app/stores/customer/favoriteCompaniesStore';
import { iFavCompanyGray, iRedCancel } from '../../../../app/utility/imageImports';
import CommonButton from '../../../../components/button/CommonButton';
import CommonSearchBox from '../../../../components/input/CommonSearchBox';
import CompanyListItem from '../../../../components/listItems/CompanyListItem';
import CommonModal from '../../../../components/modal/CommonModal';
import RatingChipContent from '../../../common/createRequest/components/content/selectCompany/components/RatingChipContent';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import { useTranslation } from 'react-i18next';
import useSettingsStore from '../../../../app/stores/others/settingsStore';

const AddFavoriteCompaniesModal = () => {

    let { setShowCompanyDetailsModal, searchRating, setSearchRating, selectedNotFavId, setShowAddFavoriteCompaniesModal, showAddFavoriteCompaniesModal, notFavoriteCompanyList, setSelectedNotFavId, searchValueNotFavoriteCompany, setSearchValueNotFavoriteCompany } = useFavoriteCompaniesStore();

    const { setSelectedCompanyId } = useSettingsStore();

    useEffect(() => {
        getNotFavoriteCompany();
        setSearchValueNotFavoriteCompany("")
    }, [])

    const [searchValue] = useDebounce(searchValueNotFavoriteCompany, 500);

    const { t } = useTranslation();

    useEffect(() => {
        let stars = [];
        for (let i = searchRating; i <= 5; i++) {
            stars.push(i);
        }
        if(searchRating === 0) getNotFavoriteCompany(searchValue,[]);
        else getNotFavoriteCompany(searchValue, stars);
    }, [searchValue, searchRating])

    return (
        <div>
            <CommonModal
                showModal={showAddFavoriteCompaniesModal}
                setShowModal={setShowAddFavoriteCompaniesModal}
                modalTitle={t("Add New Favorite Company")}
                mainContent={
                    <>
                        <div className='mt-s20'>
                            <div className="w-full">
                                <CommonSearchBox
                                    name="searchKey"
                                    fullWidth={true}
                                    value={searchValueNotFavoriteCompany}
                                    onChange={(e) => { setSearchValueNotFavoriteCompany(e.target.value) }}
                                />
                            </div>
                            <div className='flex my-5 space-x-5'>
                                <div className='border-2 rounded-full py-s4 px-s16 w-fit' >
                                    <RatingChipContent value={searchRating}
                                        onChange={(event, newValue) => {
                                            setSearchRating(newValue)
                                        }}
                                    />
                                </div>

                                {searchValueNotFavoriteCompany !== "" &&
                                    <div>
                                        <div className='text-xs border-2 border-cMainBlue py-[6px] px-2 rounded-full flex items-center space-x-1 w-fit' >
                                            <div className='font-medium capitalize max-w-[180px] truncate'>
                                                {searchValueNotFavoriteCompany}
                                            </div>
                                            <div
                                                onClick={(e) => setSearchValueNotFavoriteCompany("")}
                                                className='cursor-pointer'><img src={iRedCancel} alt="" /></div>
                                        </div></div>}

                                <CommonButtonOutlined
                                    onClick={() => {
                                        setSearchValueNotFavoriteCompany("");
                                        setSearchRating(0);
                                    }}
                                    colorType='danger'
                                    isFullRounded={true}
                                    btnLabel={t('Clear')} />
                            </div>

                            <div className='mb-s20 text-fs16 font-fw600'>{t("Suggestion")} ( {notFavoriteCompanyList?.length} )</div>
                            <div className="grid grid-cols-2 gap-5 max-h-[300px] overflow-y-auto ">
                                {notFavoriteCompanyList?.length ?
                                    notFavoriteCompanyList?.map((item, index) => (
                                        <CompanyListItem
                                            key={index}
                                            index={index}
                                            title={item?.name}
                                            subTitleOne=""
                                            subTitleTwo=''
                                            rating={item?.rate ? Math.round(item?.rate) : 0}
                                            withCheckbox={true}
                                            withCloseIcon={true}
                                            selected={selectedNotFavId === item?.id}
                                            onSelect={() => { setSelectedNotFavId(item?.id) }}
                                            image={item?.image}
                                            dummyImage={iFavCompanyGray}
                                            onClick={async () => {
                                                await getCompanyDetails(item?.id, true);
                                                await setSelectedCompanyId(item?.company_id);
                                                setShowCompanyDetailsModal(true)
                                            }}
                                        />
                                    ))
                                    : <div className='items-center text-xl '>
                                        <span>{t("No Companies Found !")}</span>
                                    </div>}
                            </div>

                            <div className='flex justify-end mt-s20'>
                                <CommonButton
                                    isDisabled={selectedNotFavId ? false : true}
                                    onClick={async () => {
                                        const success = await addFavoriteCompany(true);
                                        if (success) {
                                            setSearchRating(0);
                                            setSearchValueNotFavoriteCompany("");
                                            setShowAddFavoriteCompaniesModal(false)
                                        }
                                    }}
                                    btnLabel={t('Add')}
                                    width="w-[110px]" />
                            </div>
                        </div>
                    </>
                }

            />
        </div>
    );
};

export default AddFavoriteCompaniesModal;