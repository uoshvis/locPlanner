import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
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
        getUsers: builder.query({
            query: () => ({
                url: 'api/users',
                method: 'GET',
            }),
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: 'api/users/profile',
                method: 'GET',
            }),
        }),
    }),
})
// export hooks for usage in functional components
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useGetUserProfileQuery } = usersApi
