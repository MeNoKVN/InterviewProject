import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/themed';
import {SPACING} from '@/constants';

type Props = {
  title: string;
  subtitle?: string;
};

export const ListHeader = ({title, subtitle}: Props) => {
  return (
    <View style={styles.container}>
      <Text variant="h1" color="textPrimary">
        {title}
      </Text>
      {subtitle && (
        <Text variant="bodySmall" color="textSecondary">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
});