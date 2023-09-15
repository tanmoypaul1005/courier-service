/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useState } from 'react';
import ReactPasswordChecklist from 'react-password-checklist';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { register } from '../../../app/stores/others/authStore';
import { iLogo2 } from '../../../app/utility/imageImports';
import { changePageTitle, Toastr } from '../../../app/utility/utilityFunctions';
import CommonButton from '../../../components/button/CommonButton'
import CommonInput from '../../../components/input/CommonInput';
import CommonLeftAuth from './components/CommonLeftAuth';

function Register() {

    changePageTitle('Limadi');
    const { register_form, setRegisterForm } = useAuthStore();
    const [isCustomerForm, setIsCustomerForm] = useState(true);
    const [passValid, setPassValid] = useState(false);
    const navigateTo = useNavigate();


    const submit = (e) => {
        e.preventDefault();
        if (!isCustomerForm && register_form.cvr.length !== 8) {
            Toastr({ message: 'Please enter a valid CVR', type: 'error' });
            return
        }

        register((isCustomerForm ? 'private' : 'company'), navigateTo);
    }

    const changeCvrNumber = (e) => {
        if (e.target.value.length > 8) return;
        if (e.target.value === '-' || e.target.value === '--') return;
        const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
        if (str.includes(e.target.value[e.target.value.length - 1])) return;
        const regex = /^[0-9]+$/
        const found = e.target.value.match(regex)
        found && setRegisterForm(e)
        register_form.cvr.length === 1 && setRegisterForm(e)
    }



    return (

        <div className='flex flex-row w-full bg-cBgSideBar'>

            <CommonLeftAuth title={isCustomerForm ? 'As a customer you must login or sign up to start journey with us.' : 'As a Company you must login or sign up to start journey with us.'} />

            <div className='flex flex-col justify-center items-center custom:w-full w-1/2 h-auto overflow-y-auto bg-cMainWhite'>

                <img className='h-[10vh] custom:visible md:hidden' src={iLogo2} alt="" srcSet="" />
                <div className='text-fs40 font-fw600 mb-12'>{isCustomerForm ? 'Customer Register' : 'Company Register'}</div>

                <div className="w-full px-s20 sm:px-s90">
                    <RadioGroup className="w-full" required={true} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">

                        <div className="flex flex-row items-center justify-between md:flex-wrap w-full">
                            <div className={`mb-s10 w-auto px-2 h-s44 flex justify-center border-[2px] rounded-br4 ${isCustomerForm ? 'bg-cMainWhite border-cMainBlue text-cMainBlue' : 'bg-cMainWhite text-cMainBlack'} `}>
                                <FormControlLabel
                                    value="Customer Sign Up" control={<Radio required={true} />}
                                    label={<Typography style={{ fontSize: '14px' }}>Customer</Typography>}
                                    checked={isCustomerForm} onChange={(e) => { setIsCustomerForm(true) }}
                                />
                            </div>
                            <div className={`mb-s10 md:mt-0 w-auto px-2 font-fw500 h-s44 flex justify-center border-[2px] rounded-br4 ${!isCustomerForm ? 'bg-cMainWhite border-cMainBlue text-cMainBlue' : 'bg-cMainWhite text-cMainBlack'} `}>
                                <FormControlLabel
                                    value="Company Sign Up" control={<Radio required={true} />}
                                    label={<Typography className="label-text" style={{ fontSize: '14px', fontWeight: '400' }}>Company</Typography>}
                                    checked={!isCustomerForm} onChange={(e) => { setIsCustomerForm(false) }}
                                />
                            </div>
                        </div>
                    </RadioGroup>

                    <form onSubmit={submit}>
                        {!isCustomerForm &&
                            <CommonInput
                                type='text'
                                labelText='CVR'
                                name={'cvr'}
                                value={register_form.cvr}
                                onChange={changeCvrNumber}
                                autoFocus={true}
                                required={true}
                                max_input={8}
                                min_input={8}
                                show_asterisk={false}
                            />}

                        <CommonInput
                            type='text'
                            labelText='Name'
                            name={'name'}
                            value={register_form.name}
                            onChange={setRegisterForm}
                            required={true}
                            show_asterisk={false}
                        />

                        <CommonInput
                            type='email'
                            labelText='Email'
                            name={'email'}
                            value={register_form.email}
                            onChange={setRegisterForm}
                            required={true}
                            show_asterisk={false}
                        />

                        <CommonInput
                            type='password'
                            labelText='Password'
                            name={'password'}
                            value={register_form.password}
                            onChange={setRegisterForm}
                            required={true}
                            show_asterisk={false}
                        />

                        <CommonInput
                            type='password'
                            labelText='Confirm Password'
                            name={'confirm_password'}
                            value={register_form.confirm_password}
                            onChange={setRegisterForm}
                            required={true}
                            show_asterisk={false}
                        />

                        <div className='mt-6'><CommonButton btnLabel='Register' type='submit' width='w-full'
                            isDisabled={isCustomerForm ? (!passValid || register_form.name.length === 0 || register_form.email.length === 0) : (!passValid || register_form.name.length === 0 || register_form.email.length === 0 || register_form.cvr.length === 0)} /></div>

                        {<div className='text-fs16 font-fw500 text-cGrey text-center mt-9'>Already have an account? <span onClick={() => { navigateTo('/login') }} className='text-fs16 font-fw500 text-cBrand cursor-pointer'>Login</span></div>}

                        {register_form.password ?
                            <div className='pt-s20 flex justify-start'>
                                <ReactPasswordChecklist
                                    rules={["minLength", "specialChar", "number", "capital", "lowercase", "match"]}
                                    minLength={8}
                                    value={register_form.password}
                                    valueAgain={register_form.confirm_password}
                                    onChange={(isValid) => { setPassValid(isValid) }}
                                />
                            </div> : <></>
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
