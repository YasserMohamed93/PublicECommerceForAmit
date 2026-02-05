import { configureStore } from "@reduxjs/toolkit";

// Imports Reducers
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

// Create Store
export const store = configureStore({
  reducer: {
    auth: authReducer, // useSelector( store => store.auth  )
    cart: cartReducer, // useSelector( store => store.cart  )
  },
});
