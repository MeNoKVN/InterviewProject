import { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Root level navigation types
 * includes all possible routes in the app
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Authorized: NavigatorScreenParams<AuthorizedStackParamList>;
};

/**
 * Authentication flow navigation types
 * only includes routes related to authentication
 */
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type AuthorizedStackParamList = {
  Content: NavigatorScreenParams<ContentStackParamList>;
  Management: undefined;
  Profile: undefined;
};

export type ContentStackParamList = {
  Content: undefined;
  ContentDetails: { id: string };
};

