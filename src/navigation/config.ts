import {StackNavigationOptions} from '@react-navigation/stack';
import {COLORS} from '../constants';

export const defaultStackScreenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle: {backgroundColor: COLORS.background},
};

export const headerlessScreenOptions: StackNavigationOptions = {
  headerShown: false,
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
