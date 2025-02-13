import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ContentNavigator from './ContentNavigator';
import ContentManagementScreen from '../screens/ContentManagementScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { AuthorizedStackParamList } from '@/types/navigation';
import { Icon } from '@/components/themed';
import { COLORS } from '@/constants';
import { IconName } from '@/components/themed/Icon';

const Tab = createBottomTabNavigator<AuthorizedStackParamList>();

function TabBarIcon(props: {
  name: string;
  color: string;
  focused: boolean;
}) {
  const iconName = props.focused
    ? props.name
    : `${props.name}-outline`;

  return (
    <Icon
      name={iconName as IconName}
      size={24}
      style={{ marginBottom: 0}}
      color={props.color}
    />
  );
}

const AuthorizedNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.surface,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen 
        name="Content" 
        component={ContentNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Management" 
        component={ContentManagementScreen}
        options={{
          title: 'Manage',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="grid" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={UserProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthorizedNavigator;