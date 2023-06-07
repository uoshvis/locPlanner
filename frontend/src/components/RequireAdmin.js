import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function RequireAdminRole({ children }) {
    const adminRoles = ['admin', 'superAdmin']

    const {
        isLoggedIn,
        userInfo: { role },
    } = useSelector((state) => state.auth)

    const isAllowed = isLoggedIn && adminRoles.includes(role)

    if (!isAllowed) {
        return (
            <div>
                <h1>You dont have permissions</h1>
                <span>Contact admin</span>
            </div>
        )
    }

    return children ? children : <Outlet /> // to use as wrapping component
}

export default RequireAdminRole
