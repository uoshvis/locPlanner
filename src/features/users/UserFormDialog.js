import * as React from 'react'
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
// import UserFormFields from './UserFormFields'
import { createUser, fetchUsers } from './usersSlice'
import * as z from 'zod'
import UserCreateFormFields from '../auth/CreateUserFormFields'
import { userCreateSchema } from '../auth/SignUp'

const roleSchema = z.object({
    role: z.string().min(1, { message: 'Select role' }),
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
            isActive: '',
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
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new user fill the form.
                    </DialogContentText>

                    <UserCreateFormFields control={control} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit(onSaveSubmit)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
