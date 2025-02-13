import React, {useEffect, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import ContentCard from '@/components/content/ContentCard';
import {useAppDispatch, useAppSelector} from '@/stores/hooks';
import {fetchContent} from '@/stores/content/thunks';
import {useContentNavigation} from '@/hooks/useAppNavigation';
import {ContentItem} from '@/types/content';
import {COLORS, SPACING} from '@/constants';
import {Container, View} from '@/components/themed';
import {ScreenHeader} from '@/components/common/ScreenHeader';
import {ListHeader} from '@/components/common/ListHeader';
import {FlashList} from '@shopify/flash-list';
import {IconName} from '@/components/themed/Icon';

const ContentScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useContentNavigation();
  const {data, isLoading} = useAppSelector(state => state.content);
  const scrollY = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const handleRefresh = useCallback(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const handlePress = useCallback(
    (item: ContentItem) => {
      navigation.navigate('ContentDetails', {id: item.id});
    },
    [navigation],
  );

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const rightActions = useMemo(
    () => [
      {
        icon: 'search-outline' as IconName,
        onPress: () => {},
      },
      {
        icon: 'filter-outline' as IconName,
        onPress: () => {},
      },
    ],
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: ContentItem}) => (
      <ContentCard item={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const listHeader = useMemo(() => <ListHeader title="Content" />, []);

  if (isLoading && !data) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Container style={styles.container} useBottomInset={false}>
      <ScreenHeader rightActions={rightActions} scrollY={scrollY} />

      <View style={styles.listContainer}>
        <FlashList
          data={data || []}
          renderItem={renderItem}
          estimatedItemSize={100}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.list}
          refreshing={isLoading}
          onRefresh={handleRefresh}
          keyExtractor={item => item.id}
        />
      </View>
    </Container>
  );
};

export default React.memo(ContentScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  list: {
    paddingHorizontal: SPACING.md,
  },
});
