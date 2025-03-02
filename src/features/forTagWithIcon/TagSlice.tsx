import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DataState {
  items: Record<string, any[]>; // Replace `any` with a more specific type if possible
  spanHeaders: Record<string, any>; // Adjust type based on your actual data
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface FetchDataResponse {
  tagX: string[];
  dataX: any[]; // Change to the correct type according to your API response
}

// Define the initial state
const initialState: DataState = {
  items: {},
  spanHeaders: {},
  status: 'idle',
  error: null,
};

export const fetchData = createAsyncThunk<
  FetchDataResponse, // Return type
  { tagX: string[] } // Argument type
>('data/fetchData', async ({ tagX }) => {
  const responses = await Promise.all(
    tagX.map(async (tag) => {
      const res = await fetch(
        `https://b5-teal.vercel.app/api/mainSearch/search?tag=${encodeURIComponent(tag)}`,
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }),
  );
  return { tagX, dataX: responses };
});

const dataSlice = createSlice({
  name: 'data',
  initialState, // Use the initialState variable here
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchData.fulfilled, (state, action) => {
        const { tagX, dataX } = action.payload;
        if (!dataX || dataX.length === 0) {
          console.error('No data available');
          return {
            ...state,
            status: 'failed',
          };
        }

        const updatedItems = { ...state.items };
        tagX.forEach((tag, index) => {
          if (!updatedItems[tag]) {
            updatedItems[tag] = [];
          }
          if (dataX[index]) {
            const { titles = [] } = dataX[index];
            updatedItems[tag] = [...updatedItems[tag], ...titles];
          }
        });

        return {
          ...state,
          items: updatedItems,
          status: 'succeeded',
        };
      })
      .addCase(fetchData.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message ?? 'An unknown error occurred',
      }));
  },
});

export default dataSlice.reducer;
