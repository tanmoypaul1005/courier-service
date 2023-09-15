/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { TextField, ThemeProvider } from '@mui/material';
// import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { iHidePass, iInformation, iShowPass } from '../../app/utility/imageImports';
import { theme, theme2 } from '../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

// author: @zamanshahed

// use for normal text input field and textarea input field
// form validations are handleable by default way

const CommonInput = ({
    type = "text",                              //allowed types: text, password, email, number, 
    labelText = "__some input title__",         //enter a label string or enter empty string for no label
    value = "",
    onChange = () => { },
    name = null,
    onClick,
    max_input,
    min_input,
    is_readonly = false,
    className,
    classNameT,
    textarea = false,                           //if true, input field will be a textarea
    textareaWithoutBorderBottom = true,         //if true, input field will be a textarea
    rows = 3,
    max_rows = 5,
    togglePasswordBtn = false,                  //if true, toggle password hide/show button will be shown
    required = false,
    show_asterisk = true,
    disabled = false,
    min = 0,
    max,
    autoFocus = false,
    unnecessaryCharacters = false,
    multiline = true,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [inputOnFocus, setInputOnFocus] = useState(false);
    const [inputEmpty, setInputEmpty] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [charCount, setCharCount] = useState(0);

    const { t } = useTranslation();
    // to validate numeric input length and force to stop input if limit exceeds
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData("text/plain");
        const numericValue = pastedData.replace(/\D/g, ""); // Use regex to remove non-numeric characters
        setInputValue(numericValue);
        event.preventDefault(); // Prevent the default paste behavior
      };

    useEffect(() => {
        setInputValue(value);
        if (value) setInputEmpty(false);
        if (inputValue) setInputEmpty(false);
        else setInputEmpty(true);

        setCharCount(value?.length);
    }, [value, inputValue]);


    return (
        <div className={`relative bg-white w-full  mt-s15 ${className}`}>
            {<ThemeProvider theme={show_asterisk ? theme2 : theme}>
                <TextField
                    onPaste={type === "number" && handlePaste}
                    id="standard-basic"
                    variant="standard"
                    label={type === "date" ? " " : labelText}
                    onFocus={() => setInputOnFocus(true)}
                    onBlur={() => setInputOnFocus(false)}
                    onEmptied={() => setInputEmpty(true)}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    required={required}
                    onClick={onClick}
                    name={name}

                    multiline={textarea ? multiline ?? true : false}
                    minRows={rows ?? 3}
                    maxRows={max_rows ?? 5}

                    // data-date-format={type === "date" ? "DD MMMM YYYY" : ""}

                    inputProps={{
                        readOnly: is_readonly,
                        maxLength: max_input ? max_input : textarea ? 500 : 4096,
                        minLength: min_input ? min_input : 0,
                        autoFocus: autoFocus,
                        min: min,
                        max: max,
                        // step: 3600,
                    }}
                    onKeyDown={(e) => {
                        if (type === "date") e.preventDefault();
                        if (type === 'number' && ["e", "E", "+", "-","/", "*", "#", "<", ">", "-", ".", "," ,"e",".e"].includes(e.key)) e.preventDefault();
                    }}
                    type={inputType}
                    onInput={maxLengthCheck}
                    value={inputValue}
                    onChange={(e) => {
                        if (e.target.value.length) {
                            setInputEmpty(false);
                            setInputOnFocus(true);
                        }

                        setInputValue(e.target.value);
                        onChange(e);
                    }}

                    sx={{
                        // normal label color
                        "& label": {
                            color: '#89919E',
                            fontFamily: 'fEuclidLimadiRegular',
                            fontWeight: inputEmpty ? '' : 'normal',
                        },

                        //label color when input is focused
                        "& label.Mui-focused": {
                            color: '#89919E',
                            fontWeight: 'normal',
                        },

                        // focused color for input with variant='standard'
                        "& .MuiInput-underline:after": {
                            borderBottomColor: '#F89818',
                        },
                        // focused color for input with variant='filled'
                        "& .MuiFilledInput-underline:after": {
                            borderBottomColor: '#F89818',
                        },
                        // focused color for input with variant='outlined'
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: '#F89818',
                            }
                        },
                        "& .MuiInputBase-input": {
                            fontSize: 14,
                            fontFamily: 'fEuclidLimadiRegular',
                            fontWeight: 'normal',
                        }
                    }}

                    className={`bg-transparent w-full pb-0 mb-0 ${className}`}
                />
            </ThemeProvider>
            }

            {
                textarea ? <div className="absolute -bottom-[22px] right-0 ">
                    {charCount ?? 0} {max_input ? ("/" + max_input) : "/500"}
                </div>
                    : ""
            }

            {/* password show/hide button */}
            {togglePasswordBtn || type === 'password' ? (
                <img
                    onClick={() => {
                        setShowPassword(!showPassword);
                        if (inputType === "password") {
                            setInputType("text");
                        } else {
                            setInputType("password");
                        }
                    }}
                    src={showPassword === true ? iShowPass : iHidePass}
                    alt="show-hide-icon"
                    className="absolute p-2 cursor-pointer top-4 right-3"
                />
            ) : (
                ""
            )}

            {disabled === true ? (
                // <Tooltip color={'#F89818'} title={<div className='z-50'>Not Editable</div>}>
                <img
                    title={t('Not Editable')}
                    src={iInformation}
                    alt="show-hide-icon"
                    className="absolute right-0 pt-2 pb-2 pl-2 cursor-pointer top-4 "
                />
                // </Tooltip>
            ) : (
                ""
            )}

        </div>
    )
}

export default CommonInput

