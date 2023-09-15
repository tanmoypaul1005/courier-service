import { useState } from 'react';
import ReactPasswordChecklist from 'react-password-checklist';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { changePassword } from '../../../app/stores/others/authStore'
import { iLogo2 } from '../../../app/utility/imageImports';
import { changePageTitle, Toastr } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton'
import CommonInput from '../../../components/input/CommonInput';
import CommonLeftAuth from './components/CommonLeftAuth';


function ForgetPasswordUpdate() {
  changePageTitle('Limadi');
  const { forget_password_form, setForgetPasswordForm } = useAuthStore();
  const navigateTo = useNavigate();
  const [passValid, setPassValid] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (!passValid) return;
    const token = sessionStorage.getItem('forget_password_token');
    const email = sessionStorage.getItem('user_email');
    console.log('token', token, 'email', email);
    if (!token || !email) {
      Toastr({ message: 'Session Expired!' });
      navigateTo('/login');
      return;
    }
    changePassword(navigateTo, token, email, forget_password_form.new_password, forget_password_form.confirm_password);
  }



  return (

    <div className='flex flex-row w-full h-[100vh] overflow-y-auto'>

      <CommonLeftAuth title='Set New Password' />

      <div className='flex flex-col justify-center items-center custom:w-full w-1/2 h-[100vh]'>


        <img className='h-[10vh] custom:visible md:hidden' src={iLogo2} alt="" srcSet="" />

        <div className='text-fs40 font-fw600 mb-12'>{'Set New Password'}</div>

        <div className='w-full px-s20 sm:px-s90'>

          <form onSubmit={submitForm}>

            <CommonInput
              type='password'
              labelText='New Password'
              name={'new_password'}
              value={forget_password_form.new_password}
              onChange={setForgetPasswordForm}
              required={true}
              show_asterisk={false}
            />

            <CommonInput
              type='password'
              labelText='Confirm Password'
              name={'confirm_password'}
              value={forget_password_form.confirm_password}
              onChange={setForgetPasswordForm}
              required={true}
              show_asterisk={false}
            />

            <CommonButton btnLabel='Submit' type='submit' width='w-full' customStyle={'mt-6'} isDisabled={!passValid} />

            {<div className='text-fs16 font-fw500 text-cGrey text-center mt-9'>Already have an account? <span onClick={() => { navigateTo('/login') }} className='text-fs16 font-fw500 text-cBrand cursor-pointer'>Login</span></div>}

            {forget_password_form.new_password ?
              <div className='pt-s20 flex justify-start'>
                <ReactPasswordChecklist
                  rules={["minLength", "specialChar", "number", "capital", "lowercase", "match"]}
                  minLength={8}
                  value={forget_password_form.new_password}
                  valueAgain={forget_password_form.confirm_password}
                  onChange={(isValid) => { setPassValid(isValid) }}
                />
              </div> : <></>}

          </form>

        </div>

      </div>
    </div>
  )
}

export default ForgetPasswordUpdate
