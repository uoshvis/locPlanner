import { useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert'
import { clearNotification } from './notificationSlice'

const Notification = ({ type, message }) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(clearNotification())
    }

    return (
        <Alert onClose={handleClose} severity={type}>
            {message}
        </Alert>
    )
}

export default Notification
