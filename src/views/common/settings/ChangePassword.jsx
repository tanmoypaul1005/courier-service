/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ReactPasswordChecklist from 'react-password-checklist';
import useSettingsStore, { submitChangePassword } from '../../../app/stores/others/settingsStore';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton';
import CommonInput from '../../../components/input/CommonInput';
import SettingsTitle from './SettingsTitle';
import { useTranslation } from 'react-i18next';

function ChangePassword() {

    const { t } = useTranslation();

    const { changePasswordForm, setChangePasswordForm } = useSettingsStore();

    const [passValid, setPassValid] = useState(false);

    const handleCpChange = (e) => {
        setChangePasswordForm({ ...changePasswordForm, [e.target.name]: e.target.value.trim() });
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        let addSuccess = await submitChangePassword()
        if (addSuccess) {
            setChangePasswordForm({ old_password: "", password: "", password_confirmation: "" });
        }
    };

    useEffect(() => {
        changePageTitle(t('Settings | Change Password'));
    }, [])


    return (
        <div>
            <SettingsTitle title={t("Change Password")} />
            <form onSubmit={formSubmit}>
                <CommonInput
                    name="old_password"
                    type="password"
                    labelText={t('Current Password')}
                    value={changePasswordForm?.old_password}
                    required={true}
                    onChange={handleCpChange}
                    show_asterisk={false}
                />
                <CommonInput
                    name="password"
                    type="password"
                    labelText={t('Type New Password')}
                    value={changePasswordForm.password}
                    required={true}
                    onChange={handleCpChange}
                    show_asterisk={false} />
                <CommonInput
                    name="password_confirmation"
                    type="password"
                    labelText={t('Confirm Password')}
                    value={changePasswordForm.password_confirmation}
                    required={true}
                    onChange={handleCpChange}
                    show_asterisk={false} />

                <div className='flex justify-between mt-s18'>

                    {changePasswordForm.password ? <div className='flex justify-end'>
                        <ReactPasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "lowercase", "match"]}
                            minLength={8}
                            value={changePasswordForm.password}
                            valueAgain={changePasswordForm.password_confirmation}
                            onChange={(isValid) => { setPassValid(isValid) }}
                        />
                    </div> : <div></div>}

                    <div className=''>
                        <CommonButton
                            type='submit'
                            btnLabel={t('Change Password')}

                            isDisabled={!changePasswordForm?.old_password || !passValid}
                            width="w-[170px]"
                        />
                    </div></div>
            </form>

        </div>
    )
}

export default ChangePassword;
