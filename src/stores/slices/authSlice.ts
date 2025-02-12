import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  userProfile: UserProfile | null;
}

const initialState: AuthState = {
  userProfile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    logout: (state) => {
      state.userProfile = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;