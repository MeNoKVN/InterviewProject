import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from '@/components/themed';
import ParallaxScrollContainer from '@/components/common/parallax/ParallaxScrollContainer';
import ContentDetails from '@/components/content/ContentDetails';
import {useRoute} from '@react-navigation/native';
import {useAppSelector} from '@/stores/hooks';

const ContentDetailsScreen = () => {
  const route = useRoute();
  const {id} = route.params as {id: string};
  const item = useAppSelector(state => 
    state.content.data?.find(item => item.id === id)
  );

  if (!item) return null;

  return (
    <Container style={styles.container} useSafeArea={false}>
      <ParallaxScrollContainer
        imageUrl={item.image}
        imageHeightFraction={0.5}
      >
        {() => <ContentDetails item={item} />}
      </ParallaxScrollContainer>
    </Container>
  );
};

export default ContentDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
