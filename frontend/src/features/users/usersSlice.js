import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../mocks/client'

const initialState = { items: [] }

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.items = action.payload
        })
    },
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/myApi/users')
    return response.data
})

export const fetchUser = createAsyncThunk('users/fetchUser', async (id) => {
    const response = await client.get(`/myApi/users/${id}`)
    return response.data
})
export const createUser = createAsyncThunk('users/createUser', async (data) => {
    const response = await client.post(`/myApi/users`, data)
    return response.data
})

export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
    const response = await client.put(`/myApi/users/${data.id}`, data)
    return response.data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    const response = await client.delete(`/myApi/users/${id}`, id)
    return response.data
})

export default usersSlice.reducer

// Custom getters
export const getUserById = (state, userId) => {
    return state.users.items.find((user) => user.id === Number(userId))
}

export const getUserColors = (state) => {
    var userColors = state.users.items.reduce((obj, item) => {
        obj[item.id] = item.userColor
        return obj
    }, {})
    return userColors
}