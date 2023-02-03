import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    Route,
    Routes,
    Outlet,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import React from 'react'
import UserList from './UserList'
import UserItem from './UserItem'
import { deleteUser, fetchUsers } from './usersSlice'
import { useSelector } from 'react-redux'
import { setNotification } from '../notification/notificationSlice'

const Users = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const users = useSelector((state) => state.users)
    const { userDetails } = useSelector((state) => state.auth)

    const isSuperAdminUser = userDetails.role === 'superAdmin'

    useEffect(() => {
        let didCancel = false

        async function dofetchUsers() {
            try {
                await dispatch(fetchUsers()).unwrap()
            } catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {
            }
        }
        dofetchUsers()

        return () => {
            didCancel = true
        }
    }, [dispatch])

    const handleRemoveUser = (userId) => {
        if (Number(userDetails.id) === Number(userId)) {
            dispatch(
                setNotification({
                    message: "Can't delete self User",
                    type: 'error',
                    open: true,
                })
            )
        } else if (!isSuperAdminUser) {
            dispatch(
                setNotification({
                    message: 'Only Super Admin can delete users',
                    type: 'error',
                    open: true,
                })
            )
        } else if (isSuperAdminUser) {
            dispatch(deleteUser(userId))
                .then(() => dispatch(fetchUsers()))
                .then(() => navigate('/dashboard/users'))
        }
    }

    return (
        <>
            <Routes>
                <Route
                    index
                    element={
                        <UserList
                            users={users}
                            isSuperAdminUser={isSuperAdminUser}
                        />
                    }
                />
                <Route
                    element={
                        <RequireSuper
                            isSuperAdminUser={isSuperAdminUser}
                            redirectPath="/dashboard/users"
                        />
                    }
                >
                    <Route
                        path=":userId"
                        element={
                            <UserItem
                                handleRemoveUser={handleRemoveUser}
                                isSuperAdminUser={isSuperAdminUser}
                            />
                        }
                    />
                </Route>
            </Routes>

            <Outlet />
        </>
    )
}

function RequireSuper({ redirectPath = '/', isSuperAdminUser, children }) {
    let location = useLocation()

    if (!isSuperAdminUser) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />
    }

    return children ? children : <Outlet /> // to use as wrapping component
}

export default Users
