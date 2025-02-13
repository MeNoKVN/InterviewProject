import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import {Icon} from '@/components/themed';
import {COLORS} from '@/constants';

interface ParallaxHeaderProps {
  onBackPress: () => void;
  onSharePress: () => void;
  onBookmarkPress: () => void;
  isBookmarked: boolean;
  style?: any;
}

const ParallaxHeader: React.FC<ParallaxHeaderProps> = ({
  onBackPress,
  onSharePress,
  onBookmarkPress,
  isBookmarked,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {top: Platform.OS === 'ios' ? insets.top : 4},
        style,
      ]}>
      <TouchableOpacity
        onPress={onBackPress}
        style={[styles.iconButton, styles.leftButton]}
        activeOpacity={0.9}>
        <View style={[styles.iconCircle, {backgroundColor: COLORS.background}]}>
          <Icon
            name="chevron-back-outline"
            size={20}
            color={COLORS.textPrimary}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.rightButtons}>
        <TouchableOpacity
          onPress={onSharePress}
          style={styles.iconButton}
          activeOpacity={0.85}>
          <View
            style={[styles.iconCircle, {backgroundColor: COLORS.background}]}>
            <Icon name="share-outline" size={20} color={COLORS.textPrimary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onBookmarkPress}
          style={styles.iconButton}
          activeOpacity={0.85}>
          <View
            style={[styles.iconCircle, {backgroundColor: COLORS.background}]}>
            <Icon
              name={isBookmarked ? 'heart' : 'heart-outline'}
              size={20}
              color={isBookmarked ? COLORS.primary : COLORS.textPrimary}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 10,
  },
  leftButton: {
    position: 'absolute',
    left: 10,
  },
  rightButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  },
  iconButton: {
    marginHorizontal: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        overflow: 'hidden',
      },
    }),
  },
});

export default ParallaxHeader;
