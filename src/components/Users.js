import { Route, Routes, Outlet, useNavigate,
} from "react-router-dom";
import React from "react";
import UserList from './UserList'
import UserItem from './UserItem'

const usersData = [
    { id: '1', firstName: 'Santa', lastName: 'Claus', isActive: true },
    { id: '2', firstName: 'Red', lastName: 'Nose', isActive: false },
  ];

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = React.useState(usersData);

    const handleRemoveUser = (userId) => {
        setUsers((state) => state.filter((user) => user.id !== userId));
        console.log(users)
        navigate('/dashboard/users');
      };

    return (
        <>
            <Routes>
                <Route index element={<UserList users={users} />} />
                <Route path=":userId" element={<UserItem handleRemoveUser={handleRemoveUser} />} />
            </Routes>

      <Outlet />


        </>
    )
}

export default Users