import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  RootStackParamList,
  AuthStackParamList,
  ContentStackParamList,
} from '@/types/navigation';

/**
 * Hook for root-level navigation (main app navigation)
 * Use this for navigating between Auth and Authorized sections
 */
export const useRootNavigation = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

/**
 * Hook for authentication flow navigation
 * Use this for screens within the auth flow (login, signup, etc.)
 */
export const useAuthNavigation = () =>
  useNavigation<NavigationProp<AuthStackParamList>>();

/**
 * Hook for content navigation
 * Use this for navigating between content screens (list and details)
 */
export const useContentNavigation = () =>
  useNavigation<NavigationProp<ContentStackParamList>>();