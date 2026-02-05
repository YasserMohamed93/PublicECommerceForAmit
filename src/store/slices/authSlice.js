import { createSlice } from "@reduxjs/toolkit";

// Create Slice
const authSlice = createSlice({
  name: "authSlice",

  initialState: {
    user: null,
    isLoggedIn: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

// Export States
export default authSlice.reducer;

// Export Actions
export const { clearUser, setUser } = authSlice.actions;
