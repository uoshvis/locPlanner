import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Outlet, useNavigate,
} from "react-router-dom";
import React from "react";
import UserList from './UserList'
import UserItem from './UserItem'
import { fetchUsers } from "../features/users/usersSlice";
import { useSelector } from "react-redux";


const Users = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const users = useSelector(state => state.users)


    useEffect(() => {
        let didCancel = false

        async function dofetchUsers() {
            try {
                await dispatch(fetchUsers()).unwrap()
            }
            catch {
                // error catched in reject case
                // swallow error
            }
            if (!didCancel) {}
        }
        dofetchUsers()

        return () => {didCancel = true}
           
    }, [dispatch, ])

    const handleRemoveUser = (userId) => {
        // ToDo implement handleRemove user
        console.log(users)
        navigate('/dashboard/users');
      };
    

    return (
        <>

            <Routes>
                <Route index element={<UserList users={users} />} />
                <Route path=":userId" element={
                    <UserItem handleRemoveUser={handleRemoveUser}  />}
                />
            </Routes>

            <Outlet />

        </>
    )
}

export default Users