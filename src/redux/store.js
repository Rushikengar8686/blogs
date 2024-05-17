import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './BlogUserSlice';
export const store = configureStore({
    reducer: {
        bolg: todoReducer,
      
    },
  });
