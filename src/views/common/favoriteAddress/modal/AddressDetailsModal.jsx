import React from 'react'
import CommonModal from '../../../../components/modal/CommonModal'
import useFavoriteAddressStore from '../../../../app/stores/others/favoriteAddressStore'
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined'
import CommonButton from '../../../../components/button/CommonButton'
import { useTranslation } from 'react-i18next'

function AddressDetailsModal() {

    const { setShowEditFavoriteAddressModal, setShowFavoriteAddressDeleteModal, setSelectedFavoriteAddressDeleteId, favoriteAddressDetails, setShowFavoriteAddressDetailsModal, showFavoriteAddressDetailsModal } = useFavoriteAddressStore();

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showFavoriteAddressDetailsModal}
                setShowModal={setShowFavoriteAddressDetailsModal}
                modalTitle={t("Address Details")}
                mainContent={
                    <>
                        {favoriteAddressDetails?.title ? <div>
                            <div className='mt-s15'>
                                <div className='space-y-4'>
                                    <div className='flex flex-col  text-fs14 mb-s2'>
                                        <span className='font-fw600 text-fs10 text-cDisable'>{t("Title")}</span>
                                        <span className='mt-s4 text-fs14 text-cMainBlack font-fw400 break-all '>{favoriteAddressDetails?.title ? favoriteAddressDetails?.title : 'NA'}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className="font-fw600 text-fs10 text-cDisable">{t("Address")} </span>
                                        <a target={'_blank'} rel='noreferrer' href={`http://maps.google.com/?q=${favoriteAddressDetails?.address}`} className='mt-s4 text-fs14 text-cMainBlack font-fw400 break-all '>
                                            {favoriteAddressDetails?.address ? favoriteAddressDetails?.address : 'NA'}
                                        </a></div>

                                    <div className='flex flex-col'>
                                        <span className='font-fw600 text-fs10 text-cDisable'>{("Note")}: </span>
                                        <span className='mt-s4 text-fs14 text-cMainBlack font-fw400 break-all '>{favoriteAddressDetails?.note ? favoriteAddressDetails?.note : 'NA'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-s20 flex justify-end items-center space-x-4'>
                                <CommonButtonOutlined
                                    onClick={async () => {
                                        // await setShowFavoriteAddressDetailsModal(false)
                                        await setSelectedFavoriteAddressDeleteId(favoriteAddressDetails?.id)
                                        await setShowFavoriteAddressDeleteModal(true)
                                    }} btnLabel={t("Delete")} colorType='danger' width='w-[100px]' />

                                <div className=''>
                                    <CommonButton
                                        width='w-[100px]'
                                        type='submit'
                                        btnLabel={t('Edit')}
                                        onClick={() => {
                                            setShowFavoriteAddressDetailsModal(false)
                                            setShowEditFavoriteAddressModal(true)
                                        }}

                                    />
                                </div>
                            </div>
                        </div> : <div className='flex items-center justify-center h-[20vh] text-xl'>
                           {t("Select list item to view details.")}
                        </div>}
                    </>
                }
            />
        </div>
    )
}

export default AddressDetailsModal
