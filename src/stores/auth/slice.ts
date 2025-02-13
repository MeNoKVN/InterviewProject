import {createSlice} from '@reduxjs/toolkit';
import {AuthState} from '@/types/auth';
import {loginThunk, logoutThunk} from './thunks';

/**
 * Initial state for the auth slice
 * @description This is the initial state for the auth slice
 */
const initialState: AuthState = {
  userProfile: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      //*LOGIN*//
      //loading
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      //fulfilled
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      //rejected
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })

      //*LOGOUT*//
      //loading
      .addCase(logoutThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      //fulfilled
      .addCase(logoutThunk.fulfilled, state => {
        state.isLoading = false;
        state.userProfile = null;
        state.error = null;
      })
      //rejected
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export default authSlice.reducer;
