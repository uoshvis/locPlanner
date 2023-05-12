import { createSelector, createSlice } from '@reduxjs/toolkit'
import { eventsApi } from '../../app/services/events'

export const selectEventsResult = eventsApi.endpoints.getEvents.select()

const emptyEvents = []

export const selectAllEvents = createSelector(
    selectEventsResult,
    (eventResult) => eventResult?.data ?? emptyEvents
)

export const selectEventById = createSelector(
    selectAllEvents,
    (state, eventId) => eventId,
    (events, eventId) => events.find((event) => event.id === eventId)
)

export const filterEventsByLoc = createSelector(
    selectAllEvents,
    (state, eventLoc) => eventLoc,
    (events, eventLoc) => events.filter((event) => event.location === eventLoc)
)

const initialState = {
    formType: '', // 'view' |'add' | 'update'
}

export const eventsSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: {},
        getEvent: {},

        setFormType(state, action) {
            state.formType = action.payload
        },
    },
})

export const { setFormType } = eventsSlice.actions

export default eventsSlice.reducer
