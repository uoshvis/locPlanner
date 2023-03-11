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

<<<<<<< HEAD:src/features/users/formFields/SelectTextField.js
function SelectTextField({
    control,
    name,
    label,
    id,
    readOnly,
    required = false,
}) {
    const [options, setOptions] = useState(userAdminRoles)
||||||| d0ae4e2:src/features/users/formFields/SelectTextField.js
function SelectTextField({ control, name, label, id, readOnly }) {
    const [options, setOptions] = useState(userAdminRoles)
=======
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
>>>>>>> development:frontend/src/features/users/formFields/SelectTextField.js

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
<<<<<<< HEAD:src/features/users/formFields/SelectTextField.js
            required={required}
            fullWidth
||||||| d0ae4e2:src/features/users/formFields/SelectTextField.js
=======
            required={required}
            fullWidth
            margin="normal"
>>>>>>> development:frontend/src/features/users/formFields/SelectTextField.js
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
