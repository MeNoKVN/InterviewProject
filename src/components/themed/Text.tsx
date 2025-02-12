import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY, COLORS } from '@/constants';

type TypographyVariant = keyof typeof TYPOGRAPHY;

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: keyof typeof COLORS;
}

const Text: React.FC<TextProps> = ({ 
  style, 
  variant = 'bodyMedium', 
  color = 'textPrimary',
  ...props 
}) => {
  return (
    <RNText 
      style={[
        styles[variant], 
        { color: COLORS[color] },
        style
      ]} 
      {...props} 
    />
  );
};

const styles = StyleSheet.create(TYPOGRAPHY);

export default Text;