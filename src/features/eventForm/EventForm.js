import { useEffect, useState } from "react";
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

import { toggleShowModal, updateEvent } from "../calendar/eventsSlice"

export default function FormDialog(props) {
  //   const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const open = useSelector(state => state.events.showModal)
  const [currentEvent, setCurrentEvent] = useState({...props.currentEvent})
  // TODO FIX Current event does not update with select
  // ?? use global state for currentEvent??

  useEffect(() => {
    setCurrentEvent(props.currentEvent)
  }, [props.currentEvent])

  const handleSubmit = () => {
    dispatch(updateEvent(currentEvent))
    dispatch(toggleShowModal())
  };

  const handleClose = () => {
    dispatch(toggleShowModal())
  };

  const handleStartChange = (data) => {
    setCurrentEvent({...currentEvent, start: data.toDate()})    
  };
  const handleEndChange = (data) => {
    setCurrentEvent({...currentEvent, end: data.toDate()})    
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
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
              defaultValue={currentEvent.title}
            />
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
