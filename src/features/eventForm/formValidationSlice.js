import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formIsValid: true,
    errors: {}
}

export const formValidationSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setErrors(state, action) {
            state.errors = {...state.errors, ...action.payload}
            state.formIsValid = false

        },
        resetFieldError(state, action) {
            delete state.errors[action.payload]
            if (Object.keys(state.errors).length === 0 ) {
                state.formIsValid = true
            }
        },
        resetAllErrors(state) {
            state.errors = {}
            state.formIsValid = true
        }
    }
})


export const { 
    setErrors, resetFieldError, resetAllErrors} = formValidationSlice.actions

export default formValidationSlice.reducer