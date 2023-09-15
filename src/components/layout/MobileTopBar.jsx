import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../app/stores/others/authStore';
import useLayoutStore from '../../app/stores/others/layoutStore';
import { iUserAvatar, iWhiteLimadi, iWhiteMenu } from '../../app/utility/imageImports';


export default function MobileTopBar() {
    const { is_logged_in } = useAuthStore();

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isExtendDrawer, setIsExtendDrawer] = useState(false);

    return (
        <div className={`w-full flex items-start lg:hidden overflow-hidden transition-all duration-500 fixed top-0 z-index-130
                ${isOpenDrawer ? is_logged_in ? isExtendDrawer ? "h-[400px]" : "h-[400px]" : "h-[400px]" : "h-s60"}             
                bg-white`}>
            {/* ${is_logged_in ? isExtendDrawer ? "h-[521px]" : "h-[316px]" : "h-s60"} */}
            <TopBarLinks
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                isExtendDrawer={isExtendDrawer}
                setIsExtendDrawer={setIsExtendDrawer}
            />
        </div>
    )
}


const TopBarLinks = ({ isOpenDrawer, setIsOpenDrawer, isExtendDrawer, setIsExtendDrawer }) => {
    // const { t } = useTranslation();
    const navigateTo = useNavigate();

    const { is_logged_in } = useAuthStore();
    // const { loggedUser } = useUtilityStore();
    // const { setUserData } = useSettingsStore();
    const { setShowLogoutModal } = useLayoutStore();


    const fillAuthUserData = () => {

        let tempName = {
            target: {
                name: "name",
                value: "Abc",
            }
        }
        // setUserData(tempName)

        let tempEmail = {
            target: {
                name: "email",
                value: "sss",
            }
        }
        // setUserData(tempEmail)

        let tempPhone = {
            target: {
                name: "phone",
                value: "sss",
            }
        }
        // setUserData(tempPhone)

        let tempImage = {
            target: {
                name: "image_url",
                value: "lll",
            }
        }
        // setUserData(tempImage)
        // console.log(userData);
    }

    return (
        <div className={`flex flex-col justify-center items-start w-full capitalize bg-white text-fs16 font-fw400 `}>
            <div className=' flex justify-between items-center px-5 w-full bg-cBrand shadow-lg h-s60 '>
                <img onClick={() => navigateTo("/")} src={iWhiteLimadi} alt="app-logo" className="w-auto drop-shadow-md cursor-pointer h-s40" />
                <div className='flex flex-row-reverse items-center w-full '>
                    {/* <LanguageSwitch /> */}
                    <div className="pr-0"></div>
                    <div
                        onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                        className={`cursor-pointer ${isOpenDrawer ? "rotate-180" : "rotate-0"} transition-all duration-300 ease-in-out`}
                    >
                        {
                            !isOpenDrawer ? <img src={iWhiteMenu} alt="" className="w-auto h-[30px]" />
                                : <img src={iWhiteMenu} alt="" className="w-auto h-[30px]" />
                        }
                    </div>
                </div>
            </div>

            <div className='w-full h-full'>
                <div className="w-full bg-cBgDrawer">
                    {!is_logged_in ?
                        <div className={`px-s15 transition-all ease-in-out duration-500 overflow-hidden ${isExtendDrawer ? "h-[162px]" : "h-[70px]"}`}>
                            <div
                                // onClick={() => setIsExtendDrawer(!isExtendDrawer)} 
                                className='flex justify-between items-center pt-s15'>
                                <div className="flex items-center">
                                    <img src={iUserAvatar} alt="user-logo" className="object-cover rounded-full w-s35 h-s35" />
                                    {/* <img src={loggedUser?.image_url ? base_url_src + "/" + loggedUser?.image_url : ""} alt="user-logo" className="object-cover rounded-full w-s35 h-s35" /> */}
                                    <div className="flex flex-col justify-center pl-s10">
                                        <div>Akib Rahman</div>
                                        <div className='lowercase'>
                                            akib@gmail.com
                                        </div>
                                    </div>
                                </div>
                                {/* <FiChevronDown className={`text-3xl transition-all ease-in-out duration-500 ${isExtendDrawer ? "rotate-180" : "rotate-0"}`} /> */}
                            </div>

                            <div className="pt-5 pl-5 pb-s10" onClick={() => { fillAuthUserData(); }} >Edit Profile</div>
                            <div className="pl-5 py-s10" onClick={() => { }} >{("Change Password")}</div>

                        </div> : ""}
                </div>

                <div className="flex items-center pl-5 w-full cursor-pointer hover:bg-cBrand hover:text-white py-s10">{("create")}</div>
                <div className="flex items-center pl-5 w-full cursor-pointer hover:bg-cBrand hover:text-white py-s10">{("post cards")}</div>
                <div className="flex items-center pl-5 w-full cursor-pointer hover:bg-cBrand hover:text-white py-s10">{("shops")}</div>
                <div className="flex items-center pl-5 w-full cursor-pointer hover:bg-cBrand hover:text-white py-s10">{("contact us")}</div>
                {
                    is_logged_in && window.location.pathname === "/" ?
                        <>

                            <div className="pl-5 w-full cursor-pointer py-s16 hover:bg-cBrand hover:text-white" >
                                <Link to="/dashboard" >{("Go To Dashboard")}</Link>
                            </div>
                        </>
                        : ""
                }
                {
                    is_logged_in ?
                        <div onClick={() => setShowLogoutModal(true)} className="pl-5 w-full cursor-pointer py-s10 hover:bg-cBrand hover:text-white">{("Logout")}</div>
                        :
                        <div onClick={() => navigateTo('/login')} className="pl-5 w-full cursor-pointer py-s10 hover:bg-cBrand hover:text-white">{("Login")}</div>
                }
            </div>
        </div>
    )
}