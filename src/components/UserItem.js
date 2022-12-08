import * as React from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";


const UserItem= ({ handleRemoveUser }) => {
    const { userId } = useParams()
    const users = useSelector(state => state.users)
    let user = users.find(user => '' + user.id === ''+ userId);


    return (
      <>
        <h2>UserId: {userId} </h2>
        <h3> {user.firstName} {user.lastName} </h3>
        <Stack
            spacing={10}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Button variant="outlined" component={Link} to={"/dashboard/users"}>Back to users</Button>
            <Button variant="outlined" onClick={()=> handleRemoveUser(userId)}>Delete</Button>
        </Stack>
      </>
    );
  };
  

  export default UserItem