import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ContentItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface ContentState {
  data: ContentItem[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  data: null,
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    const response = await axios.get('https://api.example.com/content');
    return response.data as ContentItem[];
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data = state.data.filter(item => item.id !== action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export const { deleteItem } = contentSlice.actions;
export default contentSlice.reducer;
