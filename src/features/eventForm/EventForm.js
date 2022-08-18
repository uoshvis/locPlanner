import { useCallback, useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import { 
  toggleShowModal, 
  addEventData, 
  updateEventData, 
  updateCurrentEvent } from "../calendar/calendarSlice"

import { 
  setErrors, 
  resetFieldError, 
  resetAllErrors } from "./formValidationSlice"


function EventForm(props) {
  const dispatch = useDispatch()
  const currentEvent = useSelector(state => state.calendar.currentItem)
  const eventStatus = useSelector(state => state.calendar.eventStatus)
  const formIsValid = useSelector(state => state.form.formIsValid)
  const errors = useSelector(state => state.form.errors)

  const [submitRequestStatus, setSubmitRequestStatus] = useState('idle')
  
  const submitBtnText = eventStatus === 'updating' ? 'Update' : 'Add'


  const memoizedCallback = useCallback(
    () => {
      // Title
      if (!currentEvent["title"] || !currentEvent["title"].trim()) {    
        dispatch(setErrors({title: "Enter title"}))
      }
      // Location
      if (!currentEvent.location || currentEvent.location === 'all') {
        dispatch(setErrors({location: "Select location"}))
      }
      // Start & end time
      if (!currentEvent.start) {
        dispatch(setErrors({start: "Select start time"}))
      }
      if (!currentEvent.end) {
        dispatch(setErrors({end: "Select end time"}))
      }
      if (currentEvent.start && currentEvent.end) {
        const dStart = Date.parse(currentEvent.start) 
        const dEnd = Date.parse(currentEvent.end) 
        if (dStart >= dEnd) {
          dispatch(setErrors({end: "End date must be later"}))
        } 
      }
    },
    [dispatch, currentEvent],
  );

  useEffect(() => {  
    if (props.open) {
      memoizedCallback()
    } else {
      dispatch(resetAllErrors())
    }
  }, [props.open, memoizedCallback, dispatch])


  const handleSubmit = async () => {
    const submitAction = eventStatus === 'updating' ? updateEventData : addEventData

    if (formIsValid && submitRequestStatus === 'idle') {
      try {
        setSubmitRequestStatus('pending')

        await dispatch(submitAction(currentEvent)).unwrap()
        dispatch(toggleShowModal())
      } catch (err) {
        console.log('Failed to submit', err)
      } finally {
        setSubmitRequestStatus('idle')          
      }
    } else {
      alert('Invalid formUpdate '.concat(JSON.stringify(errors)) )
    }
  }
  
  const handleClose = () => {
    dispatch(toggleShowModal())
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target
    dispatch(resetFieldError(id))
    dispatch(updateCurrentEvent({key: id, value: value}))
  };

  const handleLocationChange = (e) => {
    const { value } = e.target
    const key = 'location'
    dispatch(resetFieldError(key))
    dispatch(updateCurrentEvent(
      {key, value: value}
    ))
  };

  const handleStartChange = (data) => {
    const key = 'start'
    dispatch(resetFieldError(key))
    dispatch(updateCurrentEvent(
      {key, value: data}
    ))
  };

  const handleEndChange = (data) => {
    const key = 'end'
    dispatch(resetFieldError(key))
    dispatch(updateCurrentEvent(
      {key, value: data}
    ))
  };
  

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Event Form</DialogTitle>
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
              value={currentEvent.title || ''}
              onChange={handleChange}
            />
          <FormControl 
            fullWidth 
            error={!formIsValid && 'location' in errors}>
              <InputLabel id="location-select-label">Location</InputLabel>
              <Select
                labelId="location-select-label"
                id="location"
                value={currentEvent.location || ''}
                label="Location"
                onChange={handleLocationChange}
              >         
              <MenuItem disabled value="all"><em>Please select</em></MenuItem>
                <MenuItem value={'loc1'}>Location 1</MenuItem>
                <MenuItem value={'loc2'}>Location 2</MenuItem>
              </Select>
              <FormHelperText>{errors.location}</FormHelperText>
            </FormControl>            
              <DateTimePicker
                label="Start datetime"
                value={currentEvent.start}
                onChange={handleStartChange}
                renderInput={(params) => <TextField 
                  {...params}
                  error={!formIsValid && 'start' in errors}
                  helperText={errors.start}
                />}
              />
              <DateTimePicker
                label="End datetime"
                value={currentEvent.end}
                onChange={handleEndChange}
                renderInput={(params) => <TextField 
                  {...params}
                  error={!formIsValid && 'end' in errors}
                  helperText={errors.end}
                />}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{submitBtnText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default EventForm


