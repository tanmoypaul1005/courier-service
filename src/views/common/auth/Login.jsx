import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore, { login } from '../../../app/stores/others/authStore'
import { iLogo2 } from '../../../app/utility/imageImports';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton'
import CommonCheckbox from '../../../components/input/CommonCheckbox';
import CommonInput from '../../../components/input/CommonInput';
import CommonLeftAuth from './components/CommonLeftAuth';


function Login() {
    const { login_form, changeLoginForm, is_logged_in, is_verified } = useAuthStore();
    const [remember_me, setRememberMe] = useState(false);
    const navigateTo = useNavigate();
    const location = useLocation();
    const path_name = location.pathname;
    changePageTitle('Limadi');

    const submitForm = (e) => {
        e.preventDefault();
        login(navigateTo, remember_me);
    }


    if (is_logged_in && is_verified) return <Navigate to="/" />;

    return (

        <div className='flex flex-row w-full h-[100vh] overflow-y-auto'>

            <CommonLeftAuth title='Please Login to Continue' />

            <div className='flex flex-col justify-center items-center custom:w-full w-1/2 h-[100vh]'>


                <img className='h-[10vh] custom:visible md:hidden' src={iLogo2} alt="" srcSet="" />

                <div className='text-fs40 font-fw600 mb-12'>{path_name === '/login' ? 'Login' : 'Admin Login'}</div>

                <div className='w-full px-s20 sm:px-s90'>


                    <form onSubmit={submitForm}>
                        <CommonInput
                            type='email'
                            labelText='Email'
                            name={'email'}
                            value={login_form.email}
                            onChange={(e) => changeLoginForm(e)}
                            autoFocus={true}
                            required={true}
                            show_asterisk={false}
                        />


                        <CommonInput
                            type='password'
                            labelText='Password'
                            name={'password'}
                            value={login_form.password}
                            onChange={changeLoginForm}
                            required={true}
                            show_asterisk={false}
                        />

                        <div className='flex flex-row items-center justify-between space-x-4 mb-4 pt-3'>
                            <div className='flex flex-row justify-start items-center space-x-0 text-fs14 font-fw400 text-cGrey'>
                                <CommonCheckbox checked={remember_me} onChange={() => setRememberMe(!remember_me)} />
                                <div onClick={() => setRememberMe(!remember_me)} className='cursor-pointer'>Remember me</div>
                            </div>

                            <div onClick={() => { navigateTo('/forgot-password') }} className='text-fs14 font-fw400 text-cGrey hover:text-cBrand cursor-pointer'>{path_name === '/login' ? 'Forget Password?' : ''}</div>
                        </div>

                        <CommonButton btnLabel='Login' type='submit' width='w-full' />

                        {path_name === '/login' && <div className='text-fs16 font-fw500 text-cGrey text-center mt-9'>Don't have an account?
                            <span onClick={() => {
                                navigateTo('/register')
                            }} className='text-fs16 font-fw500 text-cBrand cursor-pointer'> Register</span></div>}

                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login
