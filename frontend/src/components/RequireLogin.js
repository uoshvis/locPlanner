import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LinearIndeterminate } from './Spinners'

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
