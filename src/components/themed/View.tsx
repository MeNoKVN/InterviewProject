import React from 'react';
import { View as RNView, ViewProps, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants';

interface ThemedViewProps extends ViewProps {
  padding?: keyof typeof SPACING;
  margin?: keyof typeof SPACING;
  rounded?: keyof typeof BORDER_RADIUS;
  backgroundColor?: keyof typeof COLORS;
  center?: boolean;
}

const View: React.FC<ThemedViewProps> = ({
  style,
  padding,
  margin,
  rounded,
  backgroundColor,
  center,
  children,
  ...props
}) => {
  return (
    <RNView
      style={[
        padding && { padding: SPACING[padding] },
        margin && { margin: SPACING[margin] },
        rounded && { borderRadius: BORDER_RADIUS[rounded] },
        backgroundColor && { backgroundColor: COLORS[backgroundColor] },
        center && styles.center,
        style,
      ]}
      {...props}>
      {children}
    </RNView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default View;