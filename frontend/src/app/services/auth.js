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
    }),
})

export const { useLoginMutation } = authApi

export const {
    endpoints: { login },
} = authApi
