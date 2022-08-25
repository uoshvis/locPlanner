import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchEventsByLocation } from '../calendar/calendarSlice';

const notificationAdapter = createEntityAdapter()

// Available types: error, warning, info, success
const initialState = notificationAdapter.getInitialState(
    {
       message: null,
       type: null,
       open: false
   }    
)

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.open = true        
        },
        clearNotification: state => {
            state.message = null
            state.type = null
            state.open = false
        }
      },
      extraReducers: builder => {
        builder
          .addMatcher(
            isAnyOf(
                fetchEventsByLocation.rejected,
            ),
            (state, action) => {
                state.message = action.error.message
                state.type = 'error'
                state.open = true
            }
          )
          // reset all notifications on pending
          .addMatcher(
            isAnyOf(
                fetchEventsByLocation.pending
            ),
            (state, action) => {
                state.message = null
                state.type = null
                state.open = false
            }
          )
      },
})


export const getNotificationMsg = state => state.notification.message
export const getNotificationType = state => state.notification.type
export const isNotificationOpen = state => state.notification.open

export const { clearNotification, setNotification } = notificationSlice.actions

export default notificationSlice.reducer

