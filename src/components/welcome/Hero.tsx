import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {View} from '@/components/themed';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';
import {COLORS} from '@/constants';
const LINE_COUNT = 5;

interface HeroProps {
  style?: ViewStyle;
}

const Hero: React.FC<HeroProps> = ({style}) => {
  const phases = Array.from({length: LINE_COUNT}, () => useSharedValue(0));

  React.useEffect(() => {
    'worklet';
    phases.forEach((phase, index) => {
      phase.value = withRepeat(
        withSequence(
          withTiming(Math.PI * 2, {duration: 3000 + index * 500}),
          withTiming(0, {duration: 3000 + index * 500}),
        ),
        -1,
        true,
      );
    });
  }, []);

  const getLineStyles = (index: number) => {
    return useAnimatedStyle(() => {
      'worklet';
      return {
        transform: [
          {translateX: Math.sin(phases[index].value) * (10 + index * 5)},
          {scaleY: 0.9 + Math.cos(phases[index].value) * 0.1},
        ],
      };
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.linesContainer}>
        {Array.from({length: LINE_COUNT}).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.line,
              {
                backgroundColor: COLORS.primary,
                opacity: 0.1 + (index * 0.1),
                height: 80 - index * 10,
              },
              getLineStyles(index),
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  linesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  line: {
    width: 2,
    borderRadius: 1,
  },
});

export default Hero;