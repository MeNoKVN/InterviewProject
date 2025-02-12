import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContentScreen from '../screens/content/ContentScreen';
import ContentDetailsScreen from '../screens/content/ContentDetailsScreen';

const Stack = createStackNavigator();

const ContentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Content" component={ContentScreen} />
      <Stack.Screen name="ContentDetails" component={ContentDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ContentNavigator; 