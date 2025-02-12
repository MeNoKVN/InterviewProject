import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Authorized: NavigatorScreenParams<AuthorizedStackParamList>;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type AuthorizedStackParamList = {
  ContentTab: NavigatorScreenParams<ContentStackParamList>;
  Management: undefined;
  Profile: undefined;
};

export type ContentStackParamList = {
  Content: undefined;
  ContentDetails: { id: string };
};
