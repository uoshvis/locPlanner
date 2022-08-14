import { useState } from 'react' 
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


import { toggleShowModal, addEventData, updateEventData, updateCurrentEvent, } from "../calendar/eventsSlice"

function FormDialog(props) {
  const dispatch = useDispatch()
  const currentEvent = useSelector(state => state.events.currentItem)
  const eventStatus = useSelector(state => state.events.eventStatus)


  const [submitRequestStatus, setSubmitRequestStatus] = useState('idle')
  const submitBtnText = eventStatus === 'updating' ? 'Update' : 'Add'

  const canSave = 
    [currentEvent.title, currentEvent.start].every(Boolean) && submitRequestStatus === 'idle'

  const handleAdd = async () => {
    if (canSave) {
      try {
        setSubmitRequestStatus('pending')
        await dispatch(addEventData(currentEvent)).unwrap()
        dispatch(toggleShowModal())
      } catch (err) {
        console.log('Failed to add', err)
      } finally {
        setSubmitRequestStatus('idle')          
      }
    }
  }

  const handleUpdate = async () => {
    if (canSave) {
      try {
        setSubmitRequestStatus('pending')
        await dispatch(updateEventData(currentEvent)).unwrap()
        dispatch(toggleShowModal())
      } catch (err) {
        console.log('Failed to submit', err)
      } finally {
        setSubmitRequestStatus('idle')          
      }
    }
  };
  
  const handleClose = () => {
    dispatch(toggleShowModal())
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target
    dispatch(updateCurrentEvent({key: id, value: value}))
  };

  const handleLocationChange = (e) => {
    dispatch(updateCurrentEvent(
      {key: 'location', value: e.target.value}
    ))
  };

  const handleStartChange = (data) => {
    dispatch(updateCurrentEvent(
      {key: 'start', value: data.toDate().toISOString()}
    ))
  };

  const handleEndChange = (data) => {
    dispatch(updateCurrentEvent(
      {key: 'end', value: data.toDate().toISOString()}
    ))
  };
  
  const submitHandler = eventStatus === 'updating' ? handleUpdate : handleAdd

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
              variant="outlined"
              value={currentEvent.title || ''}
              onChange={handleChange}
            />
            <FormControl fullWidth>
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
            </FormControl>

              <DateTimePicker
                label="Start datetime"
                value={currentEvent.start}
                onChange={handleStartChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="End datetime"
                value={currentEvent.end}
                onChange={handleEndChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitHandler}>{submitBtnText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default FormDialog


