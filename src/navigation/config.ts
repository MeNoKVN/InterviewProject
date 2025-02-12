import { StackNavigationOptions } from '@react-navigation/stack';
import { COLORS } from '../constants';

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: COLORS.background },
};

export const headerlessScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

export const defaultHeaderOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.background,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: COLORS.text,
  headerTitleStyle: {
    fontWeight: '600',
  },
};