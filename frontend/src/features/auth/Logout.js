import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { logout } from './authSlice'
import { getApiStatus } from '../notification/notificationSlice'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const apiStatus = useSelector(getApiStatus)

    useEffect(() => {
        dispatch(logout())
        navigate('/', { replace: true })
    }, [dispatch, navigate])

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={apiStatus === 'loading'}
        >
            {apiStatus === 'loading' && <CircularProgress color="inherit" />}
        </Backdrop>
    )
}

export default Logout
