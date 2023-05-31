import { api } from './api'

export const usersApi = api.injectEndpoints({
    tagTypes: ['Users', 'UserProfile', 'UsersData'],
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
            providesTags: ['UsersData'],
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
            invalidatesTags: ['Users', 'UserProfile', 'UsersData'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `api/users/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users', 'UsersData'],
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
    useLazyGetUserProfileQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi
