import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

function LinearIndeterminate() {
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" component="h4" mb={2}>
                Auto login..
            </Typography>

            <LinearProgress />
        </Box>
    )
}

function RequireLogin({ children }) {
    const { isLoggedIn, userToken } = useSelector((state) => state.auth)

    let location = useLocation()
    if (!isLoggedIn && !userToken) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }
    if (!isLoggedIn && userToken) {
        return <LinearIndeterminate />
    }

    return children ? children : <Outlet /> // to use as wrapping component
}

export default RequireLogin
