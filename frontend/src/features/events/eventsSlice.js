import { createSelector } from '@reduxjs/toolkit'
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
