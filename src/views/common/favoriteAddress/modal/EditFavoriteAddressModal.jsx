import React, { useEffect, useState } from 'react';
import useFavoriteAddressStore, { addFavoriteAddress, editFavoriteAddress } from '../../../../app/stores/others/favoriteAddressStore';
import CommonButton from '../../../../components/button/CommonButton';
import AddressAutoComplete from '../../../../components/input/AddressAutoComplete';
import CommonInput from '../../../../components/input/CommonInput';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const EditFavoriteAddressModal = () => {

    const {
        setShowAddFavoriteAddressModal,
        setAddFavoriteAddress_form,
        showEditFavoriteAddressModal,
        addFavoriteAddress_form,
        setShowEditFavoriteAddressModal,
        setEditFavoriteAddress_form,
        favoriteAddressDetails,
        editFavoriteAddress_form
    } = useFavoriteAddressStore();

    const [doSearch, setDoSearch] = useState(false);
    const [addAddressLabel, setAddAddressLabel] = useState("");
    const [lat, setLet] = useState("");



    const handleChange = async (name, value) => {
        if (name === "address") {
            setAddAddressLabel(value);
        } else if (name === "lat") {
            setEditFavoriteAddress_form({ ...editFavoriteAddress_form, lat: value });
        } else if (name === "lng") {
            setEditFavoriteAddress_form({ ...editFavoriteAddress_form, lng: value });
        }
    };

    const submitEditFromData = async (e) => {
        e.preventDefault()
        await setEditFavoriteAddress_form({ ...editFavoriteAddress_form, address: addAddressLabel });
        const success = await editFavoriteAddress();
        if (success) {
            setShowEditFavoriteAddressModal(false);
        }
    }

    useEffect(() => {
        setEditFavoriteAddress_form({
            fav_id: favoriteAddressDetails?.id ?? "",
            title: favoriteAddressDetails?.title ?? "",
            address: favoriteAddressDetails?.address ?? "",
            note: favoriteAddressDetails?.note ?? "",
            lng: favoriteAddressDetails?.lng ?? "",
            lat: favoriteAddressDetails?.lat ?? "",
        })
        setAddAddressLabel(favoriteAddressDetails?.address ?? "")
    }, [favoriteAddressDetails, setEditFavoriteAddress_form])

    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showEditFavoriteAddressModal}
                setShowModal={setShowEditFavoriteAddressModal}
                modalTitle={t("Edit Favorite Address")}
                mainContent={
                    <>
                        <div className='mt-s22'>
                            <form onSubmit={submitEditFromData}>
                                <div className='mb-s5'>
                                    <CommonInput
                                        required={true}
                                        labelText={t('Address Title')}
                                        type='text'
                                        value={editFavoriteAddress_form?.title}
                                        name={'title'}
                                        onChange={(e) => { setEditFavoriteAddress_form({ ...editFavoriteAddress_form, title: e.target.value }) }}
                                    />
                                </div>
                                <div className='mb-s36'>
                                    <AddressAutoComplete
                                        required={true}
                                        label={t("Address")}
                                        placeholder={t("Type Address..")}
                                        name={"address"}
                                        address={addAddressLabel}
                                        latName={"lat"}
                                        lngName={"lng"}
                                        changeValue={handleChange}
                                        doSearch={doSearch}
                                        setDoSearch={setDoSearch}
                                        icon={false}
                                    />
                                </div>
                                <div className=''>
                                    <CommonInput
                                        labelText={t('Note')}
                                        onChange={(e) => {
                                            setEditFavoriteAddress_form({ ...editFavoriteAddress_form, note: e.target.value })
                                        }}
                                        type="text"
                                        value={editFavoriteAddress_form?.note}
                                        name={'note'}
                                        textarea={true}
                                        rows={2}
                                        max_input={'255'}
                                    />
                                </div>

                                <div className='flex justify-end space-x-4 mt-s25 items-center'>
                                    <div className=''>
                                        <CommonButton
                                            type='submit'
                                            btnLabel={t('Save Changes')}
                                            isDisabled={
                                                editFavoriteAddress_form?.title &&
                                                    editFavoriteAddress_form?.lng &&
                                                    editFavoriteAddress_form?.lat
                                                    && addAddressLabel ? false : true
                                            }
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                }

            />
        </div>
    );
};

export default EditFavoriteAddressModal;