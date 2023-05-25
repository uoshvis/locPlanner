import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { MenuItem, TextField } from '@mui/material'

const options = [
    {
        label: 'Location 1',
        value: 'loc1',
    },
    {
        label: 'Location 2',
        value: 'loc2',
    },
]

export const LocationInputDropDown = ({ name, label, disabled }) => {
    const { control } = useFormContext()

    const generateSingleOptions = () => {
        return options.map((option) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            )
        })
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: 'Please select location',
            }}
            render={({
                field: { onChange, value, ref },
                fieldState: { error },
            }) => (
                <TextField
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    label={label}
                    id="select-location"
                    select
                    error={!!error}
                    helperText={error?.message}
                    disabled={disabled}
                >
                    {generateSingleOptions()}
                </TextField>
            )}
        />
    )
}
