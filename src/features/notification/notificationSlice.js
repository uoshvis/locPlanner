import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
    fetchEventsByLocation,
    addEventData,
    updateEventData,
    deleteEvent,
    deleteEvents,
} from '../events/eventsSlice'
import { fetchUsers, deleteUser } from '../users/usersSlice'
import { login, logout, fetchUserDetails, updateUser } from '../auth/authSlice'
import { fetchMeetings } from '../meetings/meetingsSlice'

const notificationAdapter = createEntityAdapter()

// Available types: error, warning, info, success
const initialState = notificationAdapter.getInitialState({
    message: null,
    type: null,
    open: false,
    apiStatus: 'idle', // 'idle' | 'loading' only 2 <<-- | 'succeeded' | 'failed',
})

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.open = true
        },
        clearNotification: (state) => {
            state.message = null
            state.type = null
            state.open = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(fetchEventsByLocation.rejected),
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
                    logout.pending,
                    fetchUsers.pending,
                    fetchUserDetails.pending,
                    fetchEventsByLocation.pending,
                    addEventData.pending,
                    updateEventData.pending,
                    deleteEvent.pending,
                    updateUser.pending,
                    deleteUser.pending,
                    deleteEvents.pending,
                    fetchMeetings.pending
                ),
                (state, action) => {
                    state.apiStatus = 'loading'
                    state.message = null
                    state.type = null
                    state.open = false
                }
            )
            .addMatcher(
                isAnyOf(
                    login.fulfilled,
                    logout.fulfilled,
                    fetchUsers.fulfilled,
                    fetchUserDetails.fulfilled,
                    fetchEventsByLocation.fulfilled,
                    addEventData.fulfilled,
                    updateEventData.fulfilled,
                    deleteEvent.fulfilled,
                    deleteUser.fulfilled,
                    updateUser.fulfilled,
                    deleteEvents.fulfilled,
                    fetchMeetings.fulfilled
                ),
                (state, action) => {
                    state.apiStatus = 'idle'
                }
            )
            .addMatcher(
                isAnyOf(
                    login.rejected,
                    logout.rejected,
                    fetchUsers.rejected,
                    fetchUserDetails.rejected,
                    fetchEventsByLocation.rejected,
                    addEventData.rejected,
                    updateEventData.rejected,
                    deleteEvent.rejected,
                    deleteUser.rejected,
                    updateUser.rejected,
                    deleteEvents.rejected,
                    fetchMeetings.rejected
                ),
                // set rejected status as 'idle' for now
                (state, action) => {
                    state.apiStatus = 'idle'
                    state.message = action.error.message
                    state.type = 'error'
                    state.open = true
                }
            )
    },
})

export const getNotificationMsg = (state) => state.notification.message
export const getNotificationType = (state) => state.notification.type
export const isNotificationOpen = (state) => state.notification.open
export const getApiStatus = (state) => state.notification.apiStatus

export const { clearNotification, setNotification } = notificationSlice.actions

export default notificationSlice.reducer
