import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer'; // Path to your rootReducer

export const store = configureStore({
  reducer: rootReducer, // Use your combined reducers
});

// Infer the type of the store
export type AppStore = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
