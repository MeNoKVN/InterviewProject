import {StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '@/components/themed';
import {useAppDispatch, useAppSelector} from '@/stores/hooks';
import {logoutThunk} from '@/stores/auth/thunks';
import {Container} from '@/components/themed';


const UserProfileScreen = () => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.auth);

  return (
    <Container style={styles.container}>
      <Button variant="primary" loading={isLoading} onPress={() => dispatch(logoutThunk())}>
        Logout
      </Button>
    </Container>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
