export interface AuthState {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
}
