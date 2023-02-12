import React, { useEffect, useState } from 'react'
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
import AlertDialog from '../../components/DeleteAlertDialog'

const UserItem = ({ handleRemoveUser, isSuperAdminUser }) => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const user = users.find((user) => {
        return '' + user.id === '' + userId
    })

    const [isOpen, setIsOpen] = useState(false)

    const { control, handleSubmit, getValues, reset, setValue } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            isActive: '',
            passwordConfirm: '',
        },
        values: user,
    })

    useEffect(() => {
        if (user) {
            setValue('passwordConfirm', user.password)
        }
    }, [user, setValue])

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

    const onDelete = () => {
        handleRemoveUser(userId)
        setIsOpen(false)
    }

    return (
        <Box>
            {isOpen && (
                <AlertDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onDelete={onDelete}
                />
            )}
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

                <Button variant="outlined" onClick={() => setIsOpen(true)}>
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
