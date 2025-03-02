import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { Icon, IconsState } from './type'; // Adjust path if necessary

// Thunk for fetching Icons
export const fetchIcons = createAsyncThunk<Icon[], void>(
  'icons/fetchIcons',
  async () => {
    try {
      const response = await axios.get('https://b5-teal.vercel.app/api/room3');
      return response.data; // Return the fetched data
    } catch (error) {
      // Optionally handle errors
      throw new Error(`API Error: ${(error as Error).message}`);
    }
  },
);

const initialState: IconsState = {
  data: [],
  status: 'idle',
  error: null,
};

const iconsSlice = createSlice({
  name: 'icons',
  initialState,
  reducers: {
    setIcons: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIcons.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null, // Clear previous errors
      }))
      .addCase(fetchIcons.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        data: action.payload,
      }))
      .addCase(fetchIcons.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message || 'Failed to fetch icons',
      }));
  },
});

export const { setIcons } = iconsSlice.actions;
export default iconsSlice.reducer;
