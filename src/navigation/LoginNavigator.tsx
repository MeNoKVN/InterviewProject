import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import {headerlessScreenOptions} from './config';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        options={headerlessScreenOptions}
        component={WelcomeScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
