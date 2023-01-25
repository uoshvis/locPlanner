import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch, useSelector } from 'react-redux';
import { addEventData, updateEventData, toggleShowModal, deleteEvent } from './calendarSlice';
import { useEffect, useState } from 'react';
import { setNotification, clearNotification } from '../notification/notificationSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import DialogContentText from '@mui/material/DialogContentText';
import { Box, FormControl, FormGroup } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {LocationInputDropDown}  from './LocationInputDropdown';
import { UserSelectDropdown } from './UserSelectDropdown';


export const EventForm = (props) =>  {
    const dispatch = useDispatch()

    const event = useSelector(state => state.calendar.currentItem)
    const formType = useSelector(state => state.calendar.formType)
    const { userDetails, userInfo } = useSelector(state => state.auth)
    const users = useSelector(state => state.users)

    const [submitRequestStatus, setSubmitRequestStatus] = useState('idle')
    const [usersList, setUsersList] = useState([])
    const [readOnly, setReadOnly] = useState(formType === 'view'? true: false)

    
    const { handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: '',
            userId: '',
            location: '',
            start: '',
            end: '',
        },
        values: event,
    });

    useEffect(() => {
        if(userInfo.roles.includes('admin')) {
            setUsersList(users)
        } else {
            setUsersList(users.filter(user=> user.id === event.userId))
        }
    },[ userInfo, users, setValue, event ])

    let submitBtnText = ''
    let submitAction = null
    
    if (formType === 'add') {
        submitBtnText = 'Add'
        submitAction = addEventData
    } else if (formType === 'update') {
        submitBtnText = 'Update'
        submitAction = updateEventData
    } else if (formType === 'view') {
        submitBtnText = 'View'
    }

    useEffect(() => {
        dispatch(clearNotification())
    }, [dispatch])

    const handleClose = () => {
        dispatch(toggleShowModal())
    };
      
    const onSubmit =  (data, e) => {

        console.log("🚀 ~ file: EventForm.js:79 ~ onSubmit ~ event", e)
        console.log("🚀 ~ file: EventForm.js:72 ~ onSubmit ~ data", {data})

        // const dataLoad = {...data, startDate: data.startDate.toDate(), endDate: data.endDate.toDate(), }
        
        // if (submitRequestStatus === 'idle') {
        //     try {
        //         setSubmitRequestStatus('pending')
        //         dispatch(toggleShowModal())
        //         await dispatch(submitAction(dataLoad)).unwrap()
        //     } catch (err) {
        //         dispatch(setNotification({message: err.message, type: 'error'}))
        //     } finally {
        //         setSubmitRequestStatus('idle')
        //     }
        // }
    }

    const handleDelete = async () => {
        try {
            setSubmitRequestStatus('pending')
            dispatch(toggleShowModal())
            await dispatch(deleteEvent()).unwrap()
        } catch (err) {
            dispatch(setNotification({message: err.message, type: 'error'}))
        } finally {
            setSubmitRequestStatus('idle')
        }
    }

    console.log(watch())



    return (
        <Dialog
            open={props.open}
        >
            <Box
                sx={{ p: 2, m: 1, border: '1px dashed grey' }}
                component='form'
            >

                <DialogTitle>{submitBtnText} Event</DialogTitle>          <DialogContent sx={{ p: 2, m: 1, border: '1px dashed green' }}
                >
                    <DialogContentText>
                        To submit, fill in all fields.
                    </DialogContentText>                
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Stack spacing={3}>

                            <Controller
                                control={control}
                                name="title"
                                rules={{ required: "Please enter a title" }}
                                render={({ field: { onChange, value, ref }, fieldState: {error}}) => (
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
                                name='location'
                                control={control}
                                label='Location'
                                disabled={readOnly}
                            />

                            <UserSelectDropdown 
                                name='userId'
                                control={control}
                                usersList={usersList}
                                label='User'
                                disabled={readOnly}

                            />

                            <Controller
                                control={control}
                                name="start"
                                rules={{
                                    required: "Please select datetime"
                                }}

                                render={({field, fieldState}) => (
                                    <DateTimePicker
                                        {...field}
                                        label="Start datetime"
                                        disabled={readOnly}
   
                                        renderInput={(params) => 
                                            <TextField {...params}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}

                                            />
                                        }
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="end"
                                rules={{
                                    required: "Please select datetime",
                                    validate: () => {
                                        return getValues('end') > getValues('start') ? true : "End date must be later"
                                    }
                                }}
                                render={({field, fieldState}) => (
                                    <DateTimePicker
                                        {...field}
                                        label="End datetime"
                                        disabled={readOnly}   
                                        renderInput={(params) => 
                                            <TextField {...params}
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
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
                        variant='text'
                        onClick={handleClose}
                        startIcon={<CancelIcon />}
                    >  
                    Cancel
                    </Button>
                    {
                        formType === 'update' &&
                        <Button
                            variant='text'
                            onClick={handleDelete}
                            startIcon={<DeleteIcon />}
                            disabled
                        >
                        Delete
                        </Button>
                    }
                    <Button
                        type='submit' 
                        variant='text'
                        onClick={handleSubmit}
                        disabled
                        startIcon={<CheckIcon />}
                    >
                        {submitBtnText}
                    </Button>

                </DialogActions>

            </Box>        
        </Dialog>
    )
}


            
            
