import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Container, Text, View, Spacer} from '@/components/themed';
import {SPACING} from '@/constants';
import Hero from '@/components/welcome/Hero';
import { useAuthNavigation } from '@/hooks/useAppNavigation';

const WelcomeScreen = () => {
  const navigation = useAuthNavigation();
  return (
    <Container style={styles.container} forceBottomInset>
      <View style={styles.content}>
        <View style={styles.header}>
          <Hero />
          <Text variant="display" color="primary">
            Welcome Screen
          </Text>
          <Spacer size="sm" />
          <Text variant="bodyLarge" color="textSecondary">
            Welcome to the app. Please sign in to continue.
          </Text>
        </View>

        <View>
          <Button
            variant="rounded"
            size="xl"
            fullWidth
            color="primary"
            onPress={() => {}}>
            <Text color="textLight" variant="button">
              Get Started
            </Text>
          </Button>
          <Spacer size="md" />
          <Button
            variant="rounded"
            size="xl"
            fullWidth
            color="secondary"
            onPress={() => navigation.navigate('Login')}>
            <Text color="textPrimary" variant="button">
              Login
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
