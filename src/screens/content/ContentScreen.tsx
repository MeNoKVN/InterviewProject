import React, {useEffect} from 'react';
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

  const handleRefresh = () => {
    dispatch(fetchContent());
  };

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const handlePress = (item: ContentItem) => {
    navigation.navigate('ContentDetails', {id: item.id});
  };

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
        rightActions={[
          {
            icon: 'search-outline',
            onPress: () => {},
          },
          {
            icon: 'filter-outline',
            onPress: () => {},
          },
        ]}
        scrollY={scrollY}
      />
      <View style={styles.listContainer}>
        <Animated.FlatList
          data={data || []}
          renderItem={({item}) => (
            <ContentCard item={item} onPress={handlePress} />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          ListHeaderComponent={<ListHeader title="Content" />}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
        />
      </View>
    </Container>
  );
};

export default ContentScreen;

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
