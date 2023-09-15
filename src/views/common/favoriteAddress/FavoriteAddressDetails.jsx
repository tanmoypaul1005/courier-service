import React from 'react';
import useFavoriteAddressStore from '../../../app/stores/others/favoriteAddressStore';
import CommonButton from '../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../components/button/CommonButtonOutlined';
import { useTranslation } from 'react-i18next';


const FavoriteAddressDetails = () => {

    const { favoriteAddressDetails, setShowEditFavoriteAddressModal, setSelectedFavoriteAddressDeleteId, setShowFavoriteAddressDeleteModal } = useFavoriteAddressStore();

    const { t } = useTranslation();

    return (
        <>
            {favoriteAddressDetails?.title ? <div>
                <div className='flex justify-between'>
                    <span className='text-cMainBlack text-fs24 font-fw500'>{t("Address Details")}</span>
                </div>
                <div className='mt-s15'>
                    <div>
                        <div className='text-cMainBlack text-fs14 mb-s2'>
                            <span className='font-fw600 '>{t("Title")} : </span>
                            <span className='font-fw500 break-all capitalize'>{favoriteAddressDetails?.title ? favoriteAddressDetails?.title : 'NA'}</span></div>
                        <div className='text-cMainBlack text-fs14 mb-s2'>
                            <span className='font-fw600'>{t("Address")} : </span>
                            <a target={'_blank'} rel='noreferrer' href={`http://maps.google.com/?q=${favoriteAddressDetails?.address}`} className='font-fw500 break-all'>
                                {favoriteAddressDetails?.address ? favoriteAddressDetails?.address : 'NA'}
                            </a></div>

                        <div className='text-cMainBlack text-fs14'>
                            <span className='font-fw600'>{t("Note")} : </span>
                            <span className='font-fw500 break-all'>{favoriteAddressDetails?.note ? favoriteAddressDetails?.note : 'NA'}</span>
                        </div>
                    </div>
                </div>

                <div className='mt-s20 flex justify-end items-center space-x-4'>
                    <CommonButtonOutlined
                        onClick={async () => {
                            await setSelectedFavoriteAddressDeleteId(favoriteAddressDetails?.id)
                            await setShowFavoriteAddressDeleteModal(true)
                        }} btnLabel={t("Delete")} colorType='danger' width='w-[100px]' />

                    <div className=''>
                        <CommonButton
                            width='w-[100px]'
                            type='submit'
                            btnLabel={t('Edit')}
                            onClick={() => {
                                setShowEditFavoriteAddressModal(true)
                            }}

                        />
                    </div>
                </div>
            </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
                {t("Select list item to view details.")}
            </div>}
        </>
    );
};

export default FavoriteAddressDetails;