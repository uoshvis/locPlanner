import { useDispatch } from 'react-redux'
import Fade from '@mui/material/Fade'
import Alert from '@mui/material/Alert'
import { clearNotification } from './notificationSlice'

const Notification = ({ type, message }) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(clearNotification())
    }

    return (
        <Fade in={true} timeout={1000}>
            <Alert
                sx={{
                    position: 'fixed',
                    width: 'auto',
                    bottom: 0,
                    right: 0,
                    zIndex: 999,
                }}
                onClose={handleClose}
                severity={type}
            >
                {message}
            </Alert>
        </Fade>
    )
}

export default Notification
