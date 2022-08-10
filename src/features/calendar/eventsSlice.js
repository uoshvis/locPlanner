import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const data = [      {
  id: 10,
  start: moment().toString(),
  end: moment().add(1, "hours").toString(),
  title: "Some title",
  location: 'loc1',

},
{   
  id: 20,
  start: moment().add(2, "days").toString(),
  end: moment().add(3, "days").toString(),
  title: "Some title2",
  location: 'loc2',
},]


const initialState = {
  items: [],
  currentItem : {},
  currentLocation: 'all',
  showModal: false,  
}


export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
      addEvent: {},
      getEvent: {},

      filterEvents: (state, action) => {
        if (action.payload === 'all') {
          state.items = data
        }
        else {
          const filtered = data.filter(item => item.location === action.payload)
          state.items = filtered
        }        
      },     

      toggleShowModal(state) {
        state.showModal = !state.showModal
        if(!state.showModal) {
          state.currentItem = {}
        }
      },
      selectCurrentEvent: (state, action) => {
        state.currentItem = action.payload
      },
      updateCurrentEvent: (state, action) => {        
        const { key, value }  = action.payload
        state.currentItem[key] = value
      },
      updateEvent: (state, action) => {
        const updatedEvent = action.payload
        const objIdx = state.items.findIndex(obj => obj.id === updatedEvent.id)
        state.items[objIdx] = updatedEvent
      },
      deleteEvent: {}
  }
})

export const {
  filterEvents,
  toggleShowModal,
  selectCurrentEvent,
  updateCurrentEvent,
  updateEvent, 
} = eventsSlice.actions

export default eventsSlice.reducer
