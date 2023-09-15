import React, { useState } from 'react';
import useCarStore, { updateCar } from '../../../../app/stores/company/carStore';
import { iCar } from '../../../../app/utility/imageImports';
import CommonButton from '../../../../components/button/CommonButton';
import CommonButtonOutlined from '../../../../components/button/CommonButtonOutlined';
import ProfileImageUploader from '../../../../components/imageUpload/ProfileImageUploader';
import CommonInput from '../../../../components/input/CommonInput';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const EditCarModal = () => {

    const { showEditCarModal, setShowEditCarModal, setShowCarDeleteModal, setUpdateCarForm, updateCarForm, carDetails } = useCarStore();
    const [imageUpdated, setImageUpdated] = useState(false);
    const { t } = useTranslation();

    return (
        <div>
            <CommonModal
                showModal={showEditCarModal}
                setShowModal={setShowEditCarModal}
                modalTitle={t("Edit Car")}
                mainContent={
                    <>
                        <div
                            onClick={() => { console.log('car edit data: ', updateCarForm, "carDetails : ", carDetails); }}
                            className='mt-s20'>
                            <div className='flex justify-center mb-s20'>
                                <ProfileImageUploader
                                    dummyImage={iCar}
                                    editMode={true}
                                    iImage={carDetails?.image ?? updateCarForm?.image}
                                    finalBase64={(e) => {
                                        setImageUpdated(true);
                                        setUpdateCarForm({ ...updateCarForm, image: e })
                                    }}
                                />
                            </div>
                            <form onSubmit={(e) => e.preventDefault()} className='col-span-12 lg:col-span-10'>

                                <div className='grid grid-cols-12 gap-6 md:gap-5 2xl:gap-5 mb-s20'>
                                    <div className='col-span-6'><CommonInput
                                        labelText={t('Car Name')}
                                        value={updateCarForm?.name}
                                        name={'name'}
                                        type='text'
                                        required={true}
                                        onChange={(e) => { setUpdateCarForm({ ...updateCarForm, name: e.target.value }) }}
                                        show_asterisk={false}
                                    /></div>

                                    <div className='col-span-6'>
                                        <CommonInput
                                            disabled={(updateCarForm?.license_status === 'expired' || updateCarForm?.license_status === 'rejected' || updateCarForm?.license_status === 'no_license') ? false : true}
                                            labelText={t('Car License Plate Number')}
                                            value={updateCarForm?.car_license_plate_number}
                                            name={'license'}
                                            max_input={9}
                                            required={true}
                                            onChange={(e) => { setUpdateCarForm({ ...updateCarForm, car_license_plate_number: e.target.value }) }}
                                            show_asterisk={false}
                                        /></div>
                                </div>

                                <div className=''>
                                    <CommonInput
                                        textarea={true}
                                        // max_input={255}
                                        labelText={t('Car Specification')}
                                        value={updateCarForm?.comment}
                                        name={'details'}
                                        required={true}
                                        onChange={(e) => {
                                            const trimmedValue = e.target.value.replace(/\s+/g, " ");
                                            setUpdateCarForm({ ...updateCarForm, comment: trimmedValue })
                                         }}
                                        show_asterisk={false}
                                    />
                                </div>

                                <div className='flex items-center justify-end mt-12 space-x-3'>
                                    <CommonButtonOutlined onClick={() => { setShowCarDeleteModal(true); }} btnLabel={t('Delete')} colorType='danger' width='w-[100px]' />
                                    <div className=''>
                                        <CommonButton
                                            onClick={async () => {
                                                if (updateCarForm?.name && updateCarForm?.car_license_plate_number && updateCarForm?.comment) {
                                                    let updateSuccess = await updateCar(updateCarForm, imageUpdated);
                                                    if (updateSuccess) {
                                                        setShowEditCarModal(false);
                                                        // setShowCarLicensePackageModal(true);
                                                    }
                                                }
                                            }}
                                            type='submit'
                                            colorType={(updateCarForm?.name && updateCarForm?.car_license_plate_number && updateCarForm?.comment) ? "primary" : "disable"}
                                            isDisabled={!(updateCarForm?.name && updateCarForm?.car_license_plate_number && updateCarForm?.comment) ? true : false}
                                            btnLabel={t('Save Changes')}

                                        /></div>
                                </div>
                            </form>
                        </div>
                    </>
                }
            />
        </div>
    );
};

export default EditCarModal;