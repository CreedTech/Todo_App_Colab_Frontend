import {  configureStore } from "@reduxjs/toolkit";

// import apiReducer from "./slices/apiSlice";
import userReducer from "./slice/userSlice";


export const store = configureStore({
    reducer: {
        // apis: apiReducer,
        user: userReducer,
  
    },
    // devTools: import.meta.env.VITE_ENV !== 'production'
});



export const RootState = store.getState;
export const AppThunk = store.dispatch;
export const AppDispatch = store.dispatch;