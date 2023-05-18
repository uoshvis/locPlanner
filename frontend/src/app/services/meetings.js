import { api } from './api'

export const meetingsApi = api.injectEndpoints({
    tagTypes: ['Meetings'],
    endpoints: (builder) => ({
        getMeetings: builder.query({
            query: (arg) => ({
                url: 'api/meetings',
                params: arg,
                method: 'GET',
            }),
            providesTags: ['Meetings'],
        }),
        getMeeting: builder.query({
            query: (id) => ({
                url: `api/meetings/${id}`,
                method: 'GET',
            }),
        }),
        createMeeting: builder.mutation({
            query: (body) => ({
                url: `api/meetings`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Meetings'],
        }),
        updateMeeting: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `api/meetings/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['Meetings'],
        }),
        deleteMeeting: builder.mutation({
            query: (id) => ({
                url: `api/meetings/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Meetings'],
        }),
        deleteMeetings: builder.mutation({
            query: (body) => ({
                url: `api/meetings/delete`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['Meetings'],
        }),
    }),
})
// export hooks for usage in functional components
// auto-generated based on the defined endpoints
export const {
    useGetMeetingsQuery,
    useGetMeetingQuery,
    useCreateMeetingMutation,
    useUpdateMeetingMutation,
    useDeleteMeetingMutation,
    useDeleteMeetingsMutation,
} = meetingsApi
