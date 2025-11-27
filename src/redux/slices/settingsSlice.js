import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
    rtlMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleRtlMode: (state) => {
      state.rtlMode = !state.rtlMode;
    },
    setRtlMode: (state, action) => {
      state.rtlMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode, toggleRtlMode, setRtlMode } = settingsSlice.actions;
export default settingsSlice.reducer;

