import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import eventsReducer from '../features/calendar/eventsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    events: eventsReducer,
  },
});
