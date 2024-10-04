import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slices/cart.slice';
import locationReducer from './slices/location.slice';
import accountReducer from './slices/account.slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    account: accountReducer,
    location: locationReducer,
  },
});

export default store;
