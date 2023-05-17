import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Typography from '@mui/material/Typography'

import UserFormFields from './formFields/UserFormFields'
import AlertDialog from '../../components/DeleteAlertDialog'
import { userSchema } from './formFields/userSchema'
import { useUpdateUserMutation } from '../../app/services/users'
import { useSelector } from 'react-redux'
import { selectUserDataById } from './usersSlice'

const UserItem = ({ handleRemoveUser }) => {
    const { userId } = useParams()

    const user = useSelector((state) =>
        selectUserDataById(state, Number(userId))
    )

    const [updateUser, { isUpdateLoading }] = useUpdateUserMutation()

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
            setValue('password', user.password.slice(0, 5))
            setValue('passwordConfirm', user.password.slice(0, 5))
        }
    }, [user, setValue])

    const onSaveSubmit = async () => {
        const data = getValues()
        if (data && !isUpdateLoading) {
            try {
                await updateUser(data).unwrap()
            } catch (err) {
                reset(user)
            }
        }
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
