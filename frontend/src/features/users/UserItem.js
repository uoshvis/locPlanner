import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Typography from '@mui/material/Typography'

import { fetchUsers, getUserById, updateUser } from './usersSlice'
import UserFormFields from './formFields/UserFormFields'
import AlertDialog from '../../components/DeleteAlertDialog'
import { userSchema } from './formFields/userSchema'

const UserItem = ({ handleRemoveUser }) => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => getUserById(state, userId))

    const [isDialogOpen, setDialogIsOpen] = useState(false)

    const { control, handleSubmit, getValues, reset, setValue } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            isActive: '',
            passwordConfirm: '',
        },
        values: user,
        resolver: zodResolver(userSchema),
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
        setDialogIsOpen(false)
    }

    return (
        <Box>
            <AlertDialog
                isDialogOpen={isDialogOpen}
                setDialogIsOpen={setDialogIsOpen}
                onDelete={onDelete}
            />

            <Typography variant="h6" component="h1" sx={{ mb: '2rem' }}>
                Edit User
            </Typography>

            <Box
                onSubmit={handleSubmit(onSaveSubmit)}
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <UserFormFields control={control} />

                <Button variant="outlined" type="submit">
                    Save
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => setDialogIsOpen(true)}
                >
                    Delete
                </Button>

                <Button component={Link} to={'/users'}>
                    <ArrowBackIosIcon />
                    Back to users
                </Button>
            </Box>
        </Box>
    )
}

export default UserItem