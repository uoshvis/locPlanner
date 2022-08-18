import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import formReducer from '../features/eventForm/formValidationSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    calendar: calendarReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['calendar/fetchEventsByLocation/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.start',
          'payload.end',
          'meta.arg.start',
          'meta.arg.end',
          'payload.value'
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'calendar.items', 
          'calendar.currentItem.start',
          'calendar.currentItem.end',     
        ],
      },
    }),
});
