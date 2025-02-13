import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text, Button} from '@/components/themed';
import {COLORS, SPACING} from '@/constants';
import BaseDialog from './BaseDialog';

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: 'danger' | 'default';
};

let portalRef: any = null;
let currentDialog: {close: () => void} | null = null;

export const initializeDialog = (ref: any) => {
  portalRef = ref;
};

const DialogContent = (props: Props & {onClose: () => void}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const handleConfirm = async () => {
    if (isDebouncing || isLoading) return;
    
    setIsDebouncing(true);
    setIsLoading(true);
    
    try {
      await props.onConfirm();
      props.onClose();
    } finally {
      setIsLoading(false);
      //delay debounce to prevent double clicks
      setTimeout(() => setIsDebouncing(false), 500);
    }
  };

  const handleCancel = () => {
    if (isDebouncing || isLoading) return;
    setIsDebouncing(true);
    props.onCancel?.();
    props.onClose();
    setTimeout(() => setIsDebouncing(false), 500);
  };

  return (
    <BaseDialog title={props.title} onClose={handleCancel}>
      <View style={styles.content}>
        <Text variant="bodyMedium" color="textSecondary" style={styles.message}>
          {props.message}
        </Text>


        <View style={styles.actions}>
          <Button
            variant={props.type === 'danger' ? 'destructive' : 'primary'}
            onPress={handleConfirm}
            style={styles.confirmButton}
            loading={isLoading}
            fullWidth>
            {props.confirmText || 'Confirm'}
          </Button>

          <Pressable
            onPress={handleCancel}
            disabled={isLoading}
            style={styles.cancelButton}
            android_ripple={{
              color: COLORS.muted,
              borderless: true,
            }}>
            <Text
              variant="bodyMedium"
              color="textSecondary"
              style={[styles.cancelText, isLoading && {opacity: 0.5}]}>
              {props.cancelText || 'Cancel'}
            </Text>
          </Pressable>
        </View>
      </View>
    </BaseDialog>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
  },
  message: {
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  actions: {
    gap: SPACING.md,
    alignItems: 'center',
  },
  confirmButton: {
    width: '100%',
  },
  cancelButton: {
    paddingVertical: SPACING.xs,
  },
  cancelText: {
    textAlign: 'center',
  },
});

const show = (props: Props) => {
  if (!portalRef) {
    console.warn('ConfirmDialog: Portal not initialized');
    return;
  }

  if (currentDialog) {
    currentDialog.close();
  }

  const dialog = {
    close: () => {
      portalRef.unmount(id);
      currentDialog = null;
    },
  };

  currentDialog = dialog;

  const id = portalRef.mount(
    <DialogContent {...props} onClose={dialog.close} />,
  );

  return dialog;
};

export default {show};
