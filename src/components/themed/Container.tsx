import React, { PropsWithChildren } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants';

interface ContainerProps extends PropsWithChildren {
  style?: ViewStyle;
  useSafeArea?: boolean;
  useBottomInset?: boolean;
}

// React Native Safe Area View sucks thats why insetse

const Container: React.FC<ContainerProps> = ({ 
  children, 
  style,
  useSafeArea = true,
  useBottomInset = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        useSafeArea && {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          ...(useBottomInset && { paddingBottom: insets.bottom }),
        },
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