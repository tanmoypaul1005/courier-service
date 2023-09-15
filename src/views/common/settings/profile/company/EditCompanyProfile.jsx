/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSettingsStore, { editProfile, getProfileDetails } from '../../../../../app/stores/others/settingsStore';
import { iEditGray } from '../../../../../app/utility/imageImports';
import { isValidUrl, Toastr } from '../../../../../app/utility/utilityFunctions';
import CommonButton from '../../../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../../../components/button/CommonButtonOutlined';
import ProfileImageUploader from '../../../../../components/imageUpload/ProfileImageUploader';
import AddressAutoComplete from '../../../../../components/input/AddressAutoComplete';
import CommonInput from '../../../../../components/input/CommonInput';
import CommonTitle from '../../../../../components/title/CommonTitle';
import CompanyEditForm from './CompanyEditForm';
import { useTranslation } from 'react-i18next';
import { checkAuthUser } from '../../../../../app/stores/others/authStore';

const EditCompanyProfile = () => {

    const navigateTo = useNavigate();

    const { t } = useTranslation();

    const {
        editCompanyProfile_form,
        profileDetails,
        setEditCompanyProfile_form,
        setCompanyProfileImage,
        companyProfileImage,
        termsData,
        setShowEditCompanyPolicyModal,
        setShowAboutCompanyModal
    } = useSettingsStore();

    const [updateFB, setUpdateFB] = useState("");
    const [updateTwitter, setUpdateTwitter] = useState("");
    const [updateLinkedin, setUpdateLinkedin] = useState("");

    const [doSearch, setDoSearch] = useState(false);
    const [addAddressLabel, setAddAddressLabel] = useState("");
    const [lat, setLat] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        fetchProfileDetails()
    }, [])

    const fetchProfileDetails = async () => {
        await getProfileDetails();
    }

    useEffect(() => {
        setEditCompanyProfile_form({
            ...editCompanyProfile_form,
            id: profileDetails?.id ?? "",
            name: profileDetails?.name ?? "",
            cvr: profileDetails?.cvr ?? "",
            email: profileDetails?.email ?? "",
            phone: profileDetails?.phone ?? "",
            address: profileDetails?.address ?? "",
            website: profileDetails?.website ?? "",
            lng: profileDetails?.lng,
            about: profileDetails?.about ?? ""
        });
        setAddAddressLabel(profileDetails?.address);
        setLat(profileDetails?.lat);
        profileDetails?.social_media?.length > 0 &&
            profileDetails?.social_media?.map((item, index) => (
                <div key={index}>
                    {item?.domain.includes("facebook") && setUpdateFB(item?.link)}
                    {item?.domain.includes("twitter") && setUpdateTwitter(item?.link)}
                    {item?.domain.includes("linkedin") && setUpdateLinkedin(item?.link)}
                </div>
            ))
    }, [profileDetails])

    const handleChange = async (name, value) => {
        console.log('name, value', name, value);
        if (name === "address") {
            setAddAddressLabel(value);
        } else if (name === "lat") {
            setLat(value);
        } else if (name === "lng") {
            setEditCompanyProfile_form({ ...editCompanyProfile_form, lng: value });
        } else if (name === "city") {
            // setEditCompanyProfile_form({ ...editCompanyProfile_form, city: value });
            setCity(value);
        }
    };

    const submitEditCompanyProfileForm = async () => {
        let body = {};
        let social_media = {};

        if (updateFB && !isValidUrl(updateFB)) {
            return Toastr({ message: t("Please Enter valid facebook url"), type: "warning" })
        } else if (updateTwitter && !isValidUrl(updateTwitter)) {
            return Toastr({ message: t("Please Enter valid twitter url"), type: "warning" })
        } else if (updateLinkedin && !isValidUrl(updateLinkedin)) {
            return Toastr({ message: t("Please Enter valid linkedin url"), type: "warning" })
        }
        else {
            social_media = JSON.stringify([
                {
                    domain: "facebook",
                    link: updateFB ?? ''
                },
                {
                    domain: "twitter",
                    link: updateTwitter ?? ''
                },
                {
                    domain: "linkedin",
                    link: updateLinkedin ?? ''
                }
            ]);
        }
        if (addAddressLabel === null || addAddressLabel === "") {
            body = {
                name: editCompanyProfile_form?.name ?? "",
                cvr: editCompanyProfile_form?.cvr ?? "",
                phone: editCompanyProfile_form?.phone ?? "",
                about: editCompanyProfile_form?.about ?? "",
                image: companyProfileImage ?? "",
                website: editCompanyProfile_form?.website ?? "",
                socials: social_media,
            };
        } else {
            if (lat && editCompanyProfile_form?.lng) {
                body = {
                    name: editCompanyProfile_form?.name,
                    cvr: editCompanyProfile_form?.cvr,
                    phone: editCompanyProfile_form?.phone ?? "",
                    about: editCompanyProfile_form?.about ?? "",
                    address: addAddressLabel ?? "",
                    city: city ?? "",
                    lat: lat ?? "",
                    lng: editCompanyProfile_form?.lng,
                    image: companyProfileImage ?? "",
                    website: editCompanyProfile_form?.website ?? "",
                    socials: social_media,
                };
            } else {
                console.log('body', body, lat, editCompanyProfile_form?.lng);
                return Toastr({ message: t("Invalid Address!"), type: "warning" })
            }
        }
        if (body.website) {
            if (isValidUrl(body?.website)) {
                const success = await editProfile(body);
                if (success) { 
                    navigateTo("/settings");
                    checkAuthUser();
                }
            } else {
                return Toastr({ message: t("Please Enter valid url"), type: "warning" })
            }
        } else {
            const success = await editProfile(body);
            if (success) { 
                navigateTo("/settings");
                checkAuthUser();
            }
        }
    }

    return (
        <div>
            <div className='flex flex-col items-center md:flex-row md:justify-between'>
                <CommonTitle icon={true} link="/settings" title={t("Edit Profile")} />
                <div className='flex items-center space-x-4 mt-s16 md:mt-0'>
                    <CommonButtonOutlined onClick={() => {
                        navigateTo("/settings/delete-account");
                    }} btnLabel={t("Delete")} colorType='danger' width='w-[100px]' />
                    <div className=''> <CommonButton btnLabel={t('Update')}
                        onClick={submitEditCompanyProfileForm} width='w-[100px]' /></div>
                </div>
            </div>
            <div className='flex items-center justify-center mt-s16'>
                <ProfileImageUploader
                    height='h-[160px]'
                    width='w-[160px]'
                    iImage={profileDetails?.image}
                    setImage={setCompanyProfileImage}
                />
            </div>
            <div className='mt-s16 text-fs24 text-cMainBlack font-fw600'>{t("Basic Info")}</div>

            <form>

                <CompanyEditForm />

                <div className='mb-s20'>
                    <AddressAutoComplete
                        // required={true} 
                        label={t("Address")}
                        placeholder={t("Type Address..")} name={"address"}
                        address={addAddressLabel} latName={"lat"} lngName={"lng"} city={'city'}
                        changeValue={handleChange} doSearch={doSearch}
                        setDoSearch={setDoSearch}
                        icon={false}
                    />
                </div>

                <div className='text-fs24 text-cMainBlack font-fw600 mt-s29 mb-s3'>{t("Social Links")}</div>

                <div className='mb-s20'>
                    <CommonInput labelText={t('Facebook')} value={updateFB} onChange={(e) => { setUpdateFB(e.target.value) }} />
                </div>

                <div className='mb-s20'>
                    <CommonInput labelText={t('Twitter')} value={updateTwitter} onChange={(e) => { setUpdateTwitter(e.target.value) }} />
                </div>


                <CommonInput labelText={t('LinkedIn')} onChange={(e) => { setUpdateLinkedin(e.target.value) }} value={updateLinkedin} />
                <div className='my-s24'>
                    <div className='flex'><div className='text-fs24 text-cMainBlack font-fw600 mb-s5 mr-s4'>{t("About Company")}</div><img onClick={() => {
                        setShowAboutCompanyModal(true)
                    }}
                        className='cursor-pointer'
                        src={iEditGray} alt="" /></div>
                    <div className='text-fs14 text-cMainBlack font-fw400 '>
                        {editCompanyProfile_form?.about ? <p className='max-w-full break-all truncate whitespace-pre-wrap text-fs14 text-cMainBlack font-fw400'>
                            {editCompanyProfile_form?.about === "null" || editCompanyProfile_form?.about === null ? 'NA' : editCompanyProfile_form?.about}
                        </p> : 'NA'}
                    </div>
                </div>

                <div className=''>
                    <div className='flex'>
                        <div className='text-fs24 text-cMainBlack font-fw600 mb-s5 mr-s4'>{t("Company Terms And Conditions")}</div>
                        <img onClick={() => { setShowEditCompanyPolicyModal(true) }} className='cursor-pointer' src={iEditGray} alt="" />
                    </div>
                    {termsData ? <div className='max-w-full break-all truncate whitespace-pre-wrap text-fs14 text-cMainBlack font-fw400' dangerouslySetInnerHTML={{ __html: termsData }} /> : 'NA'}
                </div>

            </form>
        </div>
    );
};

export default EditCompanyProfile;