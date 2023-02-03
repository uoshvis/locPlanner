import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { updateUser } from '../auth/authSlice'
import { fetchUsers } from './usersSlice'
import Input from './formFields/Input'
import CheckBox from './formFields/CheckBox'
import SelectTextField from './formFields/SelectTextField'

const UserItem = ({ handleRemoveUser, isSuperAdminUser }) => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const user = users.find((user) => '' + user.id === '' + userId)

    const { control, handleSubmit, getValues, reset } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            isActive: '',
        },
        values: user,
    })

    const onSaveSubmit = () => {
        const data = getValues()
        dispatch(updateUser(data))
            .unwrap()
            .then(() => {
                dispatch(fetchUsers())
            })
            .catch(() => {
                reset(user)
            })
    }

    return (
        <Box>
            <Typography variant="h6" component="h1" sx={{ mb: '2rem' }}>
                Edit User
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSaveSubmit)}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="User Id"
                    defaultValue={userId}
                />
                <Input
                    control={control}
                    name="userName"
                    label="User Name"
                    readOnly={!isSuperAdminUser}
                />
                <Input
                    control={control}
                    name="firstName"
                    label="First Name"
                    readOnly={!isSuperAdminUser}
                />
                <Input
                    control={control}
                    name="lastName"
                    label="Last Name"
                    readOnly={!isSuperAdminUser}
                />
                <CheckBox
                    control={control}
                    name="isActive"
                    label="Active"
                    readOnly={!isSuperAdminUser}
                />
                <SelectTextField
                    control={control}
                    name="role"
                    label="Role"
                    readOnly={!isSuperAdminUser}
                />

                <Button
                    variant="outlined"
                    type="submit"
                    disabled={!isSuperAdminUser}
                >
                    Save
                </Button>

                <Button
                    variant="outlined"
                    disabled={!isSuperAdminUser}
                    onClick={() => handleRemoveUser(userId)}
                >
                    Delete
                </Button>

                <Button component={Link} to={'/dashboard/users'}>
                    <ArrowBackIosIcon />
                    Back to users
                </Button>
            </Box>
        </Box>
    )
}

export default UserItem
