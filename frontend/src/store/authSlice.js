import { createSlice } from '@reduxjs/toolkit';

// SAFE JSON PARSER → prevents "undefined is not valid JSON" error
const safeParse = (key) => {
  try {
    const value = localStorage.getItem(key);

    // prevent invalid values
    if (!value || value === "undefined" || value === "null") {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Invalid JSON in localStorage for key: ${key}. Clearing value.`);
    localStorage.removeItem(key);
    return null;
  }
};

const initialState = {
  user: safeParse('user'),
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // save clean JSON
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
