import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../mocks/client.js';


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken') && JSON.parse(localStorage.getItem('userToken'))
    : null

const initialState =  { 
    isLoggedIn: false,
    // ToDo use UserID from unserInfo
    userId: null,
    userInfo: {},
    userDetails: {},
    userToken,
 }


export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
            })
            .addCase(login.rejected, (state, action) => { // ToDo Add reject case for invalid user
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.userToken = action.payload
                state.userId = Number(Object.keys(action.payload)[0])
            })
            .addCase(logout.pending, (state, action) => {
            })
            .addCase(logout.rejected, (state, action) => {
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.userDetails = action.payload
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload
            })
    }
})

export const login = createAsyncThunk('auth/login', async (crediantials) => {
    const response = await client.post('/myApi/login', crediantials)
    localStorage.setItem('userToken', JSON.stringify(response.data));
    return response.data
})

export const logout = createAsyncThunk('auth/logout', async (crediantials) => {
    const response = await client.post('/myApi/logout', crediantials)
    localStorage.removeItem('userToken');
    return response.data
})

export const fetchUserDetails = createAsyncThunk('users/fetchUser', async (id) => {
    const response = await client.get(`/myApi/users/${id}`)
    return response.data
})

export const fetchUserInfo = createAsyncThunk('users/fetchUserInfo', async (id) => {
    const response = await client.get(`/myApi/users/${id}/info`)
    return response.data
})

export default authSlice.reducer
