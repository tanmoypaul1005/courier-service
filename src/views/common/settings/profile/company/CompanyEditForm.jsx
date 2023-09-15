import React from 'react';
import useSettingsStore from '../../../../../app/stores/others/settingsStore';
import CommonInput from '../../../../../components/input/CommonInput';
import { useTranslation } from 'react-i18next';
import { validatePhoneNumber } from '../../../../../app/utility/utilityFunctions';

const CompanyEditForm = () => {

    const { editCompanyProfile_form, setEditCompanyProfile_form, } = useSettingsStore();

    const { t } = useTranslation();

    const handleInputChange = (event) => {
        const input = event.target.value;
        const sanitizedInput = input.replace(/[^0-9+]/g, '');
        const sanitizedWithSinglePlus = sanitizedInput.replace(/\++/g, '+');
        const sanitizedWithMaxTwoPlus = sanitizedWithSinglePlus.replace(/\+/g, (match, index) => index === 0 ? match : '');
        setEditCompanyProfile_form({ ...editCompanyProfile_form, phone: sanitizedWithMaxTwoPlus })  
    };

    return (
        <div>
            <div className='grid grid-cols-12 gap-6 md:gap-8 2xl:gap-10 mb-s20'>
                <div className='col-span-6'>
                    <CommonInput
                        labelText={t('Name')}
                        value={editCompanyProfile_form?.name}
                        name={'name'} type='text' max_input={55}
                        onChange={(e) => { setEditCompanyProfile_form({ ...editCompanyProfile_form, name: e.target.value }) }}
                    />
                </div>
                <div className='col-span-6'>
                    <CommonInput
                        labelText={t('CVR')} disabled={true} name={'cvr'} type='number'
                        value={editCompanyProfile_form?.cvr}
                        onChange={(e) => { setEditCompanyProfile_form({ ...editCompanyProfile_form, cvr: e.target.value }) }}
                    />
                </div>
            </div>

            <div className='grid grid-cols-12 gap-6 md:gap-8 2xl:gap-10 mb-s20'>

                <div className='col-span-6'>
                    <CommonInput
                        disabled={true} labelText={t('Email')} type='email' name={'email'}
                        value={editCompanyProfile_form?.email}
                        onChange={(e) => { setEditCompanyProfile_form({ ...editCompanyProfile_form, email: e.target.value }) }}
                    />
                </div>

                <div className='col-span-6'>
                    <CommonInput
                        labelText={t('Phone')}
                        type="tel"  name='phone' max_input={15}
                        value={editCompanyProfile_form?.phone}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className='mb-s20'>
                <CommonInput
                    labelText={t('Website' )}name={'website'} type='text'
                    value={editCompanyProfile_form?.website}
                    onChange={(e) => { setEditCompanyProfile_form({ ...editCompanyProfile_form, website: e.target.value }) }}
                />
            </div>
        </div>
    );
};

export default CompanyEditForm;