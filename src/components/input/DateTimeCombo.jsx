import { TextField } from '@mui/material'
import React from 'react'
import { formatDateForMui } from '../../app/utility/utilityFunctions'

const DateTimeCombo = ({
    label="Next appointment"
}) => {
    return (
        <div>
            <TextField
                id="standard-basic"
                variant="standard"
                label={label}
                type="datetime-local"
                defaultValue={formatDateForMui(new Date())}
                sx={{ width: 250 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    )
}

export default DateTimeCombo