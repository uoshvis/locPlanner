import TextField from '@mui/material/TextField'
import { useController } from 'react-hook-form'

function Input({ control, name, label, readOnly, id }) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    return (
        <TextField
            onChange={field.onChange} // send value to hook form
            onBlur={field.onBlur} // notify when input is touched/blur
            value={field.value || ''} // input value
            name={field.name} // send down the input name
            inputRef={field.ref} // send input ref, so we can focus on input when error appearhelperText
            id={id}
            label={label}
            error={Boolean(error)}
            helperText={error?.message}
            InputProps={{
                readOnly,
            }}
            // InputLabelProps={{ shrink: true }}
        />
    )
}

export default Input
