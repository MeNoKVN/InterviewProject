import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {Text, Icon} from '@/components/themed';
import {COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY} from '@/constants';
import {ContentItem} from '@/types/content';

type Props = {
  item: ContentItem;
  onDelete: (id: string) => void;
};

const DeleteCard = ({item, onDelete}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={TYPOGRAPHY.bodyMediumSemiBold} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[TYPOGRAPHY.caption, {color: COLORS.textSecondary}]}>
          {item.details.region}
        </Text>
      </View>
      <Pressable
        onPress={() => onDelete(item.id)}
        style={({pressed}) => [styles.deleteButton, pressed && styles.pressed]}>
        <Icon name="trash-outline" size={20} color={COLORS.error} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  content: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default DeleteCard; 