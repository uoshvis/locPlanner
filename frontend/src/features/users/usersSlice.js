import { createSelector } from '@reduxjs/toolkit'
import { usersApi } from './usersService'

export const selectUsersResult = usersApi.endpoints.getUsers.select()
const emptyUsers = []

export const selectAllUsers = createSelector(
    selectUsersResult,
    (usersResult) => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
    selectAllUsers,
    (state, userId) => userId,
    (users, userId) => users.find((user) => user.id === userId)
)
