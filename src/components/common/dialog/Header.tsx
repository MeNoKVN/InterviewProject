import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {Text, CloseIcon} from '@/components/themed';
import {COLORS, SPACING, BORDER_RADIUS} from '@/constants';

type Props = {
  title: string;
  onClose?: () => void;
};

const DialogHeader = ({title, onClose}: Props) => {
  return (
    <View style={styles.container}>
      <Pressable 
        onPress={onClose}
        hitSlop={12}
        style={({pressed}) => [
          styles.closeButton,
          pressed && styles.pressed,
        ]}
        android_ripple={{
          color: COLORS.muted,
          borderless: true,
          radius: 16,
        }}>
        <CloseIcon size={18} />
      </Pressable>
      
      <Text variant="bodyLarge" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: 32, 
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{scale: 0.96}],
  },
});

export default DialogHeader;