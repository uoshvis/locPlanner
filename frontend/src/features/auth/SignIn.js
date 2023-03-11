import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

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
import TextInput from './formFields/TextInput'

import Spinner from '../../components/Spinner'
import { login } from './authSlice'

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

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

    const dispatch = useDispatch()

    let navigate = useNavigate()
    let location = useLocation()

    let from = location.state?.from?.pathname || '/'

    const { isLoggedIn } = useSelector((state) => state.auth)
    const { apiStatus } = useSelector((state) => state.notification)
    const loading = apiStatus === 'loading'

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

    const onSubmit = ({ userName, password }) => {
        dispatch(login({ userName, password }))
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
                            {loading ? <Spinner /> : 'Sign In'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
