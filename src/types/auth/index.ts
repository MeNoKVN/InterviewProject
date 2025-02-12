import { UserProfile } from './user';

export interface AuthState {
  userProfile: UserProfile | null;
}

export * from './user';

