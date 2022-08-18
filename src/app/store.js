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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['events/fetchEventsByLocation/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.start',
          'payload.end',
          'meta.arg.start',
          'meta.arg.end'
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'events.items', 
          'events.currentItem.start',
          'events.currentItem.end',     
        ],
      },
    }),
});
