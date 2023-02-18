import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../mocks/client.js'

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken') &&
      JSON.parse(localStorage.getItem('userToken'))
    : null

const initialState = {
    isLoggedIn: false,
    userId: null,
    userToken,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.userId = Number(Object.keys(action.payload)[0])
                state.userToken = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
    },
})

export const register = createAsyncThunk('auth/register', async (data) => {
    const response = await client.post(`/myApi/register`, data)
    return response.data
})

export const login = createAsyncThunk('auth/login', async (crediantials) => {
    const response = await client.post('/myApi/login', crediantials)
    return response.data
})

export const logout = createAsyncThunk('auth/logout', async (crediantials) => {
    const response = await client.post('/myApi/logout', crediantials)
    localStorage.removeItem('userToken')
    return response.data
})

export default authSlice.reducer
