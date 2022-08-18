import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import eventsReducer from '../features/calendar/eventsSlice';
import formReducer from '../features/eventForm/formValidationSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    events: eventsReducer,
    form: formReducer,
  },
});
