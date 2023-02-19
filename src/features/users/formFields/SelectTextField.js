import React, { useEffect, useState } from 'react'
import { useController } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const superAdminRole = [
    {
        value: 'superAdmin',
        label: 'Super Admin',
    },
]

const userAdminRoles = [
    {
        value: 'user',
        label: 'User',
    },
    {
        value: 'admin',
        label: 'Admin',
    },
]

const rolesAll = userAdminRoles.concat(superAdminRole)

function SelectTextField({
    control,
    name,
    label,
    id,
    readOnly,
    required = false,
}) {
    const [options, setOptions] = useState(rolesAll)

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    useEffect(() => {
        if (field.value) {
            if (field.value === 'superAdmin') {
                setOptions(superAdminRole)
            } else {
                setOptions(userAdminRoles)
            }
        }
    }, [field.value])

    return (
        <TextField
            select
            disabled={readOnly}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value || ''}
            inputRef={field.ref}
            name={field.name}
            id={id}
            label={label}
            error={Boolean(error)}
            helperText={error?.message}
            required={required}
            fullWidth
            margin="normal"
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectTextField
