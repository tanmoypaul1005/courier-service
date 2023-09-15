/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { withStyles } from '@mui/styles';
import da from 'dayjs/locale/da';
import useSettingsStore from '../../app/stores/others/settingsStore';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { ClickAwayListener } from '@mui/material';

const CommonDatePicker = ({
    startDate, //(format) = "2023-02-10",
    endDate,
    allowPastDate = true,
    allowFutureDate = true,
    placeholder = 'Select a date',
    autoFocus = false,
    required = false,
    disabled = false,
    label = "Select Date",
    value = null,
    show_asterisk = true,
    onChange = () => { },
    onError = () => { },

}) => {
    const [valueLocal, setValueLocal] = useState();
    const [foundError, setFoundError] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [openCalendar, setOpenCalendar] = useState(false);
    const [safeToCloseCalendar, setSafeToCloseCalendar] = useState(true);

    const { app_lang_code } = useSettingsStore();

    React.useEffect(() => {
        // console.log("date picker error: ", foundError);
        switch (foundError) {
            case "minDate":
                setErrorMessage("Invalid date, must be: " + startDate + " or later");
                onError("Invalid date, must be: " + startDate + " or later");
                break;
            case "maxDate":
                setErrorMessage("Invalid date, must be: " + endDate + " or earlier");
                onError("Invalid date, must be: " + endDate + " or earlier");
                break;
            case "disablePast":
                setErrorMessage("Invalid date, past date not allowed here.");
                onError("Invalid date, past date not allowed here.");
                break;
            case "disableFuture":
                setErrorMessage("Invalid date, future date not allowed here.");
                onError("Invalid date, future date not allowed here.");
                break;
            case "invalidDate":
                setErrorMessage("Invalid date, please use correct format.");
                onError("Invalid date, please use correct format.");
                break;
            default:
                setErrorMessage("");
                break;
        }

    }, [foundError])

    React.useEffect(() => {
        setValueLocal(value === "" ? null : value);
    }, [value]);

    return (

        <div
            className='w-full'>
            <LocalizationProvider dateAdapter={AdapterDayjs}
                adapterLocale={app_lang_code === 'da' ? da : ''}
            >
                <ClickAwayListener onClickAway={() => {
                    // console.log('CLICK-AWAY DETECTED !!');
                    // if(safeToCloseCalendar) setOpenCalendar(false);
                }} >
                    <DatePicker
                        // open={openCalendar}          //for manually open/close calendar
                        className='w-full'
                        PaperProps={{
                            sx: {
                                width: '100%',
                                "& label": {
                                    color: '#89919E',
                                    fontFamily: 'fEuclidLimadiRegular',
                                    fontWeight: !valueLocal ? '' : 'bold',
                                    textTransform: 'capitalize',
                                },

                                //label color when input is focused
                                "& label.Mui-focused": {
                                    color: '#89919E',
                                    fontWeight: 'bold',
                                },
                                "& .MuiPickersDay-root": {
                                    "&.Mui-selected": {
                                        //backgroundColor: '#F89818',     //todo:     calendar selected date bg color not working yet 
                                    },
                                },
                            }
                        }}
                        label={(required && show_asterisk) ? <div>{label}<span className='text-cRed ml-s2'>*</span> </div> : label}
                        value={valueLocal}

                        onMonthChange={() => { setSafeToCloseCalendar(false); }}
                        onYearChange={() => { setSafeToCloseCalendar(false); }}
                        onChange={(newValue) => {
                            setSafeToCloseCalendar(true);
                            setOpenCalendar(false);
                            // console.log('date value trace', newValue);
                            setValueLocal(newValue);
                            onChange(new Date(newValue));
                        }}

                        inputFormat={app_lang_code === 'da' ? "DD. MMM YYYY" : "DD. MMM YYYY"}
                        disabled={disabled}
                        minDate={startDate}
                        maxDate={endDate}
                        disablePast={!allowPastDate}
                        disableFuture={!allowFutureDate}
                        onError={(e) => {
                            // console.log("CommonDatePicker error: ", e);
                            setFoundError(e)
                        }}

                        disableMaskedInput={true}

                        renderInput={(params) => (
                            <Tooltip color={'#F89818'} placement='top' title={errorMessage ? errorMessage : disabled ? "not editable" : ""}>
                                <TextField {...params}
                                    fullWidth={true}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                    onClick={() => {
                                        // console.log("date picker INPUT click");
                                        setOpenCalendar(!openCalendar);
                                    }}
                                    inputProps={{
                                        ...params.inputProps,
                                        placeholder: placeholder,
                                        // placeholder: 'type like: 02, Feb, 2023',
                                        required: required,
                                        autoComplete: 'off',
                                        form: {
                                            autoComplete: 'off',
                                        },
                                    }}
                                    autoComplete='off'
                                    // disabled={true} 
                                    autoFocus={autoFocus}
                                    focused={autoFocus}
                                    id="standard-basic"
                                    variant="standard"
                                    sx={{
                                        "& label": {
                                            cursor: 'pointer',
                                            color: '#89919E',
                                            fontFamily: 'fEuclidLimadiRegular',
                                        },
                                        "& label.Mui-focused": {
                                            color: '#89919E',
                                            fontWeight: 'normal',
                                            fontFamily: 'fEuclidLimadiRegular',
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
                                            cursor: 'pointer',
                                            "&.Mui-focused fieldset": {
                                                borderColor: '#F89818',
                                            }
                                        },
                                        "& .MuiInputBase-input": {
                                            fontSize: 14,
                                            fontFamily: 'fEuclidLimadiRegular',
                                            fontWeight: 'normal',
                                            cursor: 'pointer',
                                        },
                                        caretColor: 'transparent',
                                        // zIndex: 1000,
                                    }}
                                    className="w-full capitalize cursor-pointer"
                                />
                            </Tooltip>
                        )}
                    />

                </ClickAwayListener>
            </LocalizationProvider>
        </div>

    );
}

export default CommonDatePicker

