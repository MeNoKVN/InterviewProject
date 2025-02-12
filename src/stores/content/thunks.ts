import { createAsyncThunk } from '@reduxjs/toolkit';
import { contentService } from '@/services/content.service';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    return await contentService.fetchContent();
  }
);

export const deleteContent = createAsyncThunk(
  'content/deleteContent',
  async (id: string) => {
    await contentService.deleteContent(id);
    return id;
  }
);
