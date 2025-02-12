import React, {useEffect, useCallback, useMemo} from 'react';
import {StyleSheet, ActivityIndicator, View, RefreshControl} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import ContentCard from '@/components/content/ContentCard';
import {useAppDispatch, useAppSelector} from '@/stores/hooks';
import {fetchContent} from '@/stores/content/thunks';
import {useContentNavigation} from '@/hooks/useAppNavigation';
import {ContentItem} from '@/types/content';
import {COLORS, SPACING} from '@/constants';
import {Container} from '@/components/themed';
import {ScreenHeader} from '@/components/common/ScreenHeader';
import {ListHeader} from '@/components/common/ListHeader';

const ContentScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useContentNavigation();
  const {data, isLoading} = useAppSelector(state => state.content);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleRefresh = useCallback(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const handlePress = useCallback((item: ContentItem) => {
    navigation.navigate('ContentDetails', {id: item.id});
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const rightActions = useMemo(() => [
    {
      icon: 'search-outline',
      onPress: () => {},
    },
    {
      icon: 'filter-outline',
      onPress: () => {},
    },
  ], []);

  const renderItem = useCallback(({item}: {item: ContentItem}) => (
    <ContentCard item={item} onPress={handlePress} />
  ), [handlePress]);

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
      <ScreenHeader
        rightActions={rightActions as any}
        scrollY={scrollY}
      />
  
      <View style={styles.listContainer}>
        <Animated.FlatList
          data={data || []}
          renderItem={renderItem}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.list}
          refreshControl={
            // this is pretty shitty probably just use use effect
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
              progressViewOffset={10}
            />
          }
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={8}
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
