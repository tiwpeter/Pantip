import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define types for icons and the state
interface Icon {
  background_image_url?: string;
  text_eng?: string;
}

interface IconState {
  icons: Record<string, Icon[]>; // Maps tags to arrays of icons
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of the async request
  error: string | null; // Error message if the request fails
}

const initialIconState: IconState = {
  icons: {},
  status: 'idle',
  error: null,
};

// Define the async thunk for fetching icon data
export const fetchIconData = createAsyncThunk<
  { tag: string; data: Icon[] }, // Return type
  string // Argument type
>('icon/fetchIconData', async (tag: string) => {
  const response = await fetch(
    `https://b5-teal.vercel.app/api/room3/roomtag?tag=${tag}`,
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Icon[] = await response.json();
  return { tag, data };
});

const iconSlice = createSlice({
  name: 'icon',
  initialState: initialIconState,
  reducers: {}, // No synchronous actions needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchIconData.pending, (state) => {
        // Use Immer to update state immutably
        return {
          ...state,
          status: 'loading',
          error: null,
        };
      })
      .addCase(fetchIconData.fulfilled, (state, action) => {
        const { tag, data } = action.payload;
        // Use Immer to update state immutably
        return {
          ...state,
          icons: {
            ...state.icons,
            [tag]: data,
          },
          status: 'succeeded',
        };
      })
      .addCase(fetchIconData.rejected, (state, action) => {
        // Use Immer to update state immutably
        return {
          ...state,
          status: 'failed',
          error: action.error.message ?? 'An unknown error occurred',
        };
      });
  },
});

export default iconSlice.reducer;
