import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = [
  {
      id: 10,
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Some title",
  },
  {   
      id: 20,
      start: moment().add(2, "days").toDate(),
      end: moment().add(3, "days").toDate(),
      title: "Some title2",
    },
]


export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
      addEvent: {},
      getEvent: {},
      updateEvent: {},
      deleteEvent: {}
  }
})

export default eventsSlice.reducer
