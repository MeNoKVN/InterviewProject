import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Container, TextInput, Spacer, Text} from '@/components/themed';
import {useAppDispatch, useAppSelector} from '@/stores/hooks';
import {loginThunk} from '@/stores/auth/thunks';
import ModalHeader from '@/components/navigation/ModalHeader';
import {SPACING} from '@/constants';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Login attempt:', {email, password});
      await dispatch(loginThunk({email, password})).unwrap();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container style={styles.container} useSafeArea={false}>
      <ModalHeader title="Login" />
      <View style={styles.content}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          error={error ? 'Invalid email or password' : undefined}
          autoFocus
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoComplete="password"
          error={error ? 'Invalid email or password' : undefined}
        />
        <Spacer size="lg" />
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleLogin}
          loading={isLoading}>
          Login
        </Button>
        <View style={styles.footer}>
          <Text variant="caption" color="textSecondary">
            Don't have an account?{' '}
            <Text
              variant="caption"
              color="primary"
              style={styles.link}
              onPress={() => {}}>
              Sign up
            </Text>
          </Text>
          <Text variant="caption" color="textSecondary">
            Or use 'test@example.com' and 'password'
          </Text>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
  },
  footer: {
    flex: 1,
    padding: SPACING.md,
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
