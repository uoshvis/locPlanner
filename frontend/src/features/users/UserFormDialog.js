import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FormControl from '@mui/material/FormControl'

import { createUser, fetchUsers } from './usersSlice'
import UserFormFields from './formFields/UserFormFields'
import { userSchema } from './formFields/userSchema'

export default function UserFormDialog() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordConfirm: '',
            role: '',
            isActive: false,
        },
        resolver: zodResolver(userSchema),
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const onSaveSubmit = (data) => {
        dispatch(createUser(data))
            .unwrap()
            .then(() => {
                dispatch(fetchUsers())
                handleClose()
            })
            .catch(() => {
                reset()
            })
    }

    return (
        <div>
            <Button
                sx={{ mb: 2 }}
                variant="outlined"
                startIcon={<AddOutlinedIcon />}
                onClick={handleClickOpen}
            >
                New user
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <FormControl component="form" noValidate autoComplete="off">
                    <DialogTitle>Add New User</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            To add a new user fill the form.
                        </DialogContentText>
                        <UserFormFields
                            control={control}
                            handleSubmit={handleSubmit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSaveSubmit)}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>
        </div>
    )
}
