import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./Login.module.css"
import { login } from './authSlice'


const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    let navigate = useNavigate()
    let location = useLocation()

    const status = useSelector(state => state.auth.status)


    let from = location.state?.from?.pathname || "/"

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await dispatch(login({userName, password})).unwrap()
            navigate(from, { replace: true })
        } catch(err) {
            console.log(err)
        }
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
                <input name="username" type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input name="password" type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
      )

}

export default Login