import { createSelector } from '@reduxjs/toolkit'
import { usersApi } from '../../app/services/users'

// getUsersData
export const selectUsersDataResult = usersApi.endpoints.getUsersData.select()

const emptyUsersData = []

export const selectAllUsersData = createSelector(
    selectUsersDataResult,
    (usersResult) => usersResult?.data ?? emptyUsersData
)

export const selectUserDataById = createSelector(
    selectAllUsersData,
    (state, userId) => userId,
    (users, userId) => users.find((user) => user.id === userId)
)

// getUsers
export const selectUsersResult = usersApi.endpoints.getUsers.select()

export const selectAllUsers = createSelector(
    selectUsersResult,
    (usersResult) => usersResult?.data ?? emptyUsersData
)

export const selectUserById = createSelector(
    selectAllUsers,
    (state, userId) => userId,
    (users, userId) => users.find((user) => user.id === userId)
)
