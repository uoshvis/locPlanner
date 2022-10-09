import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../mocks/client.js';

const initialState =  { 
    isLoggedIn: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    currentUser: {
        id: 101,
        permissions: ['edit'],
        roles: ['admin'],
    }
 }


export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(login.rejected, (state, action) => { // ToDo Add reject case for invalid user
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.status = 'succeeded'
            })
            .addCase(logout.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
                state.status = 'succeeded'        
            })
    }
})

export const login = createAsyncThunk('auth/login', async (crediantials) => {
    const response = await client.post('/myApi/login', crediantials)
    localStorage.setItem('token', JSON.stringify(response.data));
    return response.data
})

export const logout = createAsyncThunk('auth/logout', async (crediantials) => {
    const response = await client.post('/myApi/logout', crediantials)
    localStorage.removeItem('token');
    return response.data
})


export default authSlice.reducer
