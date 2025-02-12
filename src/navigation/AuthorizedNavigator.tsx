import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContentNavigator from './ContentNavigator';
import ContentManagementScreen from '../screens/ContentManagementScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const AuthorizedNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ContentTab" component={ContentNavigator} />
      <Tab.Screen name="Management" component={ContentManagementScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default AuthorizedNavigator;