import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import contentReducer from './content/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
