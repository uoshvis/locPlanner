import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const meetingsApi = createApi({
    reducerPath: 'meetingsApi',
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
