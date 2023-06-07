import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextInput from './formFields/TextInput'

import Copyright from './Copyright'
import { SpinnerBtn } from '../../components/Spinners'
import { useLoginMutation } from '../../app/services/auth'

const theme = createTheme()

export default function SignIn() {
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: { isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            userName: '',
            password: '',
        },
    })

    let navigate = useNavigate()
    let location = useLocation()

    let from = location.state?.from?.pathname || '/'

    const { isLoggedIn } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.notification)

    const [login] = useLoginMutation()

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true })
        }
    }, [isLoggedIn, navigate, from])

    useEffect(() => {
        reset({
            userName: getValues('userName'),
            password: '',
        })
    }, [isSubmitSuccessful, reset, getValues])

    const onSubmit = async ({ userName, password }) => {
        try {
            await login({ userName, password }).unwrap()
        } catch (err) {}
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
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextInput
                            control={control}
                            name="userName"
                            label="User Name"
                            id="userName"
                            autocomplete="username"
                            autoFocus={true}
                        />

                        <TextInput
                            control={control}
                            name="password"
                            label="Password"
                            id="password"
                            type="password"
                            autoComplete="current-password"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? <SpinnerBtn /> : 'Sign In'}
                        </Button>

                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
