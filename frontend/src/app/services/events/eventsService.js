import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:5000/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        },
    }),
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
} = eventsApi
