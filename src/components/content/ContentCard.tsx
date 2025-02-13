import { StyleSheet, Pressable, Image } from 'react-native';
import React, { memo, useCallback } from 'react';
import { ContentItem } from '@/types/content';
import { View, Text } from '@/components/themed';
import { COLORS, SPACING, BORDER_RADIUS } from '@/constants';
import Icon from '@/components/themed/Icon';

type Props = {
  item: ContentItem;
  onPress: (item: ContentItem) => void;
};

const ContentCard = memo(({ item, onPress }: Props) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  const population = item.details.population.toLocaleString();
  const mainCurrency = item.details.currencies[0];

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text variant="cardTitle" style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.regionRow}>
            <Icon name="location-outline" size={14} color={COLORS.textSecondary} />
            <Text variant="caption" color="textSecondary">{item.details.region}</Text>
            <Text variant="caption" color="textSecondary">•</Text>
            <Text variant="caption" color="textSecondary">{item.details.capital}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Icon name="people-outline" size={14} color={COLORS.textSecondary} />
          <Text variant="caption" color="textSecondary" numberOfLines={1}>
            {population}
          </Text>
        </View>

        {mainCurrency && (
          <>
            <Text variant="caption" color="textSecondary" style={styles.dot}>•</Text>
            <View style={styles.footerItem}>
              <Icon name="cash-outline" size={14} color={COLORS.textSecondary} />
              <Text variant="caption" color="textSecondary">
                {mainCurrency.symbol}
              </Text>
            </View>
          </>
        )}

        <Text variant="caption" color="textSecondary" style={styles.dot}>•</Text>
        <View style={styles.footerItem}>
          <Icon name="time-outline" size={14} color={COLORS.textSecondary} />
          <Text variant="caption" color="textSecondary" numberOfLines={1}>
            {item.details.timezones[0]}
          </Text>
        </View>

        <Icon 
          name="chevron-forward" 
          size={20} 
          color={COLORS.textSecondary} 
          style={styles.chevron}
        />
      </View>
    </Pressable>
  );
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id;
});

ContentCard.displayName = 'ContentCard';

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.sm * 2,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  header: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    marginHorizontal: SPACING.xs,
  },
  chevron: {
    marginLeft: 'auto',
  }
});

export default ContentCard;