import React from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import ParallaxHeader from "./ParallaxHeader";
import { useContentNavigation } from "@/hooks/useAppNavigation";
import { COLORS } from '@/constants';

const { width, height } = Dimensions.get("window");

interface ParallaxScrollContainerProps {
  children: (props: { 
    scrollRef: React.RefObject<Animated.ScrollView>, 
    scrollY: SharedValue<number> 
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
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const navigation = useContentNavigation();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const IMG_HEIGHT = height * imageHeightFraction;

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
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
        onScroll={scrollHandler}
        scrollEnabled={scrollEnabled}
      >
        <Animated.Image
          source={{ uri: imageUrl }}
          style={[styles.image, { height: IMG_HEIGHT }, imageAnimatedStyle]}
        />
        <View style={styles.content}>
          {children({ scrollRef, scrollY })}
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
    minHeight: height - (height / 3),
    backgroundColor: COLORS.background,
  },
});

export default ParallaxScrollContainer;