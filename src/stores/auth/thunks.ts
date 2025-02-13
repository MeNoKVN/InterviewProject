import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';

/**
 * Login thunk
 * @description This is the thunk for the login action
 * @param credentials credentials object
 * @returns Promise<UserProfile> user profile
 */
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const user = await authService.login(credentials.email, credentials.password);
    return user;
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);