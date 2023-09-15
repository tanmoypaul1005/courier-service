/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useSettingsStore, { getToggleNotificationState, handleNotificationToggle, toggleAdminAccess } from "../../../app/stores/others/settingsStore";
import { changePageTitle } from "../../../app/utility/utilityFunctions";
import CommonButton from "../../../components/button/CommonButton";
import CommonSettingsItems from "../../../components/settings/Components/CommonSettingsItems";
import CommonTitle from "../../../components/title/CommonTitle";
import { useTranslation } from "react-i18next";

const Settings = (props) => {

    const navigate = useNavigate();

    const location = useLocation();

    const { t } = useTranslation();

    const { setContactForm,
        setChangePasswordForm,
        pushNotification,
        emailNotification,
        adminAccess
    } = useSettingsStore();


    const AdminItem = [
        { value: t('Off'), checked: !adminAccess ? true : false, onChange: () => { toggleAdminAccess() } },
        { value: t('On'), checked: adminAccess ? true : false, onChange: () => { toggleAdminAccess() } },//Radio Button Value
    ]

    const EmailItem = [
        { value: t('Off'), checked: !emailNotification ? true : false, onChange: () => { handleNotificationToggle({ "is_email": false }, "is_email") } },
        { value: t('On'), checked: emailNotification ? true : false, onChange: () => { handleNotificationToggle({ "is_email": true }, "is_email") } },//Radio Button Value
    ]

    const NotificationItem = [
        { value: t('Off'), checked: !pushNotification ? true : false, onChange: () => { handleNotificationToggle({ "is_push": false }, "is_push") } },
        { value: t('On'), checked: pushNotification ? true : false, onChange: () => { handleNotificationToggle({ "is_push": true }, "is_push") } },//Radio Button Value
    ]


    useEffect(() => {
        fetchEmailAndNotification()
        changePageTitle(t('Settings | Profile'));
    }, [])

    const fetchEmailAndNotification = async () => {
        await getToggleNotificationState()
    }

    let user = JSON.parse(localStorage.getItem('user'));

    const role = user.role === 'private' ? 'Customer' : 'Company';

    return (
        <div className="">
            <div className="flex justify-between">
                <CommonTitle title={t("Settings")} />
                <div>
                    {location.pathname === "/settings" && role === 'Company' ?
                        <CommonButton
                            onClick={() => { navigate("/settings/company-profile/edit") }}
                            btnLabel={t('Edit')} width='w-[100px]' /> : ''}
                    {/* { location.pathname === "/settings/company-profile/edit" && role === 'Customer' ? } */}
                </div>
            </div>
            <div className="mb-s20"></div>
            <div className="grid grid-cols-12 gap-6 md:gap-8 2xl:gap-8">
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4">
                    <div className="flex-col">
                        <div className="mb-s8">
                            <CommonSettingsItems
                                onClick={() => {
                                    navigate('/settings')
                                }}
                                title={t("Profile")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={location.pathname === '/settings' || location.pathname === "/settings/company-profile/edit"}
                            />
                        </div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                }}
                                hasSwitch={true}
                                item={AdminItem}
                                title={t("Admin access")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={false}
                            />
                        </div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                }}
                                hasSwitch={true}
                                item={EmailItem}
                                title={t("E-mail Notification")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={false}
                            />
                        </div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                }}
                                hasSwitch={true}
                                item={NotificationItem}
                                title={t("Push Notification")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={false}
                            />
                        </div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                    navigate('/settings/change-password')
                                    setChangePasswordForm({ old_password: "", password: "", password_confirmation: "" });
                                }}
                                title={t("Change Password")}

                                className={"mb-[5px] mt-[5px]"}
                                selected={location.pathname === '/settings/change-password' && true}
                            /></div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                    navigate('/settings/language')
                                }}
                                title={t("Language")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={location.pathname === '/settings/language' && true}
                            /></div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                    navigate('/settings/terms-conditions')
                                }}
                                title={t("Terms & Conditions")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={location.pathname === '/settings/terms-conditions' && true}
                            /></div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                    navigate('/settings/contact');
                                    setContactForm({ message: "", subject: "" });
                                }}
                                title={t("Contact Limadi")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={location.pathname === '/settings/contact' && true}
                            />
                        </div>

                        <div className="mb-s15">
                            <CommonSettingsItems
                                onClick={() => {
                                    navigate('/settings/faq')
                                }}
                                title={t("FAQ")}
                                className={"mb-[5px] mt-[5px]"}
                                selected={location.pathname === '/settings/faq' && true}
                            />
                        </div>

                    </div>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8">
                    <div className="">
                        {props?.children}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
