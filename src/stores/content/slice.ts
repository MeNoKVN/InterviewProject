import { createSlice } from '@reduxjs/toolkit';
import { ContentState } from '@/types/content';
import { fetchContent, deleteContent } from './thunks';

const initialState: ContentState = {
  data: null,
  isLoading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //loading
      .addCase(fetchContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      //fulfilled
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      //rejected
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch content';
      })
      //delete
      .addCase(deleteContent.fulfilled, (state, action) => {
        if (state.data) {
          state.data = state.data.filter(item => item.id !== action.payload);
        }
      });
  },
});

export default contentSlice.reducer;
