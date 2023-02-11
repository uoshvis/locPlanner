import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextInput from './formFields/TextInput'
import SelectTextField from '../users/formFields/SelectTextField'

export default function CreateFormFields({ control }) {
    return (
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextInput
                        control={control}
                        name="userName"
                        label="User Name"
                        id="userName"
                        autocomplete="username"
                        autoFocus={true}
                    />
                </Grid>
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

                <Grid item xs={12}>
                    <SelectTextField
                        control={control}
                        name="role"
                        label="Role"
                        id="role"
                        readOnly={false}
                        required={true}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextInput
                        control={control}
                        name="email"
                        label="Email Address"
                        id="email"
                        autoComplete="email"
                        required={false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextInput
                        control={control}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextInput
                        control={control}
                        name="passwordConfirm"
                        label="Repeat password"
                        type="password"
                        id="passwordMatch"
                        autoComplete="new-password"
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
