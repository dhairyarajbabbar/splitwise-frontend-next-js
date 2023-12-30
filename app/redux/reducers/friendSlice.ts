// redux/reducers/authReducer.ts
'use client'
import { createSlice } from '@reduxjs/toolkit';

export interface friendState {
  user: {
    email: string;
  } | null;
}

const initialState: friendState = {
  user: null,
};
export const friendSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getFriends:(state, action)=>{
      state.user={email: action.payload.email};
      console.log(state.user.email);
    },
  }
})

export const { getFriends } = friendSlice.actions;

export default friendSlice.reducer;
