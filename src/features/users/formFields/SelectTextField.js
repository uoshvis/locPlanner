import { useController } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

const roles = [
    {
        value: 'user',
        label: 'User',
    },
    {
        value: 'admin',
        label: 'Admin',
    },
    {
        value: 'superAdmin',
        label: 'Super Admin',
    },
]

function SelectTextField({ control, name, label, readOnly, id }) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    return (
        <TextField
            select
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value || ''}
            inputRef={field.ref}
            name={field.name}
            id={id}
            label={label}
            error={Boolean(error)}
            helperText={error?.message}
        >
            {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectTextField
