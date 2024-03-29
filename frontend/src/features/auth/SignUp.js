import * as React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from './Copyright'
import TextInput from './formFields/TextInput'
import { SpinnerBtn } from '../../components/Spinners'
import { useRegisterMutation } from '../../app/services/auth'

export const userCreateSchema = z
    .object({
        userName: z
            .string()
            .min(5, { message: 'Username must be at least 5 characters' }),
        firstName: z.string().min(1, { message: 'Last name required' }),
        lastName: z.string().min(1, { message: 'Last name required' }),
        email: z.string().email().optional().or(z.literal('')),
        password: z
            .string()
            .min(3, { message: 'Password must be atleast 3 characters' }),
        passwordConfirm: z
            .string()
            .min(1, { message: 'Confirm Password is required' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ['passwordConfirm'], // path of error
    })

const theme = createTheme()

export default function SignUp() {
    const [register] = useRegisterMutation()
    const navigate = useNavigate()
    const { isLoading } = useSelector((state) => state.notification)

    const { handleSubmit, control } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordConfirm: '',
        },
        resolver: zodResolver(userCreateSchema),
    })

    const onSubmit = async (data, event) => {
        try {
            await register(data)
                .unwrap()
                .then(() => navigate('/login'))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                    >
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
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I Agree to our Terms and Conditions"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? <SpinnerBtn /> : 'Sign Up'}
                        </Button>
                        <Link href="login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}
