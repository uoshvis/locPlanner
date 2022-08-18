import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jsonDateTimeConverter } from './calendarHelpers.js'

const initialState = {
  items: [],
  currentItem : {},
  currentLocation: 'all',
  showModal: false,
  status: 'idle',
  error: null, 
  eventStatus: '' 
}


export const calendarSlice = createSlice({
  name: 'calendar',
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

      setEventStatus(state, action) {
        state.eventStatus = action.payload
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
        state.items = jsonDateTimeConverter(action.payload)
      })
      .addCase(fetchEventsByLocation.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addEventData.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addEventData.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(updateEventData.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateEventData.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  }
})


export const fetchEvents = createAsyncThunk('calendar/fetchEvents', async () => {
  const fetchHandler = async () => {
    const response = await fetch(`/events/`)
    const data = await response.json()
    return data
  }
  const data = await fetchHandler()
  return data
})


export const fetchEventsByLocation = createAsyncThunk('calendar/fetchEventsByLocation', async (location) => {
  const fetchHandler = async () => {
    const response = await fetch(`/events/${location}`)
    const data = await response.json()
    return data
  }
  const data = await fetchHandler()
  return data
})


export const addEventData = createAsyncThunk('calendar/createEvent', async (event) => {
  const sendRequest = async (event) => {
    const response = await fetch(
        `/events/`,
        {
          method: "POST",
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



export const updateEventData = createAsyncThunk('calendar/updateEvent', async (event) => {
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
  setEventStatus,
  toggleShowModal,
  setCurrentLocation,
  selectCurrentEvent,
  updateCurrentEvent,
  updateEvent, 
} = calendarSlice.actions

export default calendarSlice.reducer