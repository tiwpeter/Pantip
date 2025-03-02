import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { LocalData } from './type';

// Define types for the state
interface TagsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
  perPage: number;
  pantipData: LocalData | null;
  announceData: LocalData | null;
  recommendationsData: LocalData | null;
  latestPostsData: LocalData | null;
  pantipPickData: LocalData | null;
  pantipTrendData: LocalData | null;
}
// Initial state
const initialState: TagsState = {
  status: 'idle',
  error: null,
  page: 1,
  perPage: 4,
  pantipData: null,
  announceData: null,
  recommendationsData: null,
  latestPostsData: null,
  pantipPickData: null,
  pantipTrendData: null,
};

// Define thunk actions
export const fetchRecommendations = createAsyncThunk<
  LocalData,
  string,
  { rejectValue: string }
>('tags/fetchRecommendations', async (tag, { rejectWithValue }) => {
  try {
    const response = await axios.get<LocalData>(
      `https://b5-teal.vercel.app/api/search/${tag}/กระทู้แนะนำโดยสมาชิก`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
    // Handle other errors
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchTred = createAsyncThunk<
  LocalData,
  string,
  { rejectValue: string }
>('tags/fetchTred', async (tag, { rejectWithValue }) => {
  try {
    const response = await axios.get<LocalData>(
      `https://b5-teal.vercel.app/api/search/${tag}/Pantip Trend`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      return rejectWithValue(
        error.response?.data || 'An error occurred while fetching the data.',
      );
    }
    // Handle other errors
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchTags = createAsyncThunk<
  {
    data: LocalData; // Updated to reflect the payload structure
    page: number;
    perPage: number;
    reset: boolean;
  },
  { page: number; perPage: number; reset?: boolean },
  { rejectValue: string }
>(
  'tags/fetchTags',
  async ({ page, perPage, reset = false }, { rejectWithValue }) => {
    try {
      const response = await axios.get<{
        data: {
          id: string;
          url: string;
          title: string;
          userTitle?: string;
          time?: string;
        }[];
        page: number;
        perPage: number;
      }>('https://b5-teal.vercel.app/tags', {
        params: { page, per_page: perPage },
      });

      // Transform API response to match LocalData
      const transformedData: LocalData = {
        header: 'Your Header Here', // Set a default or dynamic header
        titles: response.data.data.map((item) => ({
          id: item.id,
          url: item.url,
          'Title-Topic': item.title,
          user: item.userTitle, // map userTitle to user
          time: item.time,
          comments: {
            message: '', // Set a default message if needed
          },
          votes: 0, // Set a default vote count if needed
          img_url: '', // Set a default image URL if needed
        })),
      };

      return {
        data: transformedData, // Return the transformed data under 'data'
        page: response.data.page,
        perPage: response.data.perPage,
        reset,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const fetchAnnounce = createAsyncThunk<
  LocalData,
  string,
  { rejectValue: string }
>('tags/fetchAnnounce', async (tag, { rejectWithValue }) => {
  try {
    const response = await axios.get<LocalData>(
      `https://b5-teal.vercel.app/${tag}/Announce`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
    // Handle other errors
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchLatestPosts = createAsyncThunk<
  LocalData,
  string,
  { rejectValue: string }
>('tags/fetchLatestPosts', async (tag, { rejectWithValue }) => {
  try {
    const response = await axios.get<LocalData>(
      `https://b5-teal.vercel.app/${tag}/กระทู้ล่าสุด`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
    // Handle other errors
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchPantipPick = createAsyncThunk<
  LocalData,
  string,
  { rejectValue: string }
>('tags/fetchPantipPick', async (tag, { rejectWithValue }) => {
  try {
    const response = await axios.get<LocalData>(
      `https://b5-teal.vercel.app/${tag}/Pantip Pick`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
    // Handle other errors
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchPantipTrend = createAsyncThunk<
  LocalData,
  string,
  { rejectValue: string }
>('tags/fetchPantipTrend', async (tag, { rejectWithValue }) => {
  try {
    const response = await axios.get<LocalData>(
      `https://b5-teal.vercel.app/${tag}/Pantip Trend`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
    // Handle other errors
    return rejectWithValue('An unknown error occurred');
  }
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    resetTags: (state) => {
      return {
        ...state,
        page: 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchTags.fulfilled, (state, action) => {
        const { data, page, perPage } = action.payload;
        return {
          ...state,
          status: 'succeeded',
          pantipData: data,
          page,
          perPage,
        };
      })
      .addCase(fetchTags.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }))

      .addCase(fetchTred.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        pantipTrendData: action.payload,
      }))
      .addCase(fetchTred.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }))

      .addCase(fetchAnnounce.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        announceData: action.payload,
      }))
      .addCase(fetchAnnounce.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }))

      .addCase(fetchRecommendations.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        recommendationsData: action.payload,
      }))
      .addCase(fetchRecommendations.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }))

      .addCase(fetchLatestPosts.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        latestPostsData: action.payload,
      }))
      .addCase(fetchLatestPosts.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }))

      .addCase(fetchPantipPick.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        pantipPickData: action.payload,
      }))
      .addCase(fetchPantipPick.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }))

      .addCase(fetchPantipTrend.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        pantipTrendData: action.payload,
      }))
      .addCase(fetchPantipTrend.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload || 'An error occurred',
      }));
  },
});

export const { resetTags } = tagsSlice.actions;
export const selectTags = (state: { tags: TagsState }) => state.tags;
export default tagsSlice.reducer;
