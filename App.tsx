import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store} from './src/stores';
import RootNavigator from './src/navigation/RootNavigator';
import { PortalProvider } from '@/components/portal/Portal';
import { initializeDialog } from '@/components/common/dialog/ConfirmDialog';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <PortalProvider ref={(ref) => initializeDialog(ref)}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </PortalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
