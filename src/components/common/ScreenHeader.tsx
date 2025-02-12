import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { COLORS, SPACING } from '@/constants';
import Icon from '@/components/themed/Icon';
import { IconName } from '@/components/themed/Icon';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

type HeaderAction = {
  icon: IconName;
  onPress: () => void;
  color?: string;
};

type Props = {
  leftActions?: HeaderAction[];
  rightActions?: HeaderAction[];
  scrollY?: Animated.SharedValue<number>;
};

export const ScreenHeader = ({ leftActions = [], rightActions = [], scrollY }: Props) => {
  const animatedStyles = useAnimatedStyle(() => {
    const borderOpacity = interpolate(
      scrollY?.value ?? 0,
      [0, 20],
      [0, 1],
      'clamp'
    );

    return {
      borderBottomColor: `rgba(${COLORS.borderRGB}, ${borderOpacity})`,
      borderBottomWidth: borderOpacity,
    };
  });

  return (
    <Animated.View style={[styles.header, animatedStyles]}>
      <View style={styles.leftContainer}>
        {leftActions.map((action, index) => (
          <Pressable
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
          >
            <Icon 
              name={action.icon}
              size={24}
              color={action.color || COLORS.textPrimary}
            />
          </Pressable>
        ))}
      </View>

      <View style={styles.rightContainer}>
        {rightActions.map((action, index) => (
          <Pressable
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
          >
            <Icon 
              name={action.icon}
              size={24}
              color={action.color || COLORS.textPrimary}
            />
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  actionButton: {
    padding: SPACING.xs,
  },
});