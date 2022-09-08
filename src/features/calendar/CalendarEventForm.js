import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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


export const CalendarEventForm = (props) =>  {
    const dispatch = useDispatch()

    const event = useSelector(state => state.calendar.currentItem)
    const formType = useSelector(state => state.calendar.formType)

    const [formEvent, setFormEvent] = useState(event)
    const [formIsValid, setFormIsValid] = useState(true)
    const [errors, setErrors] = useState({})
    const [submitRequestStatus, setSubmitRequestStatus] = useState('idle')

    let submitBtnText = ''
    let submitAction = null
    
    if (formType === 'add') {
        submitBtnText = 'Add'
        submitAction = addEventData
    } else if (formType === 'update') {
        submitBtnText = 'Update'
        submitAction = updateEventData
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 ) {
            setFormIsValid(true)
        } else {
            setFormIsValid(false)
        }
    }, [errors])

    useEffect(() => {
        dispatch(clearNotification())
    }, [formEvent, dispatch])


    const resetFieldError = (field) => {
        setErrors((errors) => {
            const newErrors = {...errors}
            delete newErrors[field]
            return newErrors
        })
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormEvent(formEvent => ({
            ...formEvent,
            [id]: value
        }))
        resetFieldError(id)
    }

    const handleLocationChange = (e) => {
        const { value } = e.target
        const key = 'location'
        setFormEvent(formEvent => ({
            ...formEvent,
            [key]: value
        }))
        resetFieldError(key)
    }

    const handleStartChange = (data) => {
        const key = 'start'
        setFormEvent(formEvent => ({
            ...formEvent,
            [key]: data
        }))
        resetFieldError(key)
    }

    const handleEndChange = (data) => {
        const key = 'end'
        setFormEvent(formEvent => ({
            ...formEvent,
            [key]: data
        }))
        resetFieldError(key)
    }

    const validateForm = () => {
        let fEvent = formEvent
        let errs = {}
        let isValid = true;
        //Title
        if (!fEvent["title"] || !fEvent["title"].trim()) {    
            isValid = false
            errs['title'] = 'Cannot be empty'
        }
        if (!fEvent.location || fEvent.location === 'all') {
            isValid = false
            errs['location'] = 'Select a location'
        }
        // Start & end time
        if (!fEvent.start) {
            isValid = false
            errs['start'] = "Select start time"
        }
        if (!fEvent.end) {
            isValid = false
            errs['end'] = "Select start end"
        }
        if (fEvent.start && fEvent.end) {
            const dStart = Date.parse(fEvent.start) 
            const dEnd = Date.parse(fEvent.end) 
            if (dStart >= dEnd) {
                isValid = false
                errs['end'] = "End date must be later"
            } 
          }
        setErrors(errs)
        return isValid
    }

    const handleClose = () => {
        dispatch(toggleShowModal())
    };
      
    const handleSubmit = async () => {
        if (validateForm() && submitRequestStatus === 'idle') {
            try {
                setSubmitRequestStatus('pending')
                dispatch(toggleShowModal())
                await dispatch(submitAction(formEvent)).unwrap()
            } catch (err) {
                dispatch(setNotification({message: err.message, type: 'error'}))
            } finally {
                setSubmitRequestStatus('idle')
            }
        }
    }

    const handleDelete = async () => {
        try {
            setSubmitRequestStatus('pending')
            dispatch(toggleShowModal())
            await dispatch(deleteEvent(formEvent)).unwrap()
        } catch (err) {
            dispatch(setNotification({message: err.message, type: 'error'}))
        } finally {
            setSubmitRequestStatus('idle')
        }
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>{submitBtnText} Event</DialogTitle>  
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Stack spacing={3}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            error={!formIsValid && 'title' in errors}
                            helperText={errors.title}
                            variant="outlined"
                            value={formEvent.title || ''}
                            onChange={handleChange}
                        />
                        
                        <FormControl 
                            fullWidth
                            error={!formIsValid && 'location' in errors}
                        >
                            <InputLabel id="location-select-label">Location</InputLabel>
                            <Select
                                labelId="location-select-label"
                                id="location"
                                value={formEvent.location || ''}
                                label="Location"
                                onChange={handleLocationChange}
                            >
                                <MenuItem disabled value="all"><em>Please select</em></MenuItem>
                                <MenuItem value={'loc1'}>Location 1</MenuItem>
                                <MenuItem value={'loc2'}>Location 2</MenuItem>
                            </Select>
                        </FormControl>
                        <DateTimePicker
                            label="Start datetime"
                            value={formEvent.start}
                            onChange={handleStartChange}
                            renderInput={(params) => 
                                <TextField {...params}
                                error={!formIsValid && 'start' in errors}
                                helperText={errors.start}
                                />
                            }
                        />
                        <DateTimePicker                                             label="End datetime"
                            value={formEvent.end}
                            onChange={handleEndChange}
                            renderInput={(params) => 
                                <TextField {...params}
                                error={!formIsValid && 'end' in errors}
                                helperText={errors.end}
                                />
                            }
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
                    >
                    Delete
                    </Button>
                }
                <Button 
                    variant='text'
                    onClick={handleSubmit}
                    startIcon={<CheckIcon />}
                >
                    {submitBtnText}
                </Button>

            </DialogActions>            
        </Dialog>
    )
}


            
            
