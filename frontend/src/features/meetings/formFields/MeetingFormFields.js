import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextInput from '../../auth/formFields/TextInput'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function MeetingFormFields({ control }) {
    return (
        <Box sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            control={control}
                            name="firstName"
                            label="First Name"
                            id="firstName"
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            control={control}
                            name="lastName"
                            label="Last Name"
                            id="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInput
                            control={control}
                            name="personalId"
                            label="Personal ID"
                            id="personalId"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            name="meetingDate"
                            rules={{
                                required: 'Please select datetime',
                            }}
                            render={({ field, fieldState }) => (
                                <DatePicker
                                    {...field}
                                    label="Meeting Date"
                                    renderInput={(params) => (
                                        <TextField
                                            sx={{
                                                mt: '16px',
                                                width: '100%',
                                            }}
                                            {...params}
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextInput
                            control={control}
                            name="md"
                            label="MD"
                            id="md"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Controller
                            control={control}
                            name="firstDate"
                            render={({ field, fieldState }) => (
                                <DatePicker
                                    {...field}
                                    label="First date"
                                    renderInput={(params) => (
                                        <TextField
                                            sx={{
                                                mt: '16px',
                                                width: '100%',
                                            }}
                                            {...params}
                                            error={!!fieldState.error}
                                            helperText={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Box>
    )
}
