import { api } from './api'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query(body) {
                return {
                    url: 'api/auth/login',
                    method: 'POST',
                    body,
                }
            },
        }),
        register: builder.mutation({
            query(body) {
                return {
                    url: 'api/auth/register',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Users', 'UsersData'],
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation } = authApi

export const {
    endpoints: { login },
} = authApi
