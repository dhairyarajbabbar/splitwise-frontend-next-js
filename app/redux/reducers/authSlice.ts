// redux/reducers/authReducer.ts
'use client'
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: {
    email: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//       increment: (state) => { state.value += 1 },
//       decrement: (state) => { state.value -= 1 },
//       incrementByAmount: (state, action) => {
//           state.value += action.payload;
//       }
//   }
// })
export const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser:(state, action)=>{
      state.user={email: action.payload.email};
      console.log(state.user.email);
    },
  }
  // switch (action.type) {
  //   case 'LOGIN_USER':
  //     return {
  //       ...state,
  //       user: { email: action.payload.email },
  //     };
  //   default:
  //     return state;
  // }
})

// export default authReducer;
export const { loginUser} = authslice.actions;

export default authslice.reducer;
