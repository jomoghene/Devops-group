import { createSlice } from '@reduxjs/toolkit';
// Helper function to calculate cart item count
const calculateCartItemCount = (items) => {
  return items.reduce((accum, currItem) => accum + currItem.quantity, 0);
};

// Helper function to calculate total cart cost
const calculateCartCost = (items) => {
  return items.reduce(
    (accum, currItem) => accum + currItem.price * currItem.quantity,
    0,
  );
};

// Returns an array of product objects
const getCurrentCartItems = function () {
  // Check if user browser supports local storage
  if (typeof window !== 'undefined') {
    if (
      localStorage.getItem('cartItems') == null ||
      localStorage.getItem('cartItems') == ''
    ) {
      return [];
    } else {
      const parsedItems = JSON.parse(localStorage.getItem('cartItems'));
      return parsedItems;
    }
  } else {
    return [];
  }
};
const initialItems = getCurrentCartItems();

const updateCartStorage = function (updatedCart) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  }
};

const getCartItemCount = function () {
  return initialItems.reduce((accum, currItem) => {
    return accum + currItem.quantity;
  }, 0);
};

const getCartCost = function () {
  const cost = initialItems.reduce((accum, currItem) => {
    return accum + currItem.price * currItem.quantity;
  }, 0);
  return cost;
};

const initialState = {
  cartItems: initialItems,
  cartItemCount: getCartItemCount(),
  totalPrice: getCartCost(),
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartItems: (state, action) => {
      const items = action.payload;
      state.cartItems = items;
      state.cartItemCount = calculateCartItemCount(items);
      state.totalPrice = calculateCartCost(items);
    },
    addToCart: (state, action) => {
      const tempId = action.payload.productId;
      state.totalPrice += action.payload.price;
      state.cartItemCount += 1;

      const existingItem = state.cartItems.find((curr) => {
        return curr.productId === tempId;
      });

      // If item in cart increment quantity and update localstorage
      if (existingItem) {
        existingItem.quantity += 1;
      }
      // If item not in cart add to cartItems and update localstorage
      else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      updateCartStorage(state.cartItems);
    },

    deleteFromCart: (state, action) => {
      const item = state.cartItems.find((curr) => {
        return curr.productId === action.payload.productId;
      });

      if (item) {
        state.cartItemCount -= 1;
        state.totalPrice -= item.price;
        state.cartItems = state.cartItems.filter((curr) => {
          return curr.productId !== action.payload.productId;
        });
        updateCartStorage(state.cartItems);
      }
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartItemCount = 0;
      state.totalPrice = 0;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cartItems');
      }
    },

    increment: (state, action) => {
      const item = state.cartItems.find((curr) => {
        return curr.productId === action.payload.productId;
      });
      // console.log(item);
      if (item) {
        item.quantity += 1;
        state.cartItemCount += 1;
        state.totalPrice += action.payload.price;
        updateCartStorage(state.cartItems);
      }
    },

    decrement: (state, action) => {
      const item = state.cartItems.find((curr) => {
        return curr.productId === action.payload.productId;
      });
      // console.log(item);
      if (item) {
        item.quantity -= 1;
        state.cartItemCount -= 1;
        state.totalPrice -= action.payload.price;
        updateCartStorage(state.cartItems);
      }
    },
    initializeCart: (state, action) => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      console.log(action.payload.cart);
      state.cartItems = action.payload.cart;
      updateCartStorage(state.cartItems);
    },
  },
});

export const {
  loadCartItems,
  addToCart,
  deleteFromCart,
  clearCart,
  increment,
  decrement,
  initializeCart,
} = cartSlice.actions;
export default cartSlice.reducer;
