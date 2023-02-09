import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../mocks/client'

const initialState = []

export const fetchMeetings = createAsyncThunk(
    'meetings/fetchMeetings',
    async () => {
        const response = await client.get('/myApi/meetings')
        return response.data
    }
)

const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchMeetings.fulfilled, (state, action) => {
            return action.payload
        })
    },
})

export default meetingsSlice.reducer
