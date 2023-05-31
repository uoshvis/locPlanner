import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../app/services/auth'
import { usersApi } from '../../app/services/users'

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
        logout: (state) => {
            sessionStorage.removeItem('userToken')
            state.isLoggedIn = false
            state.userInfo = null
            state.userToken = null
        },
        setUserInfo: (state, { payload }) => {
            state.isLoggedIn = true
            state.userInfo = payload
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.isLoggedIn = true
                    state.userInfo = action.payload.userInfo
                    state.userToken = action.payload.userToken
                    sessionStorage.setItem(
                        'userToken',
                        JSON.stringify(action.payload.userToken)
                    )
                }
            )
            .addMatcher(
                usersApi.endpoints.getUserProfile.matchFulfilled,
                (state, action) => {
                    state.userInfo = action.payload
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

export const { logout, setUserInfo } = authSlice.actions

export default authSlice.reducer
