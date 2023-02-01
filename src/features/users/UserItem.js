import React from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useSelector } from "react-redux";
import Input from './formFIelds/Input';
import { useForm } from 'react-hook-form'


const UserItem= ({ handleRemoveUser }) => {
    const { userId } = useParams()
    const users = useSelector(state => state.users)
    let user = users.find(user => '' + user.id === ''+ userId);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
        },
        values: user
    })

    const onSubmit = data => console.log(data);


    return (
      <>
        <h2>UserId: {userId} </h2>
        <h3> {user.firstName} {user.lastName} </h3>

        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },                
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                m: 5,
            }}
            noValidate
            autoComplete="off"
        >
            <Input control={control} name='userName'/>
            <Input control={control} name='firstName'/>
            <Input control={control} name='lastName'/>

            <Button variant="outlined" type="submit">Save</Button>
            <Button variant="outlined" component={Link} to={"/dashboard/users"}>Back to users</Button>
            <Button variant="outlined" onClick={()=> handleRemoveUser(userId)}>Delete</Button>
        </Box>

      </>
    );
  };
  

  export default UserItem