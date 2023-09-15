/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore, { resendOtp, submitOtp } from '../../../app/stores/others/authStore';
import { k_submit_otp_type } from '../../../app/utility/const';
import { iLogo2 } from '../../../app/utility/imageImports';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton'
import CommonInput from '../../../components/input/CommonInput';
import CommonLeftAuth from './components/CommonLeftAuth';


function OtpVerification() {
    const { submit_otp_type } = useAuthStore();
    changePageTitle('Limadi');


    const location = useLocation()
    const path_name = location.pathname;
    // console.log('path name', path_name);

    const navigateTo = useNavigate();

    const [otp, setOtp] = useState("");

    useEffect(() => {
        // toggleVerify(false)
        startTimer()
        return () => clearInterval(interval)
    }, [])



    const submit = (e) => {
        e.preventDefault();
        if (submit_otp_type === k_submit_otp_type.auth_verify) {
            submitOtp(otp, navigateTo);
        } else {
            const email = sessionStorage.getItem('user_email');
            submitOtp(otp, navigateTo, email);
        }
    }

    const [timeout, setTimeout] = useState(false)
    const [time, setTime] = useState('02:00')

    let interval = null;

    const startTimer = () => {
        let minutes = 2, seconds = 0
        setTimeout(false)

        interval = setInterval(() => {
            let new_seconds;
            if (seconds === 0) new_seconds = '00';
            else if (seconds < 10) new_seconds = '0' + seconds;
            else new_seconds = seconds;

            const new_time = `0${minutes}:${new_seconds}`
            setTime(new_time)

            if (seconds === 0 && minutes > 0) {
                minutes--
                seconds = 60
            } else if (seconds === 0 && minutes === 0) {
                clearInterval(interval)
                setTimeout(true)
            }
            seconds--
        }, 1000)
    }


    return (

        <div className='flex flex-row w-full h-[100vh] overflow-y-auto'>

            <CommonLeftAuth title='Please enter OTP to continue' />

            <div className='flex flex-col justify-center items-center custom:w-full w-1/2 h-[100vh]'>


                <img className='h-[10vh] custom:visible md:hidden' src={iLogo2} alt="" srcSet="" />

                <div className='text-fs40 font-fw600 mb-s8'>{path_name === '/otp-verification' && 'OTP Verification'}</div>
                <div className='text-fs14 font-fw640 mb-2 text-cDisable'>{path_name === '/otp-verification' && 'We have sent an email with 4 digit OTP verification code'}</div>

                <div className='w-full px-s20 sm:px-s90'>

                    <form onSubmit={submit}>
                        <CommonInput
                            unnecessaryCharacters={true}
                            type='number'
                            labelText='Enter OTP'
                            name={'otp'}
                            value={otp}
                            min_input={4}
                            max_input={4}
                            onChange={(e) => {
                                const input = e.target.value;
                                const sanitizedInput = input.replace(/[^0-9+]/g, '');
                                const sanitizedWithSinglePlus = sanitizedInput.replace(/\++/g, '+');
                                const sanitizedWithMaxTwoPlus = sanitizedWithSinglePlus.replace(/\+/g, (match, index) => index === 0 ? match : '');
                                setOtp(sanitizedWithMaxTwoPlus)
                            }}
                            autoFocus={true}
                            required={true}
                            show_asterisk={false}
                        />
                        

                        <div className='mt-6'>
                            <CommonButton btnLabel='Continue' type='submit' width='w-full' />
                        </div>

                        {
                            timeout ?
                                <div className='flex justify-center'><div onClick={async () => {
                                    // const email = getLocalDataWithExpiry('user_email')
                                    const email = sessionStorage.getItem('user_email');
                                    let success = await resendOtp(email, navigateTo);
                                    success && startTimer();
                                }} className="text-xl cursor-pointer text-cBrand mt-s20">Resend OTP</div></div>
                                :
                                <div className='flex justify-center'><div className='text-cShadeBlueGray mt-s20'>
                                    Resend OTP code in <span id="time" className='text-cBrand'>{time} </span>
                                </div></div>
                        }

                        {<div className='text-fs16 font-fw500 text-cGrey text-center mt-9'>Already have an account? <span className='text-fs16 font-fw500 text-cBrand cursor-pointer' onClick={() => {
                            navigateTo('/login')
                        }}>Login</span></div>}

                    </form>

                    {/* <OtpSubmit/> */}
                </div>
            </div>
        </div>
    )
}

export default OtpVerification
