import React, { useEffect } from 'react';
import { StyleSheet, Pressable, BackHandler } from 'react-native';
import { View, Text, CloseIcon } from '@/components/themed';
import { COLORS, SPACING } from '@/constants';
import { useNavigation } from '@react-navigation/native';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  position?: 'left' | 'right';
}

const ModalHeader = ({
  title,
  onClose,
  position = 'left'
}: ModalHeaderProps) => {
  const navigation = useNavigation();
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        handleClose();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [handleClose]);

  return (
    <View style={styles.container}>
      <Pressable 
        onPress={handleClose} 
        hitSlop={8} 
        style={[
          styles.closeButton,
          position === 'left' ? styles.leftButton : styles.rightButton,
        ]}
        android_ripple={{
          color: COLORS.muted,
          borderless: true,
          radius: 20,
        }}
      >
        {({pressed}) => (
          <View style={[
            styles.closeIconWrapper,
            pressed && styles.closeIconWrapperPressed
          ]}>
            <CloseIcon size="md" />
          </View>
        )}
      </Pressable>

      <View style={styles.titleContainer}>
        <Text variant="bodyLarge" style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  title: {
    textAlign: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  leftButton: {
    marginRight: 'auto',
  },
  rightButton: {
    marginLeft: 'auto',
  },
  closeIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconWrapperPressed: {
    backgroundColor: COLORS.muted,
  },
});

export default ModalHeader;
