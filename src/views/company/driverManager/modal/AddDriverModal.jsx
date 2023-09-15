import React from 'react'
import useDriverStore, { addDriver } from '../../../../app/stores/company/driverStore'
import CommonButton from '../../../../components/button/CommonButton';
import CommonInput from '../../../../components/input/CommonInput';
import CommonModal from '../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

function AddDriverModal() {

    const { showAddDriverModal, setShowAddDriverModal, addDriver_form, changeAddDriverForm, setAddDriver_form } = useDriverStore();

    const { t } = useTranslation();

    const submitForm = (e) => {
        e.preventDefault();

        const success = addDriver();
        if (success) {
            setShowAddDriverModal(false);
            setAddDriver_form({ name: "", email: "", phone: "", comment: "" })
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showAddDriverModal}
                setShowModal={setShowAddDriverModal}
                modalTitle={t("Add New Driver")}
                mainContent={
                    <>
                        <div className='mt-s20'>
                            <form onSubmit={submitForm}>
                                <div className='mb-s5'>
                                    <CommonInput
                                        labelText={t('Name')}
                                        value={addDriver_form?.name}
                                        type='text'
                                        name={'name'}
                                        required={true}
                                        max_input={55}
                                        onChange={(e) => { changeAddDriverForm(e) }}
                                    />
                                </div>

                                <div className='grid grid-cols-12 gap-6 md:gap-5 2xl:gap-5 mb-s20'>
                                    <div className='col-span-6'>
                                        <CommonInput
                                            labelText={t('Email')}
                                            value={addDriver_form?.email}
                                            type='email'
                                            name={'email'}
                                            required={true}
                                            onChange={(e) => {
                                                changeAddDriverForm(e)
                                            }}
                                        />
                                    </div>

                                    <div className='col-span-6'>
                                        <CommonInput
                                            labelText={t('Phone')}
                                            value={addDriver_form?.phone}
                                            // name={'phone'}
                                            type="tel"
                                            name={'phone' ?? ''}
                                            max_input={15}
                                            min_input={0}
                                            required={true}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const sanitizedInput = input.replace(/[^0-9+]/g, '');
                                                const sanitizedWithSinglePlus = sanitizedInput.replace(/\++/g, '+');
                                                const sanitizedWithMaxTwoPlus = sanitizedWithSinglePlus.replace(/\+/g, (match, index) => index === 0 ? match : '');
                                                setAddDriver_form({...addDriver_form,phone:sanitizedWithMaxTwoPlus})
                                            }}
                                        /></div>
                                </div>

                                <div className=''>
                                    <CommonInput
                                        textarea={true}
                                        max_input={255}
                                        labelText={t('Instruction')}
                                        value={addDriver_form?.comment}
                                        type='text'
                                        name={'comment'}
                                        onChange={(e) => { changeAddDriverForm(e) }}
                                    />
                                </div>

                                <div className='flex justify-end mt-s49'>
                                    <CommonButton
                                        width='w-[120px]'
                                        type='submit'
                                        btnLabel={t('Add Driver')}

                                        isDisabled={addDriver_form?.name &&
                                            addDriver_form?.email &&
                                            addDriver_form?.phone ? false : true
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    </>
                }

            />
        </div>
    )
}

export default AddDriverModal
