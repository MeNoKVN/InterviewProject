import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {COLORS, BORDER_RADIUS} from '@/constants';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import DialogHeader from './Header';

type BaseDialogProps = {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
};

const BaseDialog = ({title, onClose, children}: BaseDialogProps) => {
  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={StyleSheet.absoluteFill}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View 
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={styles.container}>
          <DialogHeader title={title} onClose={onClose} />
          {children}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    width: '100%',
    maxWidth: 360,
    overflow: 'hidden',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
  },
});

export default BaseDialog;