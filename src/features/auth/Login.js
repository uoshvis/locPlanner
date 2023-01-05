import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./Login.module.css"
import { login } from './authSlice'


const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    let navigate = useNavigate()
    let location = useLocation()

    let from = location.state?.from?.pathname || "/"

    const { isLoggedIn, status } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login({userName, password}))
            .unwrap()
          // Or use rejectWithValue inside asyncThunk func
          .catch((err) => {
            console.log('Error in Login.js', err)
          })
      }


    return(
        <div className={styles.LoginWrapper}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={status === 'loading'}
            >       
                {status === 'loading' && <CircularProgress color="inherit" />}
            </Backdrop>

            <h1>Please log in</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input name="userName" type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input name="password" type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit" disabled={status==='loading'}>
                    Submit
                </button>
            </div>
            </form>
        </div>
      )

}

export default Login