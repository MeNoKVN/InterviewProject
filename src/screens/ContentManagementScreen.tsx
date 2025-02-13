import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {Container} from '@/components/themed';
import {useAppDispatch, useAppSelector} from '@/stores/hooks';
import {deleteContent} from '@/stores/content/thunks';
import {COLORS, SPACING} from '@/constants';
import {ContentItem} from '@/types/content';
import {useSharedValue} from 'react-native-reanimated';
import {ScreenHeader} from '@/components/common/ScreenHeader';
import {ListHeader} from '@/components/common/ListHeader';
import DeleteCard from '@/components/content/DeleteCard';
import ConfirmDialog from '@/components/common/dialog/ConfirmDialog';
import {FlashList} from '@shopify/flash-list';

const ContentManagementScreen = () => {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.content);
  const scrollY = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const handleDeletePress = (id: string) => {
    ConfirmDialog.show({
      title: 'Delete Content',
      message:
        'Are you sure you want to delete this content? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'danger',
      onConfirm: async () => {
        await dispatch(deleteContent(id));
      },
    });
  };

  const renderItem = React.useCallback(
    ({item}: {item: ContentItem}) => (
      <DeleteCard item={item} onDelete={handleDeletePress} />
    ),
    [],
  );

  return (
    <Container style={styles.container} useBottomInset={false}>
      <ScreenHeader
        rightActions={[
          {
            icon: 'search-outline',
            onPress: () => {},
          },
        ]}
        scrollY={scrollY}
      />
      <View style={styles.listContainer}>
        <FlashList
          data={data || []}
          renderItem={renderItem}
          estimatedItemSize={60}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={<ListHeader title="Manage Content" />}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingHorizontal: SPACING.md,
  },
});

export default ContentManagementScreen;
