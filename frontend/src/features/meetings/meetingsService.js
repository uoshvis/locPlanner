import { apiSlice } from '../api/apiSlice'

export const meetingsApi = apiSlice.injectEndpoints({
    reducerPath: 'meetingsApi',
    endpoints: (builder) => ({
        getMeetings: builder.query({
            query: () => ({
                url: 'api/meetings',
                method: 'GET',
            }),
        }),
        getMeetingById: builder.query({
            query: (id) => ({ url: `api/meetings/${id}`, method: 'GET' }),
        }),
    }),
})

export const { useGetMeetingsQuery } = meetingsApi
