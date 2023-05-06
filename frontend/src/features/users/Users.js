import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
// import { deleteUser, fetchUsers } from './usersSlice'
import { setNotification } from '../notification/notificationSlice'
import { useGetUsersDataQuery, useDeleteUserMutation } from './usersService'

const Users = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    const { userInfo } = useSelector((state) => state.auth)
    const { data, error, isLoading } = useGetUsersDataQuery()
    const [deleteUser] = useDeleteUserMutation()

    const isSuperAdmin = userInfo.role === 'superAdmin'

    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [error, isLoading, data])

    const handleRemoveUser = async (userId) => {
        if (Number(userInfo.id) === Number(userId)) {
            dispatch(
                setNotification({
                    message: "Can't delete self User",
                    type: 'error',
                    open: true,
                })
            )
        } else if (!isSuperAdmin) {
            dispatch(
                setNotification({
                    message: 'Only Super Admin can delete users',
                    type: 'error',
                    open: true,
                })
            )
        } else if (isSuperAdmin) {
            try {
                await deleteUser(userId).unwrap()
                navigate('/users')
            } catch (err) {
                dispatch(
                    setNotification({
                        message: err,
                        type: 'error',
                        open: true,
                    })
                )
            }
        }
    }

    return (
        <>
            <Routes>
                <Route
                    index
                    element={
                        <UserList users={users} isSuperAdmin={isSuperAdmin} />
                    }
                />
                <Route
                    element={
                        <RequireSuper
                            isSuperAdmin={isSuperAdmin}
                            redirectPath="users"
                        />
                    }
                >
                    <Route
                        path=":userId"
                        element={
                            <UserItem handleRemoveUser={handleRemoveUser} />
                        }
                    />
                </Route>
            </Routes>

            <Outlet />
        </>
    )
}

function RequireSuper({ redirectPath = '/', isSuperAdmin, children }) {
    let location = useLocation()

    if (!isSuperAdmin) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />
    }

    return children ? children : <Outlet /> // to use as wrapping component
}

export default Users
