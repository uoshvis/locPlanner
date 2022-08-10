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


import { toggleShowModal, updateEvent, updateCurrentEvent} from "../calendar/eventsSlice"

function FormDialog(props) {
  const dispatch = useDispatch()
  const currentEvent = useSelector(state => state.events.currentItem)


  const handleSubmit = () => {
    dispatch(updateEvent(currentEvent))
    dispatch(toggleShowModal())
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
      {key: 'start', value: data.toDate().toString()}
    ))
  };

  const handleEndChange = (data) => {
    dispatch(updateCurrentEvent(
      {key: 'end', value: data.toDate().toString()}
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
              variant="outlined"
              value={currentEvent.title || ''}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="location"
                value={currentEvent.location || ''}
                label="Location"
                onChange={handleLocationChange}
              >
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
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default FormDialog


