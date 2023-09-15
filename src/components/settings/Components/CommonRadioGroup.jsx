import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const CommonRadioGroup = ({

    item = [
        { value: 'On', checked: true, onChange: () => { } },//Radio Button Value
        { value: 'Off', checked: true, onChange: () => { } }
    ]

}) => {

    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 16,
        height: 16,
        padding: 0,
        margin: 0,
        boxShadow:
            theme.palette.mode === 'dark'
                ? '0 0 0 1px rgb(16 22 26 / 40%)'
                : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
                : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background:
                theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#2463EB',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 40%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#2463EB',
        },
    });
    // const classes = useStyles();

    function BpRadio(props) {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );
    }

    return (
        <div>
            <FormControl className=''>
                <RadioGroup className='m-0' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    {item.map((item, index) => (
                        <><FormControlLabel className='m-0' checked={item.checked} onChange={item?.onChange} key={index} value={item.value} control={<BpRadio />} label={item.value} /></>
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default CommonRadioGroup;