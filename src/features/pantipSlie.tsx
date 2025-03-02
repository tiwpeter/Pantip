// pantip more
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state type
interface DataState {
  items: Record<string, any[]>;
  spanHeaders: Record<string, any>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pages: Record<string, number>;
  totalPages: Record<string, number>;
}

// Define the initial state
const initialState: DataState = {
  items: {},
  spanHeaders: {},
  status: 'idle',
  error: null,
  pages: {},
  totalPages: {},
};

// Create an async thunk for fetching data
export const fetchPantip = createAsyncThunk(
  'data/fetchPantip',
  async ({ tagX }: { tagX: string[]; page: number; perPage: number }) => {
    try {
      const responses = await Promise.all(
        tagX.map((tag) =>
          fetch(
            `https://b5-teal.vercel.app/api/mainSearch/search?tag=${encodeURIComponent(tag)}`,
          ).then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          }),
        ),
      );
      return { tagX, dataX: responses };
    } catch (error) {
      if (error instanceof Error) {
        throw error; // Return the Error object
      }
      throw new Error('An unknown error occurred'); // Wrap the message in an Error object
    }
  },
);

// Create the slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    incrementPage: (state, action) => {
      const tag = action.payload;
      return {
        ...state,
        pages: {
          ...state.pages,
          [tag]: (state.pages[tag] || 1) + 1,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPantip.pending, (state) => ({
        ...state,
        status: 'loading',
        error: null, // Clear previous errors
      }))
      .addCase(fetchPantip.fulfilled, (state, action) => {
        const { tagX, dataX } = action.payload;

        if (!Array.isArray(dataX) || dataX.length !== tagX.length) {
          // Handle data length mismatch
          return {
            ...state,
            status: 'failed',
          };
        }

        const updatedItems = { ...state.items };
        const updatedTotalPages = { ...state.totalPages };

        tagX.forEach((tag, index) => {
          if (!updatedItems[tag]) {
            updatedItems[tag] = [];
          }
          if (dataX[index]) {
            const { titles = [], totalPages = 1 } = dataX[index];
            updatedItems[tag] = [...updatedItems[tag], ...titles];
            updatedTotalPages[tag] = totalPages;
          }
        });

        return {
          ...state,
          items: updatedItems,
          totalPages: updatedTotalPages,
          status: 'succeeded',
        };
      })
      .addCase(fetchPantip.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message ?? 'An unknown error occurred',
      }));
  },
});
export const { incrementPage } = dataSlice.actions;
export default dataSlice.reducer;
