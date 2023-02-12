import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Typography from '@mui/material/Typography'

import { updateUser } from '../auth/authSlice'
import { fetchUsers } from './usersSlice'
import UserFormFields from './formFields/UserFormFields'

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
        values: { ...user, passwordConfirm: user.password },
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
                    '& > :not(style)': { m: 1, width: '50ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
            >
                <UserFormFields control={control} />

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
        </Box>
    )
}

export default UserItem
