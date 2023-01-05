import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchEventsByLocation, addEventData, updateEventData, deleteEvent } from '../calendar/calendarSlice';
import { fetchUsers } from '../users/usersSlice';
import { login, fetchUserDetails } from '../auth/authSlice';


const notificationAdapter = createEntityAdapter()

// Available types: error, warning, info, success
const initialState = notificationAdapter.getInitialState(
    {
       message: null,
       type: null,
       open: false,
       apiStatus: 'idle' // 'idle' | 'loading' only 2 <<-- | 'succeeded' | 'failed', 
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
          // match pending, fulfilled and rejected
          .addMatcher(
            isAnyOf(
                login.pending,
                fetchUsers.pending,
                fetchUserDetails.pending,
                fetchEventsByLocation.pending,
                addEventData.pending,
                updateEventData.pending,
                deleteEvent.pending,
            ),
            (state, action) => {
                state.apiStatus = 'loading'
            }
          )
          .addMatcher(
            isAnyOf(
                login.fulfilled,
                fetchUsers.fulfilled,
                fetchUserDetails.fulfilled,
                fetchEventsByLocation.fulfilled,
                addEventData.fulfilled,
                updateEventData.fulfilled,
                deleteEvent.fulfilled,
            ),
            (state, action) => {
                state.apiStatus = 'idle'
            }
          )
          .addMatcher(
            isAnyOf(
                login.rejected,
                fetchUsers.rejected,
                fetchUserDetails.rejected,
                fetchEventsByLocation.rejected,
                addEventData.rejected,
                updateEventData.rejected,
                deleteEvent.rejected
            ),
            // set rejected status as 'idle' for now
            (state, action) => {
                state.apiStatus = 'idle'
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
export const getApiStatus = state => state.notification.apiStatus

export const { clearNotification, setNotification } = notificationSlice.actions

export default notificationSlice.reducer

