import React, { useRef, RefObject } from 'react';
import { StatusBar } from 'react-native';
import { Provider as ThemeProvider } from 'react-native-paper';
import {
  NavigationNativeContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

import theme from './theme/theme';
import FontLoader from './components/FontLoader';
import MainStack from './navigation/MainStack';
import AuthenticationProvider from './components/AuthenticationProvider';
import { DrawerProvider } from './navigation/Drawer';

export default function App() {
  let navRef = useRef() as RefObject<NavigationContainerRef>;
  return (
    <FontLoader>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AuthenticationProvider>
          <DrawerProvider navRef={navRef}>
            <NavigationNativeContainer ref={navRef}>
              <MainStack />
            </NavigationNativeContainer>
          </DrawerProvider>
        </AuthenticationProvider>
      </ThemeProvider>
    </FontLoader>
  );
}
