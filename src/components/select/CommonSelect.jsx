import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const CommonSelect = ({
    open = false,     // to open the select panel manually
    onOpen = () => { },
    label = "Select",
    subTitle = 'Select an item',
    dataArray = [
        { title: "ONE", value: 1 },
        { title: "TWO", value: 2 },
        { title: "THREE", value: 3 },
        { title: "FOUR", value: 4 },
    ],
    value = '',   //example: 3
    onChange = () => { },
    required = false,
    disabled = false,
    has_subtitle = true,
    show_asterisk = true,
}) => {
    const [selectValue, setSelectValue] = useState(value ?? '');
    const [openSelectPanel, setOpenSelectPanel] = useState(false);

    const handleChange = (event) => {
        console.log('event:::', event.target.value);
        onChange(event, fetchTitle(event.target.value));
        setSelectValue(event.target.value);
    };

    const fetchTitle = (selectionID) => {
        let res = dataArray.find(item => item.value === selectionID);
        return res?.title;
    }

    useEffect(() => {
        setSelectValue(value ?? '');
        // setSelectedTitle(fetchTitle(selectValue));
    }, [value])

    useEffect(() => {
        setOpenSelectPanel(open);
    }, [open]);

    return (
        <div onClick={() => setOpenSelectPanel(!openSelectPanel)} className='w-full h-full'>
            <FormControl
                variant="standard"
                sx={{
                    // normal label color
                    "& label": {
                        color: '#89919E',
                        fontFamily: 'fEuclidLimadiRegular',
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
                    "& .MuiInputBase-input": {
                        fontSize: 14,
                        fontFamily: 'fEuclidLimadiRegular',
                        fontWeight: 'normal',
                        paddingBottom: '2px',
                    },
                    minWidth: 120,
                    // marginTop: '15px',
                }}
                className='w-full h-[35px]'
            >


                <InputLabel id="demo-simple-select-standard-label" className='capitalize'>{(required && show_asterisk) ? <div>{label}<span className='text-cRed ml-s2'>*</span> </div> : label}</InputLabel>
                <Select
                    // open={openSelectPanel}
                    onOpen={onOpen}
                    title={disabled ? 'Not Editable' : ''}
                    IconComponent={ExpandMoreSharpIcon}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectValue}
                    onChange={handleChange}
                    required={required}
                    disabled={disabled}
                    label={label}
                >
                    {has_subtitle && <MenuItem value="">
                        <em className='capitalize limadi-regular'>{subTitle}</em>
                    </MenuItem>}
                    {
                        dataArray?.map((item, index) =>
                            <MenuItem key={index} value={item?.value} >
                                <div title={item?.title} className='limadi-regular max-w-[280px] truncate'>{item?.title}</div>
                            </MenuItem>
                        )}

                </Select>
            </FormControl>
        </div>

    )
}

export default CommonSelect