import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity++;
      } else {
        // If new item, add it with quantity 1
        state.items.push({ name, image, description, cost, quantity: 1 });
      }
    },
    
    removeItem: (state, action) => {
      // Remove item by name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        if (quantity > 0) {
          // Update quantity if greater than 0
          itemToUpdate.quantity = quantity;
        } else {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;