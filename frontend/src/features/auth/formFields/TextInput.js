import TextField from '@mui/material/TextField'
import { useController } from 'react-hook-form'

function TextInput({
    control,
    name = '',
    label = '',
    id = '',
    type = 'text',
    autoComplete = '',
    autoFocus = false,
    required = true,
}) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    return (
        <TextField
            required={required}
            fullWidth
            margin="normal"
            id={id}
            label={label}
            name={name}
            type={type}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            value={field.value || ''}
            onChange={field.onChange}
            error={!!error}
            helperText={error?.message}
        />
    )
}

export default TextInput
