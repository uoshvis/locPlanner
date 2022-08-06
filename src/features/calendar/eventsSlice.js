import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';


const initialState = {
  items: [
      {
        id: 10,
        start: moment().toString(),
        end: moment().add(1, "hours").toString(),
        title: "Some title",
      },
      {   
        id: 20,
        start: moment().add(2, "days").toString(),
        end: moment().add(3, "days").toString(),
        title: "Some title2",
      },
    ],
  showModal: false,
  
}


export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
      addEvent: {},
      getEvent: {},
      toggleShowModal(state) {
        state.showModal = !state.showModal
      },
      updateEvent: (state, action) => {
        const updatedEvent = action.payload
        const objIdx = state.items.findIndex(obj => obj.id === updatedEvent.id)
        state.items[objIdx] = updatedEvent
      },
      deleteEvent: {}
  }
})

export const { toggleShowModal, updateEvent } = eventsSlice.actions

export default eventsSlice.reducer
