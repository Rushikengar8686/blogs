import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './BlogUserSlice';
export const store = configureStore({
    reducer: {
        bolg: blogReducer
      
    },
  });
