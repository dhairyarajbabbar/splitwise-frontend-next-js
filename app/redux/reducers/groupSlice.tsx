// redux/reducers/authReducer.ts
'use client'
import { createSlice } from '@reduxjs/toolkit';

export interface groupState {
  user: {
    email: string;
  } | null;
}

const initialState: groupState = {
  user: null,
};
export const groupSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getGroups:(state, action)=>{
      state.user={email: action.payload.email};
      console.log(state.user.email);
    },
  }
})

export const { getGroups } = groupSlice.actions;

export default groupSlice.reducer;
