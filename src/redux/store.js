import {  configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import todoReducer from "./slice/todoSlice";


export const store = configureStore({
    reducer: {
        todos: todoReducer,
        user: userReducer,
  
    },
    // devTools: import.meta.env.VITE_ENV !== 'production'
});



export const RootState = store.getState;
export const AppThunk = store.dispatch;
export const AppDispatch = store.dispatch;