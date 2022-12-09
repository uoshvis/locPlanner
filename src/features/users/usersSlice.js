import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from '../../mocks/client'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const response = await client.get('/myApi/users')
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
    }
})

export default usersSlice.reducer