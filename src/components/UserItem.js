import * as React from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const UserItem= ({handleRemoveUser}) => {
    const { userId } = useParams()

    return (
      <>
        <h2>User: {userId}</h2>

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