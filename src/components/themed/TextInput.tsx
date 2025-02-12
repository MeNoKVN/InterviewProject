import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import {Text, Icon} from '@/components/themed';
import {COLORS, SPACING} from '@/constants';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';


interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  validation?: (value: string) => string | undefined;
  onValidChange?: (isValid: boolean) => void;
}

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error: externalError,
      style,
      value,
      onChangeText,
      validation,
      onValidChange,
      secureTextEntry,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalError, setInternalError] = useState<string | undefined>();
    const [showPassword, setShowPassword] = useState(false);
    const labelAnim = useSharedValue(value ? 1 : 0);
    const validationTimeoutRef = useRef<NodeJS.Timeout>();
    const [inputHeight, setInputHeight] = useState(0);

    useEffect(() => {
      if (value && value.length > 0) {
        labelAnim.value = 1;
      } else if (!isFocused) {
        labelAnim.value = 0;
      }
    }, [value, isFocused]);

    const handleChangeText = (text: string) => {
      onChangeText?.(text);

      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }

      if (internalError) {
        setInternalError(undefined);
      }

      if (validation) {
        validationTimeoutRef.current = setTimeout(() => {
          const validationError = validation(text);
          setInternalError(validationError);
          onValidChange?.(!validationError);
        }, 500);
      }
    };

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      const {height} = event.nativeEvent.layout;
      setInputHeight(height);
    }, []);

    const labelStyle = useAnimatedStyle(() => ({
      transform: [
        {
          //lmao
          translateY: interpolate(
            labelAnim.value,
            [0, 1],
            [inputHeight / 2 - SPACING.md - SPACING.xs, -SPACING.md],
          ),
        },
      ],
      fontSize: interpolate(labelAnim.value, [0, 1], [16, 12]),
      color: externalError
        ? COLORS.error
        : isFocused
        ? COLORS.primary
        : COLORS.textSecondary,
    }));

    const lineStyle = useAnimatedStyle(() => ({
      backgroundColor: externalError
        ? COLORS.error
        : isFocused
        ? COLORS.primary
        : COLORS.border,
    }));

    const error = externalError || internalError;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Animated.Text style={[styles.label, labelStyle]}>
              {placeholder}
            </Animated.Text>
          </View>

          <RNTextInput
            ref={ref}
            style={[styles.input, style]}
            onLayout={handleLayout}
            value={value}
            onChangeText={handleChangeText}
            onFocus={() => {
              setIsFocused(true);
              labelAnim.value = withTiming(1, {duration: 200});
            }}
            onBlur={() => {
              setIsFocused(false);
              if (!value) labelAnim.value = withTiming(0, {duration: 200});
            }}
            secureTextEntry={secureTextEntry && !showPassword}
            placeholderTextColor={COLORS.textTertiary}
            {...props}
          />

          {secureTextEntry && (
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size="md"
                color={COLORS.textSecondary}
              />
            </Pressable>
          )}
        </View>

        <Animated.View style={[styles.line, lineStyle]} />

        {error && (
          <Text variant="caption" color="error" style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: SPACING.xxl + SPACING.md,
    paddingHorizontal: SPACING.md,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
    height: '100%',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xs,
  },
  label: {
    position: 'absolute',
    left: SPACING.md,
  },
  line: {
    height: 1,
    width: '100%',
  },
  error: {
    marginTop: SPACING.xs,
  },
  eyeIcon: {
    width: SPACING.xl,
    height: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
});

export default TextInput;
