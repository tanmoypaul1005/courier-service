// import { Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { useEffect } from 'react';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CommonMultiSelect = ({
    dataArray = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ],
    label = 'Select Some items',
    value = [],
    onChange = () => { },
    disabled = false,
    required = false,
    show_asterisk = true,
}) => {
    const [personName, setPersonName] = React.useState(value);

    const handleChange = (event) => {
        console.log('selected item: ', event.target.value);
        onChange(event);
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setPersonName(value);
    }, [value]);

    return (
        // <Tooltip
        //     placement="top"
        //     title={personName ? personName?.map((item, index) => item + (index < personName?.length - 1 ? ',  ' : ' ')) : ''}
        // >
        <FormControl variant="standard"

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
                },
                minWidth: 120,
                // marginTop: '15px',
            }}
            className='w-full h-[35px] max-w-[100%]'
        >
            <InputLabel id="demo-simple-select-standard-label">{(required && show_asterisk) ? <div>{label}<span className='text-cRed ml-s2'>*</span> </div> : label}</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                title={personName ? personName?.map((item, index) => item + (index < personName?.length - 1 ? ',  ' : ' ')) : ''}
                multiple
                value={personName}
                onChange={handleChange}
                disabled={disabled}
                required={required}
                // input={<OutlinedInput label={label} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {dataArray?.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        // </Tooltip>
    );
}

export default CommonMultiSelect