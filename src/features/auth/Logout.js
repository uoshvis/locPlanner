import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from './authSlice'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.auth.status)

    useEffect(() => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                navigate("/", { replace: true });
            })
            .catch(() => {
                console.log('logout err');
            })
    }, [dispatch, navigate]);
  
    return (
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={status === 'loading'}
            >       
            {status === 'loading' && <CircularProgress color="inherit" />}
        </Backdrop>
    )
};

export default Logout;