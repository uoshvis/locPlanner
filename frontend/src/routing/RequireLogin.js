import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function RequireLogin({ children }) {
    const { isLoggedIn } = useSelector((state) => state.auth)

    let location = useLocation()
    if (!isLoggedIn) {
        return <Navigate to={'/login'} state={{ from: location }} replace />
    }
    return children ? children : <Outlet /> // to use as wrapping component
}

export default RequireLogin
