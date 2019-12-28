import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as ThemeProvider } from 'react-native-paper';
import { NavigationNativeContainer } from '@react-navigation/native';

import theme from './theme/theme';
import FontLoader from './components/FontLoader';
import MainStack from './navigation/MainStack';

export default function App() {
  return (
    <FontLoader>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <NavigationNativeContainer>
          <MainStack isAuthenticated={false} />
        </NavigationNativeContainer>
      </ThemeProvider>
    </FontLoader>
  );
}
