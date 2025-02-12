import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../stores/hooks';
import LoginNavigator from './LoginNavigator';
import AuthorizedNavigator from './AuthorizedNavigator';
import {defaultStackScreenOptions} from './config';
import {RootStackParamList} from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const userProfile = useAppSelector(state => state.auth.userProfile);

  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      {userProfile ? (
        <Stack.Screen name="Authorized" component={AuthorizedNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={LoginNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
