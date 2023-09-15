/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useState } from 'react';
import useGeneralStore from '../../../app/stores/others/generalStore';
import useSettingsStore, { fetchDeleteAccountRequirements } from '../../../app/stores/others/settingsStore';

import { changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton';
import CommonTitle from '../../../components/title/CommonTitle';
import { useTranslation } from 'react-i18next';

const DeleteAccount = () => {

    const { delete_account_requirements, setShowDeleteAccountModal } = useSettingsStore();

    const [is_checked, setIsChecked] = useState(false);

    const { user_role } = useGeneralStore();

    const { t } = useTranslation();

    useEffect(() => {
        fetchData();
        changePageTitle(t('Settings | Delete Account'));
    }, [])

    //TODO:: get user role from settingsStore
    const role = user_role === 'private' ? 'customer' : 'company'; //todo:: use role from const file

    const fetchData = async () => {
        await fetchDeleteAccountRequirements(`${role}`)
    }

    const link = role === 'customer' ? '/settings' : "/settings/company-profile/edit";

    return (
        <div>
            <CommonTitle link={`${link}`} title={t('Delete Account')} icon={true} />

            <div>
                <div className='text-fs24 font-fw500 text-cMainBlack my-s20'>{t("Read carefully before you proceed!")}</div>
                <div
                    className="text-fs13 font-fw400 text-cMainBlack whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: delete_account_requirements?.description ?? '' }} />


                <div className="flex flex-row py-5 items-center">
                    <input
                        id="checkDelete"
                        className="mr-2 accent-red-500"
                        type="checkbox"
                        name=""
                        value={is_checked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label
                        htmlFor="checkDelete"
                        className="font-regular text-fs14 text-cMainBlack select-none cursor-pointer"
                    >
                        {t("I agree to delete this account with knowing my losses of deleting this account.")}
                    </label>
                </div>

                <div className="flex justify-start">
                    <CommonButton
                        isDisabled={!is_checked}
                        colorType={is_checked ? "danger" : "basic"}
                        btnLabel={t("Delete Account")}

                        onClick={() => {
                            setShowDeleteAccountModal(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;