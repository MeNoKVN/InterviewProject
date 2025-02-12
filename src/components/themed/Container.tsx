import React, { PropsWithChildren } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerProps extends PropsWithChildren {
  style?: ViewStyle;
}

// React Native Safe Area View sucks thats why insetse

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
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
    backgroundColor: 'white',
  },
});

export default Container;