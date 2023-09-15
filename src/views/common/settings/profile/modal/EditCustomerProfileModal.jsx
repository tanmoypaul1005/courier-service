import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSettingsStore, { editProfile, getProfileDetails } from '../../../../../app/stores/others/settingsStore';
import { Toastr } from '../../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../../../components/button/CommonButtonOutlined';
import ProfileImageUploader from '../../../../../components/imageUpload/ProfileImageUploader';
import AddressAutoComplete from '../../../../../components/input/AddressAutoComplete';
import CommonInput from '../../../../../components/input/CommonInput';
import CommonModal from '../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';
import { checkAuthUser } from '../../../../../app/stores/others/authStore';


const EditCustomerProfileModal = () => {

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    const { showProfileEditModal, setShowProfileEditModal, profileDetails, setProfileImage, profileImage } = useSettingsStore();

    const [doSearch, setDoSearch] = useState(false);

    const [addAddressLabel, setAddAddressLabel] = useState("");

    const [lat, setLet] = useState("");

    const [editForm, setEditForm] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        lng: ""
    });

    useEffect(() => {
        fetchProfileDetails()
    }, [])

    const fetchProfileDetails = async () => {
        await getProfileDetails();
    }
    const handleChange = async (name, value) => {
        if (name === "address") {
            setAddAddressLabel(value);
        } else if (name === "lat") {
            setLet(value);
        } else if (name === "lng") {
            setEditForm({ ...editForm, lng: value });
        }
    };

    const submitCustomerEditData = async (e) => {
        console.log("addAddressLabel", addAddressLabel)
        e.preventDefault()
        await setEditForm({ ...editForm, image: profileImage });

        let body = {}
        if (addAddressLabel === "") {
            body = { id: editForm?.id, name: editForm?.name, email: editForm?.email, phone: editForm.phone }
        } else {
            if (lat && editForm.lng) {
                body = { id: editForm?.id, name: editForm?.name, email: editForm?.email, phone: editForm.phone, address: addAddressLabel, lat: lat, lng: editForm.lng, image: profileImage }
            } else {
                return Toastr({ message: "Invalid Address", type: "warning" })
            }

        }
        const profileEditSuccess = await editProfile(body)
        if (profileEditSuccess) {
            await checkAuthUser();
            await setShowProfileEditModal(false);
            await fetchProfileDetails();
            console.log("");

        }
    }

    useEffect(() => {
        setEditForm({
            id: profileDetails?.id,
            name: profileDetails?.name ?? "",
            email: profileDetails?.email ?? "",
            phone: profileDetails?.phone ?? "",
            address: profileDetails?.address ?? "",
            lng: profileDetails?.lng ?? ""
        });
        setAddAddressLabel(profileDetails?.address ?? "")
        setLet(profileDetails?.lat ?? "")
    }, [profileDetails])

    const handleInputChange = (event) => {
        const input = event.target.value;
        const sanitizedInput = input.replace(/[^0-9+]/g, '');
        const sanitizedWithSinglePlus = sanitizedInput.replace(/\++/g, '+');
        const sanitizedWithMaxTwoPlus = sanitizedWithSinglePlus.replace(/\+/g, (match, index) => index === 0 ? match : '');
        setEditForm({ ...editForm, phone: sanitizedWithMaxTwoPlus });
    };

    return (
        <div>
            <CommonModal
                showModal={showProfileEditModal}
                setShowModal={setShowProfileEditModal}
                modalTitle={t("Edit Profile")}
                mainContent={
                    <>
                        <div className='mt-s20'>
                            <div className='flex justify-center'>
                                <ProfileImageUploader height='h-[160px] w-[160px]' iImage={profileDetails?.image} setImage={setProfileImage} /></div>
                            <form onSubmit={submitCustomerEditData}>
                                <div className='mb-s20'>
                                    <CommonInput
                                        value={editForm.name}
                                        labelText={t('Name')}
                                        type='text'
                                        max_input={55}
                                        required={true}
                                        onChange={(e) => {
                                            setEditForm({ ...editForm, name: e.target.value });
                                        }}
                                    />
                                </div>
                                <div className='mb-s20'>
                                    <CommonInput
                                        disabled={true}
                                        type='email'
                                        required={true}
                                        value={editForm.email}
                                        labelText={t('Email')}
                                    />
                                </div>
                                <div className='mb-s20'>
                                    <CommonInput
                                        type="tel"
                                        labelText={t('Phone')}
                                        max_input={15}
                                        value={editForm.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='mb-s20'>

                                    <AddressAutoComplete
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

                                <div className='flex items-center justify-end space-x-4'>
                                    <CommonButtonOutlined onClick={() => {
                                        setShowProfileEditModal(false)
                                        navigateTo("/settings/delete-account");
                                    }} width="w-[100px]" btnLabel={t("Delete")} colorType='danger' />
                                    <CommonButton
                                        width="w-[160px]"
                                        type='submit'
                                        btnLabel={t('Save Changes')}
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

export default EditCustomerProfileModal;