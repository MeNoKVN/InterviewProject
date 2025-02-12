import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContentScreen from '../screens/content/ContentScreen';
import ContentDetailsScreen from '../screens/content/[id]/ContentDetailsScreen';
import { ContentStackParamList } from '@/types/navigation';
import { headerlessScreenOptions, detailsScreenOptions } from './config';

const Stack = createStackNavigator<ContentStackParamList>();

const ContentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Content"
        component={ContentScreen}
        options={headerlessScreenOptions}
      />
      {/* I would honestly make it a fullscreen modal but the app structure wont match lol */}
      <Stack.Screen
        name="ContentDetails"
        component={ContentDetailsScreen}
        options={detailsScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ContentNavigator; 