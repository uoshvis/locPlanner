import * as React from 'react'
import { useController } from 'react-hook-form'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function CheckBox({ control, name, label }) {
    const { field } = useController({
        name,
        control,
    })

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={field.value === true}
                    onChange={field.onChange}
                    inputRef={field.ref}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            }
            label={label}
        />
    )
}
