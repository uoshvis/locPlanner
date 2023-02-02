import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../mocks/client'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/myApi/users')
    return response.data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    const response = await client.delete(`/myApi/users/${id}`, id)
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {})
    },
})

export default usersSlice.reducer

export const getUserById = (state, userId) => {
    return state.users.find((user) => user.id === Number(userId))
}

export const getUserColors = (state) => {
    var userColors = state.users.reduce((obj, item) => {
        obj[item.id] = item.userColor
        return obj
    }, {})
    return userColors
}
