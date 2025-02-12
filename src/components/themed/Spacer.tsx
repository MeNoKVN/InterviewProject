import React from 'react';
import { View } from 'react-native';
import { SPACING } from '@/constants';

type SpacingSize = keyof typeof SPACING;

interface SpacerProps {
  size?: SpacingSize;
  horizontal?: boolean;
}

const Spacer: React.FC<SpacerProps> = ({ 
  size = 'md',
  horizontal = false 
}) => {
  return (
    <View
      style={
        horizontal 
          ? { width: SPACING[size] }
          : { height: SPACING[size] }
      }
    />
  );
};

export default Spacer; 