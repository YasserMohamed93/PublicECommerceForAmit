// Slice -> Items

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Prepare States
const items = JSON.parse(localStorage.getItem("cartItems")) || [];
const totalAmount = items.reduce(
  (acc, curr) => acc + curr.price * curr.quantity,
  0
);

const cartSlice = createSlice({
  name: "cartSlice",

  initialState: {
    items,
    totalAmount,
  },

  reducers: {
    // Add Item
    addItemToCart: (state, action) => {
      const item = action.payload; // Extract Data

      // Check Exist or Not
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        // Qty vs Stock
        if (existing.quantity >= item.stock) {
          toast.error("Product Quantity Exceeds Stock Limit");
          return;
        }

        // Increase Qty
        existing.quantity++;
      } else {
        // Add New Item to Items []
        state.items.push({ ...item, quantity: 1 });
      }

      // Success Message
      toast.success("Product Added Successfully");

      // Store Localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));

      // Call Action
      cartSlice.caseReducers.updateTotalAmount(state);
    },
    // Remove Item
    removeItemFromCart: (state, action) => {
      // Get Id
      const id = action.payload;

      // Update Items (Filter)
      state.items = state.items.filter((i) => i.id != id);

      // Store Localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));

      // Call Action
      cartSlice.caseReducers.updateTotalAmount(state);
    },

    // Increase Qty
    increaseQty: (state, action) => {
      const id = action.payload; // Get Id of Current Item
      const item = state.items.find((i) => i.id == id); // Get Item

      // Qty vs Stock
      if (item.quantity >= item.stock) {
        return;
      }

      // Increase Qty
      item.quantity++;

      // Store Localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));

      // Call Action
      cartSlice.caseReducers.updateTotalAmount(state);
    },
    // Decrease Qty
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id == id); // Get Item

      if (item.quantity === 1) return; // Check Limit

      // Decrease Qty
      item.quantity--;

      // Store Localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));

      // Call Action
      cartSlice.caseReducers.updateTotalAmount(state);
    },

    // Clear Cart
    clearCart: (state) => {
      // Reset States
      state.items = [];
      state.totalAmount = 0.0;

      // Remove Items From Localstorage
      localStorage.removeItem("cartItems");
    },
    // Update Total
    updateTotalAmount: (state) => {
      state.totalAmount = state.items.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },
  },
});

// Export States
export default cartSlice.reducer;

// Export Actions
export const {
  addItemToCart,
  clearCart,
  decreaseQty,
  increaseQty,
  removeItemFromCart,
  updateTotalAmount,
} = cartSlice.actions;
