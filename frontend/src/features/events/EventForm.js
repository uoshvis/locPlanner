import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import DeleteIcon from '@mui/icons-material/Delete'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckIcon from '@mui/icons-material/Check'
import { toggleShowModal } from './eventsSlice'
import { LocationInputDropDown } from './formFields/LocationInputDropdown'
import { UserSelectDropdown } from './formFields/UserSelectDropdown'
import {
    useCreateEventMutation,
    useDeleteEventMutation,
    useUpdateEventMutation,
} from '../../app/services/events'
import { selectAllUsers } from '../users/usersSlice'

export const EventForm = (props) => {
    const dispatch = useDispatch()

    const { isLoading } = useSelector((state) => state.notification)
    const event = useSelector((state) => state.calendar.currentItem)
    const { userInfo } = useSelector((state) => state.auth)
    const { formType } = useSelector((state) => state.calendar)

    const [usersList, setUsersList] = useState([userInfo])

    const users = useSelector((state) => selectAllUsers(state))

    const [addEvent] = useCreateEventMutation()
    const [updateEvent] = useUpdateEventMutation()
    const [deleteEvent] = useDeleteEventMutation()
    const isAdminRole = (role) => {
        const adminRoles = ['admin', 'superAdmin']
        return adminRoles.includes(role)
    }

    useEffect(() => {
        if (users && isAdminRole(userInfo.role)) {
            setUsersList(users)
        }
    }, [users, userInfo.role])

    const [readOnly] = useState(formType === 'view' ? true : false)

    const defaultValues = {
        title: '',
        userId: '',
        location: '',
        start: '',
        end: '',
        isCompleted: false,
    }

    const { handleSubmit, control, getValues } = useForm({
        defaultValues,
        values: { ...defaultValues, ...event },
    })

    let submitBtnText = ''
    let submitAction = null

    if (formType === 'add') {
        submitBtnText = 'Add'
        submitAction = addEvent
    } else if (formType === 'update') {
        submitBtnText = 'Update'
        submitAction = updateEvent
    } else if (formType === 'view') {
        submitBtnText = 'View'
    }

    const handleClose = () => {
        dispatch(toggleShowModal())
    }

    const onSubmit = (data) => {
        if (!isLoading) {
            submitAction({
                ...data,
                start: data.start.toString(),
                end: data.end.toString(),
            })
            dispatch(toggleShowModal())
        }
    }

    const handleDelete = () => {
        if (!isLoading) {
            deleteEvent(event?.id)
            dispatch(toggleShowModal())
        }
    }

    return (
        <Dialog open={props.open}>
            <Box
                sx={{ m: 1 }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle>{submitBtnText} Event</DialogTitle>{' '}
                <DialogContent sx={{ m: 1 }}>
                    <DialogContentText>
                        To submit, fill in all fields.
                    </DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Stack spacing={3}>
                            <Controller
                                control={control}
                                name="title"
                                rules={{ required: 'Please enter a title' }}
                                render={({
                                    field: { onChange, value, ref },
                                    fieldState: { error },
                                }) => (
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="title"
                                        label="Title"
                                        type="text"
                                        fullWidth
                                        error={!!error}
                                        helperText={error?.message}
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        disabled={readOnly}
                                    />
                                )}
                            />

                            <LocationInputDropDown
                                name="location"
                                control={control}
                                label="Location"
                                disabled={readOnly}
                            />

                            <UserSelectDropdown
                                name="userId"
                                control={control}
                                usersList={usersList}
                                label="User"
                                disabled={readOnly}
                            />

                            <Controller
                                control={control}
                                name="start"
                                rules={{
                                    required: 'Please select datetime',
                                }}
                                render={({ field, fieldState }) => (
                                    <DateTimePicker
                                        {...field}
                                        label="Start datetime"
                                        disabled={readOnly}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!fieldState.error}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        )}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="end"
                                rules={{
                                    required: 'Please select datetime',
                                    validate: () => {
                                        return getValues('end') >
                                            getValues('start')
                                            ? true
                                            : 'End date must be later'
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <DateTimePicker
                                        {...field}
                                        label="End datetime"
                                        disabled={readOnly}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!fieldState.error}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        )}
                                    />
                                )}
                            />

                            <Controller
                                name="isCompleted"
                                control={control}
                                render={({
                                    field: { onChange, value, name },
                                    formState,
                                }) => (
                                    <FormControlLabel
                                        label="Completed"
                                        disabled={readOnly}
                                        control={
                                            <Checkbox
                                                name={name}
                                                checked={value}
                                                onChange={onChange}
                                                inputProps={{
                                                    'aria-label': 'controlled',
                                                }}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                    >
                        Cancel
                    </Button>
                    {formType === 'update' && (
                        <Button
                            variant="text"
                            onClick={handleDelete}
                            startIcon={<DeleteIcon />}
                            disabled={readOnly}
                        >
                            Delete
                        </Button>
                    )}
                    {formType !== 'view' && (
                        <Button
                            type="submit"
                            variant="text"
                            onClick={handleSubmit}
                            disabled={readOnly}
                            startIcon={<CheckIcon />}
                        >
                            {submitBtnText}
                        </Button>
                    )}
                </DialogActions>
            </Box>
        </Dialog>
    )
}
