import { api } from './api'

export const usersApi = api.injectEndpoints({
    tagTypes: ['Users', 'UserProfile'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: 'api/users',
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        getUsersData: builder.query({
            query: () => ({
                url: 'api/users/users-data',
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: 'api/users/profile',
                method: 'GET',
            }),
            providesTags: ['UserProfile'],
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `api/users/${id}`,
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query(data) {
                const { id, ...body } = data

                return {
                    url: `api/users/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: ['UserProfile', 'Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `api/users/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
})
// export hooks for usage in functional components
// auto-generated based on the defined endpoints
export const {
    useGetUsersQuery,
    useGetUsersDataQuery,
    useGetUserQuery,
    useGetUserProfileQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi
