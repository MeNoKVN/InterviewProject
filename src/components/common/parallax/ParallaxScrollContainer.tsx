import React from 'react';
//switched to react native animated scroll view because of a bug with the reanimated scroll view
import {Dimensions, StyleSheet, View, Animated} from 'react-native';
import ParallaxHeader from './ParallaxHeader';
import {useRootNavigation} from '@/hooks/useAppNavigation';
import {COLORS} from '@/constants';

const {width, height} = Dimensions.get('window');

interface ParallaxScrollContainerProps {
  children: (props: {
    scrollRef: React.RefObject<any>;
    scrollY: Animated.Value;
  }) => React.ReactNode;
  imageUrl: string;
  imageHeightFraction?: number;
  scrollEnabled?: boolean;
  isLiked?: boolean;
  onShare?: () => void;
  onBookmark?: () => void;
}

const ParallaxScrollContainer: React.FC<ParallaxScrollContainerProps> = ({
  children,
  imageUrl,
  imageHeightFraction = 1 / 3,
  scrollEnabled = true,
  isLiked = false,
  onShare,
  onBookmark,
}) => {
  const scrollRef = React.useRef<any>(null);
  const navigation = useRootNavigation();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const IMG_HEIGHT = height * imageHeightFraction;

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-IMG_HEIGHT, 0, IMG_HEIGHT],
    outputRange: [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-IMG_HEIGHT, 0, IMG_HEIGHT],
    outputRange: [2, 1, 1],
  });

  return (
    <View style={styles.container}>
      <ParallaxHeader
        onBackPress={() => navigation.goBack()}
        onSharePress={onShare ?? (() => {})}
        onBookmarkPress={onBookmark ?? (() => {})}
        isBookmarked={isLiked}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        scrollEnabled={scrollEnabled}>
        <Animated.Image
          source={{uri: imageUrl}}
          style={[
            styles.image,
            {
              height: IMG_HEIGHT,
              transform: [
                {translateY: imageTranslateY},
                {scale: imageScale},
              ],
            },
          ]}
        />
        <View style={styles.content}>
          {children({scrollRef, scrollY})}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
  },
  content: {
    minHeight: height - height / 3,
    backgroundColor: COLORS.background,
  },
});

export default ParallaxScrollContainer;
