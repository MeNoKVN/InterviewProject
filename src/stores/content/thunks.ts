import { createAsyncThunk } from '@reduxjs/toolkit';
import { contentService } from '@/services/content.service';

/**
 * Fetch content thunk
 * @description This is the thunk for the fetch content action
 * @returns Promise<ContentItem[]> content items
 */
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    return await contentService.fetchContent();
  }
);

/**
 * Delete content thunk
 * @param id - Content ID to be deleted
 * @returns The ID of the deleted content (for optimistic updates)
 */
export const deleteContent = createAsyncThunk(
  'content/deleteContent',
  async (id: string) => {
    await contentService.deleteContent(id);
    return id;
  }
);
