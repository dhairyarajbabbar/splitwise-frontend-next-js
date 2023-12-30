'use client';
// // redux/store.ts
// import { combineReducers } from 'redux';
// import authReducer from './reducers/authReducer';
// import {configureStore} from '@reduxjs/toolkit'

// const rootReducer = combineReducers({
//   auth: authReducer,
//   // Add other reducers if needed
// });

// const store = configureStore(rootReducer);

// export default store;
// // export default rootReducer;

// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import friendReducer from './reducers/friendSlice';
import groupReducer from './reducers/groupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    friend: friendReducer,
    Group: groupReducer,
  },
});

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
