import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  currentItem : {},
  currentLocation: 'all',
  showModal: false,
  status: 'idle',
  error: null  
}


export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
      addEvent: {},
      getEvent: {},

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
      deleteEvent: {}
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchEventsByLocation.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchEventsByLocation.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateEventData.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateEventData.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  }
})


export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const fetchHandler = async () => {
    const response = await fetch(`/events/`)
    const data = await response.json()
    return data
  }
  const data = await fetchHandler()
  return data
})

export const fetchEventsByLocation = createAsyncThunk('events/fetchEventsByLocation', async (location) => {
  const fetchHandler = async () => {
    const response = await fetch(`/events/${location}`)
    const data = await response.json()
    return data
  }
  const data = await fetchHandler()
  return data
})

export const updateEventData = createAsyncThunk('events/updateEvent', async (event) => {
  const sendRequest = async (event) => {
    const response = await fetch(
        `/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/ajson',
          },
          body: JSON.stringify(event)
        }
      )
    const data = await response.json()
    return data
  }
  const data = await sendRequest(event)
  return data
})


export const {
  toggleShowModal,
  setCurrentLocation,
  selectCurrentEvent,
  updateCurrentEvent,
  updateEvent, 
} = eventsSlice.actions

export default eventsSlice.reducer
