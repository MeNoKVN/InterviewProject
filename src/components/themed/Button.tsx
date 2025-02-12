import React, { useRef } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Animated,
  Platform,
  View,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants';
import Text from './Text';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'rounded';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  color?: keyof typeof COLORS;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onPress,
  disabled,
  loading,
  children,
  fullWidth,
  style,
  color,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 30,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 2,
    }).start();
  };

  const getContentHeight = () => {
    switch (size) {
      case 'sm':
        return 32;
      case 'lg':
        return 48;
      case 'xl':
        return 56;
      default:
        return 40;
    }
  };


  //diddnt cehck for android again so might look shitty
  const getVariantStyles = () => {
    const baseStyles = Platform.select({
      ios: {
        shadowColor: variant === 'primary' ? (color ? COLORS[color] : COLORS.primary) : '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: variant === 'primary' ? 0.2 : 0.04,
        shadowRadius: 2,
      },
      android: {
        elevation: variant === 'primary' ? 2 : 1,
      },
    });

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: color ? COLORS[color] : COLORS.primary,
          ...baseStyles,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: color ? COLORS[color] : COLORS.border,
        };
      case 'destructive':
        return {
          backgroundColor: COLORS.primary,
          borderRadius: BORDER_RADIUS.full,
          ...baseStyles,
        };
      case 'ghost':
        return {
          backgroundColor: (color ? COLORS[color] : COLORS.background) + '04',
        };
      case 'rounded':
        return {
          backgroundColor: color ? COLORS[color] : COLORS.primary,
          borderRadius: BORDER_RADIUS.full,
          ...baseStyles,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textTertiary;
    switch (variant) {
      case 'primary':
      case 'destructive':
        return COLORS.background;
      case 'secondary':
      case 'ghost':
        return COLORS.textPrimary;
    }
    return COLORS.textPrimary;
  };

  return (
    <Animated.View
      style={[
        !disabled && { transform: [{ scale: scaleAnim }] },
        fullWidth && styles.fullWidth,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={disabled || loading ? undefined : handlePressIn}
        onPressOut={disabled || loading ? undefined : handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          { height: getContentHeight() },
          getVariantStyles(),
          getSizeStyles(size),
          style,
          (disabled || loading) && styles.disabled,
        ]}
        activeOpacity={disabled || loading ? 1 : 0.97}>
        <View style={styles.contentContainer}>
          <Text
            variant="button"
            style={[
              styles.text,
              { color: getTextColor() },
              loading && styles.hiddenText,
            ]}>
            {children}
          </Text>
        </View>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loaderContainer]}>
            <ActivityIndicator color={getTextColor()} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
    letterSpacing: -0.15,
    textAlign: 'center',
  },
  hiddenText: {
    opacity: 0,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  fullWidth: {
    width: '100%',
  },
});

const getSizeStyles = (size: 'sm' | 'md' | 'lg' | 'xl'): ViewStyle => {
  switch (size) {
    case 'sm':
      return {
        paddingHorizontal: SPACING.sm,
      };
    case 'lg':
      return {
        paddingHorizontal: SPACING.lg,
      };
    case 'xl':
      return {
        paddingHorizontal: SPACING.xl,
      };
    default:
      return {
        paddingHorizontal: SPACING.md,
      };
  }
};

export default Button;