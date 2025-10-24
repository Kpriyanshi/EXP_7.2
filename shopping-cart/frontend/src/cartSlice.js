// src/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  items: [], // array to store cart items
};

// Create a slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1; // increase quantity if already in cart
      } else {
        state.items.push({ ...item, quantity: 1 }); // add new item with quantity 1
      }
    },
    // Remove an item from the cart
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    // Update quantity of a specific item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find(i => i.id === id);
      if (existing && quantity > 0) {
        existing.quantity = quantity;
      }
    },
    // Clear all items from the cart
    clearCart: (state) => {
      state.items = [];
    }
  },
});

// Export actions to use in components
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Export reducer to include in the store
export default cartSlice.reducer;
