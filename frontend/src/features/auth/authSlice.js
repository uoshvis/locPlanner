import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'

// initialize userToken from session storage
const userToken = sessionStorage.getItem('userToken')
    ? JSON.parse(sessionStorage.getItem('userToken'))
    : null

const initialState = {
    isLoggedIn: false, // isAuthenticated
    userInfo: null, // user
    userToken, // token
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
            sessionStorage.removeItem('userToken')
        },
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload
            state.isLoggedIn = true
        },
    },
    extraReducers(builder) {
        builder
            // .addCase(login.fulfilled, (state, action) => {
            //     state.isLoggedIn = true
            //     state.userInfo = action.payload
            //     state.userToken = action.payload.userToken
            // })
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.isLoggedIn = true
                    state.userInfo = action.payload
                    state.userToken = action.payload.userToken
                    sessionStorage.setItem(
                        'userToken',
                        JSON.stringify(action.payload.userToken)
                    )
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchPending,
                (state, action) => {
                    console.log('pending login')
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchRejected,
                (state, action) => {
                    console.log('rejected', action)
                }
            )
    },
})

// export const register = createAsyncThunk(
//     'auth/register',
//     async (data, { rejectWithValue }) => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//             await axios.post(`${backendURL}/api/auth/register`, data, config)
//         } catch (error) {
//             // return custom error message from backend if present
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )

// export const login = createAsyncThunk(
//     'auth/login',
//     async ({ userName, password }, { rejectWithValue }) => {
//         try {
//             // configure header's Content-Type as JSON
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }
//             const { data } = await axios.post(
//                 `${backendURL}/api/auth/login`,
//                 { userName, password },
//                 config
//             )
//             // store user's token in local storage
//             localStorage.setItem('userToken', data.userToken)
//             return data
//         } catch (error) {
//             // return custom error message from API if any
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )

export const { logout, setUserInfo } = authSlice.actions

export default authSlice.reducer
