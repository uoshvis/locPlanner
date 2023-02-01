import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useSelector } from 'react-redux'
import Input from './formFields/Input'
import { useForm } from 'react-hook-form'
import ControlledCheckbox from './formFields/CheckBox'

const UserItem = ({ handleRemoveUser }) => {
    const { userId } = useParams()
    const users = useSelector((state) => state.users)
    let user = users.find((user) => '' + user.id === '' + userId)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
        },
        values: user,
    })

    const onSubmit = (data) => console.log(data)

    return (
        <>
            <h2>UserId: {userId} </h2>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
            >
                <Input control={control} name="userName" label="User Name" />
                <Input control={control} name="firstName" label="First Name" />
                <Input control={control} name="lastName" label="Last Name" />
                <ControlledCheckbox label="Active" />

                <Button variant="outlined" type="submit">
                    Save
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => handleRemoveUser(userId)}
                >
                    Delete
                </Button>

                <Button component={Link} to={'/dashboard/users'}>
                    <ArrowBackIosIcon />
                    Back to users
                </Button>
            </Box>
        </>
    )
}

export default UserItem
