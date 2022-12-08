import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const UserList = ({users}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const searchTerm = searchParams.get('name') || '';

    const handleSearch = (event) => {
        const name = event.target.value;
    
        if (name) {
          setSearchParams({ name: event.target.value });
        } else {
          setSearchParams({});
        }
      };


    return (
        <>
            <h2>Users</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
            />
            <List>
                {users
                .filter((user) => 
                    user.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                )
                .map((user) => (
                    <ListItem key={user.id}>
                        <ListItemButton component={Link} to={'' + user.id} >
                            {user.id} {user.firstName} {user.lastName} 
                        </ListItemButton>
                    </ListItem>               
                ))}
            </List> 
        </>
    )
}

export default UserList