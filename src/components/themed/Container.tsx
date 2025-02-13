import React, { PropsWithChildren } from 'react';
import { View, ViewStyle, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants';

interface ContainerProps extends PropsWithChildren {
  style?: ViewStyle;
  useSafeArea?: boolean;
  useBottomInset?: boolean;
  forceBottomInset?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  style,
  useSafeArea = true,
  useBottomInset = true,
  forceBottomInset = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        useSafeArea && Platform.select({
          ios: {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            ...(useBottomInset && { paddingBottom: insets.bottom }),
          },
          android: {
            paddingTop: insets.top,
            ...(forceBottomInset && { paddingBottom: 16 }),
          },
        }),
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default Container;