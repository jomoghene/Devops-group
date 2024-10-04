import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUserId: null,
  currentUsername: '',
  currentUserEmail: '',
  currentUserCart: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logIn: (state, action) => {
      try {
        if (typeof window !== 'undefined') {
          console.log('This step is executed');
          localStorage.clear();
          state.isLoggedIn = true;
          state.currentUsername = action.payload.username;
          state.currentUserEmail = action.payload.email;
          if (action.payload.cart != null) {
            state.currentUserCart = action.payload.cart;
          } else {
            state.currentUserCart = [];
          }
          localStorage.setItem('cartItems', state.currentUserCart);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { logIn } = accountSlice.actions;
export default accountSlice.reducer;
