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

export const { logout, setUserInfo } = authSlice.actions

export default authSlice.reducer
