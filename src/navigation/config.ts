import {StackNavigationOptions} from '@react-navigation/stack';
import {COLORS} from '../constants';

//would clean this up if I had more time
export const defaultStackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: COLORS.background},
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
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: {
    fontWeight: '600',
  },
};

export const modalScreenOptions: StackNavigationOptions = {
  presentation: 'modal',
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'vertical',
  cardStyle: {backgroundColor: COLORS.background},
  cardOverlayEnabled: true,
};

export const detailsScreenOptions: StackNavigationOptions = {
  presentation: 'card',
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyle: {backgroundColor: COLORS.background},
  cardOverlayEnabled: true,
};
