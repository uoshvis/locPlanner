import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../mocks/client.js'

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken') &&
      JSON.parse(localStorage.getItem('userToken'))
    : null

const initialState = {
    isLoggedIn: false,
    userId: null,
    userDetails: {},
    userToken,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {})
            .addCase(login.rejected, (state, action) => {})
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.userToken = action.payload.token
                state.userId = Number(Object.keys(action.payload.token)[0])
                state.userDetails = action.payload.userDetails
            })
            .addCase(logout.pending, (state, action) => {})
            .addCase(logout.rejected, (state, action) => {})
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.userDetails = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (state.userDetails.id === action.payload.id) {
                    state.userDetails = action.payload
                }
            })
    },
})

export const register = createAsyncThunk('auth/register', async (data) => {
    const response = await client.post(`/myApi/register`, data)
    return response.data
})

export const login = createAsyncThunk('auth/login', async (crediantials) => {
    async function loginWithUserDetails() {
        try {
            const loginPromise = await client.post('/myApi/login', crediantials)
            const loginResponseData = loginPromise.data
            const id = Number(Object.keys(loginResponseData)[0])
            const userDetails = await client.get(`/myApi/users/${id}`)
            return {
                token: { ...loginResponseData },
                userDetails: { ...userDetails.data },
            }
        } catch (err) {
            throw err
        }
    }
    const responseData = await loginWithUserDetails()
    return responseData
})

export const logout = createAsyncThunk('auth/logout', async (crediantials) => {
    const response = await client.post('/myApi/logout', crediantials)
    localStorage.removeItem('userToken')
    return response.data
})
// ToDo move this to users
export const fetchUserDetails = createAsyncThunk(
    'users/fetchUser',
    async (id) => {
        const response = await client.get(`/myApi/users/${id}`)
        return response.data
    }
)
// ToDo move this to user

export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
    const response = await client.put(`/myApi/users/${data.id}`, data)
    return response.data
})

export default authSlice.reducer
