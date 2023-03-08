import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const meetingsApi = createApi({
    reducerPath: 'meetingsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/myApi/' }),
    endpoints: (builder) => ({
        getAllMeetings: builder.query({
            query: () => `meetings`,
        }),
        getMeetingById: builder.query({
            query: (id) => `meetings/${id}`,
        }),
    }),
})

export const { useGetAllMeetingsQuery } = meetingsApi
