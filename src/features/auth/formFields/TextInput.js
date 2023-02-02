import TextField from '@mui/material/TextField'
import { useController } from 'react-hook-form'

function TextInput({
    control,
    name,
    label,
    id,
    autoComplete = '',
    type = '',
    autoFocus = false,
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
            margin="normal"
            required
            fullWidth
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
