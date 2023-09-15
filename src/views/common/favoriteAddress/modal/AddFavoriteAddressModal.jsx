import React, { useState } from 'react';
import useFavoriteAddressStore, { addFavoriteAddress } from '../../../../app/stores/others/favoriteAddressStore';
import CommonButton from '../../../../components/button/CommonButton';
import AddressAutoComplete from '../../../../components/input/AddressAutoComplete';
import CommonInput from '../../../../components/input/CommonInput';
import CommonModal from '../../../../components/modal/CommonModal';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AddFavoriteAddressModal = () => {

    const { t } = useTranslation();

    const {
        setShowAddFavoriteAddressModal,
        setAddFavoriteAddress_form,
        showAddFavoriteAddressModal,
        addFavoriteAddress_form
    } = useFavoriteAddressStore();

    const [doSearch, setDoSearch] = useState(false);
    const [addAddressLabel, setAddAddressLabel] = useState("");
    const [lat, setLet] = useState("");

    const submitAddFavoriteAddressForm = async (e) => {
        e.preventDefault();
        await setAddFavoriteAddress_form({ ...addFavoriteAddress_form, address: addAddressLabel, lat: lat });

        const successAddFavoriteAddress = await addFavoriteAddress();
        if (successAddFavoriteAddress) {
            setShowAddFavoriteAddressModal(false)
            setAddFavoriteAddress_form({
                title: "",
                address: "",
                note: "",
                lng: "",
                lat: "",
            })
            setAddAddressLabel("");
            setLet("");
        }
    }

    const handleChange = async (name, value) => {
        if (name === "address") {
            await setAddAddressLabel(value);
        } else if (name === "lat") {
            await setLet(value)
        } else if (name === "lng") {
            await setAddFavoriteAddress_form({ ...addFavoriteAddress_form, lng: value });
        }
    };

    useEffect(() => {
        setAddAddressLabel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAddFavoriteAddressModal === false])

    return (
        <div>
            <CommonModal
                showModal={showAddFavoriteAddressModal}
                setShowModal={setShowAddFavoriteAddressModal}
                modalTitle={t("Add New Favorite Address")}
                mainContent={
                    <>
                        <div className='mt-s22'>
                            <form onSubmit={submitAddFavoriteAddressForm}>
                                <div className='mb-s5'>
                                    <CommonInput
                                        min={'1'}
                                        type='text'
                                        labelText={t('Title')}
                                        required={true}
                                        value={addFavoriteAddress_form?.title}
                                        name={'title'}
                                        onChange={(e) => {
                                            setAddFavoriteAddress_form({ ...addFavoriteAddress_form, title: e.target.value })
                                        }} />
                                </div>
                                <div className='mb-s36'>
                                    <AddressAutoComplete
                                        required={true}
                                        label={t("Address")}
                                        placeholder={("Type Address..")}
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
                                    <CommonInput type='text'
                                        textarea={true}
                                        max_input={'255'}
                                        value={addFavoriteAddress_form?.note}
                                        name={'note'}
                                        rows={'2'}
                                        labelText={t('Note')}
                                        onChange={(e) => {
                                            setAddFavoriteAddress_form({ ...addFavoriteAddress_form, note: e.target.value })
                                        }}
                                    />
                                </div>

                                <div className='flex justify-end mt-s25'>
                                    <CommonButton
                                        type='submit'
                                        btnLabel={t('Add')}
                                        width="w-[100px]"
                                        isDisabled={
                                            addFavoriteAddress_form?.title &&
                                                addFavoriteAddress_form?.lng && lat
                                                && addAddressLabel ? false : true
                                        }


                                    />
                                </div>
                            </form>
                        </div>
                    </>
                }

            />
        </div>
    );
};

export default AddFavoriteAddressModal;