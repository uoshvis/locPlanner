import { createSlice } from '@reduxjs/toolkit';


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

      getEventsByLocation: (state, action) => {
        state.items = action.payload      
      },
      toggleShowModal(state) {
        state.showModal = !state.showModal
        if(!state.showModal) {
          state.currentItem = {}
        }
      },
      setCurrentLocation(state, action) {
        state.currentLocation = action.payload
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


export const fetchEventsByLocation = (location) => {
  return async (dispatch) => {
    const fetchHandler = async() => {
      const res = await fetch(`/events/${location}`)
      const data = await res.json()
      return data
    }
    try {
      const events = await fetchHandler()
      dispatch(getEventsByLocation(events))
    } catch(err) {
      console.log(err)
    }

  }
}


export const {
  getEventsByLocation,
  toggleShowModal,
  setCurrentLocation,
  selectCurrentEvent,
  updateCurrentEvent,
  updateEvent, 
} = eventsSlice.actions

export default eventsSlice.reducer
