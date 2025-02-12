import { StackNavigationOptions } from '@react-navigation/stack';

export type RootStackParamList = {
  Auth: undefined;
  Authorized: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
};

export type ContentStackParamList = {
  Content: undefined;
  ContentDetails: { id: string };
}; 