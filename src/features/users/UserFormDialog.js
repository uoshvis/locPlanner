import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FormControl from '@mui/material/FormControl'

import { userCreateSchema } from '../auth/SignUp'
import { createUser, fetchUsers } from './usersSlice'
import UserFormFields from './UserFormFields'

const roleSchema = z.object({
    role: z.string().min(1, { message: 'Select role' }),
    isActive: z.boolean({
        required_error: 'isActive is required',
        invalid_type_error: 'isActive must be a boolean',
    }),
})
const userCreateSchemaWithRole = userCreateSchema.and(roleSchema)

export default function UserFormDialog({ isSuperAdminUser }) {
    const [open, setOpen] = React.useState(false)
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
        resolver: zodResolver(userCreateSchemaWithRole),
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
                <FormControl>
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
