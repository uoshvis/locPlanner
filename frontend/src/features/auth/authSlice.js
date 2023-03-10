import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { client } from '../../mocks/client.js'
import axios from 'axios'
import { updateUser } from '../users/usersSlice.js'

const backendURL = 'http://127.0.0.1:5000'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    userId: null,
    userToken,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // delete token from storage
            state.isLoggedIn = false
            state.userInfo = null
            state.userToken = null
        },
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload
            state.isLoggedIn = true
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                // ToDo remove userId
                state.userId = action.payload._id
                state.userInfo = action.payload
                state.userToken = action.payload.userToken
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                if (state.userInfo.id === payload.id) {
                    state.userInfo = payload
                }
            })
    },
})

// Auth with Mock

// export const register = createAsyncThunk('auth/register', async (data) => {
//     const response = await client.post(`/myApi/register`, data)
//     return response.data
// })

// export const login = createAsyncThunk('auth/login', async (crediantials) => {
//     const response = await client.post('/myApi/login', crediantials)
//     return response.data
// })

// Auth with Backend

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(`${backendURL}/api/user/register`, data, config)
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({ userName, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(
                `${backendURL}/api/user/login`,
                { userName, password },
                config
            )
            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const { logout, setUserInfo } = authSlice.actions

export default authSlice.reducer
