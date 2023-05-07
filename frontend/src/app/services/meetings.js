import { api } from './api'

export const meetingsApi = api.injectEndpoints({
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
