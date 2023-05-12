import { api } from './api'

export const eventsApi = api.injectEndpoints({
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: (arg) => ({
                url: 'api/events',
                params: arg,
                method: 'GET',
            }),
            providesTags: ['Events'],
        }),
        getEvent: builder.query({
            query: (id) => ({
                url: `api/events/${id}`,
                method: 'GET',
            }),
        }),
        createEvent: builder.mutation({
            query: (body) => ({
                url: `api/events`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Events'],
        }),
        updateEvent: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `api/events/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Events'],
        }),
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `api/events/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Events'],
        }),
        deleteEvents: builder.mutation({
            query: (body) => ({
                url: `api/events/delete`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['Events'],
        }),
    }),
})
// export hooks for usage in functional components
// auto-generated based on the defined endpoints
export const {
    useGetEventsQuery,
    useGetEventQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,
    useDeleteEventsMutation,
} = eventsApi
