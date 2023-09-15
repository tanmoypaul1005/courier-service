import { useLocation, useNavigate } from 'react-router-dom';
import { iLogo2 } from '../../../app/utility/imageImports';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton'
import CommonInput from '../../../components/input/CommonInput';
import CommonLeftAuth from './components/CommonLeftAuth';
import { forgetPassword } from '../../../app/stores/others/authStore.js';
import { useState } from 'react';


function ForgotPassword() {

    changePageTitle('Limadi');
    const [email, setEmail] = useState("");

    const location = useLocation()
    const path_name = location.pathname;

    const navigateTo = useNavigate()

    const submit = (e) => {
        e.preventDefault();
        forgetPassword(email, navigateTo);
    }

    return (

        <div className='flex flex-row w-full h-[100vh] overflow-y-auto'>

            <CommonLeftAuth title='Please enter email to continue' />

            <div className='flex flex-col justify-center items-center custom:w-full w-1/2 h-[100vh]'>


                <img className='h-[10vh] custom:visible md:hidden' src={iLogo2} alt="" srcSet="" />

                <div className='text-fs40 font-fw600 mb-s12'>{path_name === '/forgot-password' && 'Forgot Password'}</div>

                <div className='w-full px-s20 sm:px-s90'>


                    <form onSubmit={submit}>
                        <CommonInput
                            type='email'
                            labelText='Email'
                            name={'email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus={true}
                            required={true}
                            show_asterisk={false}
                        />

                        <div className='mt-6'>
                            <CommonButton btnLabel='Submit' type='submit' width='w-full' />
                        </div>


                        {path_name === '/forgot-password' && <div className='text-fs16 font-fw500 text-cGrey text-center mt-9'>Already have an account? <span className='text-fs16 font-fw500 text-cBrand cursor-pointer' onClick={() => {
                            navigateTo('/login')
                        }}>Sign In</span></div>}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
