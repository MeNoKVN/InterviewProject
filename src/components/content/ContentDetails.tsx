import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Icon} from '@/components/themed';
import {BORDER_RADIUS, COLORS, SPACING, TYPOGRAPHY} from '@/constants';
import {ContentItem} from '@/types/content';
import {IconName} from '../themed/Icon';

type Props = {
  item: ContentItem;
};

const ContentDetails = ({item}: Props) => {
  const mainCurrency = item.details.currencies[0];
  const currencyText = mainCurrency 
    ? `${mainCurrency.name}${mainCurrency.symbol ? ` (${mainCurrency.symbol})` : ''}`
    : 'N/A';

  return (
    <View style={styles.container}>
      <Text style={[TYPOGRAPHY.h1, styles.title]}>{item.title}</Text>

      {(item.details.region || item.details.capital) && (
        <View style={styles.infoRow}>
          <Icon name="location-outline" size={16} color={COLORS.textSecondary} />
          {item.details.region && (
            <Text style={TYPOGRAPHY.bodySmall}>{item.details.region}</Text>
          )}
          {item.details.region && item.details.capital && (
            <Text style={TYPOGRAPHY.bodySmall}>•</Text>
          )}
          {item.details.capital && (
            <Text style={TYPOGRAPHY.bodySmall}>{item.details.capital}</Text>
          )}
        </View>
      )}

      {item.description && (
        <View style={styles.section}>
          <Text style={TYPOGRAPHY.bodyMedium}>{item.description}</Text>
        </View>
      )}

      <View style={styles.statsContainer}>
        {item.details.population !== undefined && (
          <StatItem
            icon="people-outline"
            label="Population"
            value={item.details.population.toLocaleString()}
          />
        )}
        {mainCurrency && (
          <StatItem
            icon="cash-outline"
            label="Currency"
            value={currencyText}
          />
        )}
        {item.details.timezones?.[0] && (
          <StatItem
            icon="time-outline"
            label="Timezone"
            value={item.details.timezones[0]}
          />
        )}
      </View>
    </View>
  );
};

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) => (
  <View style={styles.statItem}>
    <View style={styles.statIconContainer}>
      <Icon name={icon} size={20} color={COLORS.textPrimary} />
    </View>
    <View style={styles.statTextContainer}>
      <Text style={[TYPOGRAPHY.caption, {color: COLORS.textSecondary}]}>
        {label}
      </Text>
      <Text style={[TYPOGRAPHY.bodyMediumSemiBold]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'column',
    gap: SPACING.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.md,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTextContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
});

export default ContentDetails;
