import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as ThemeProvider, Text } from 'react-native-paper';

import theme from './theme/theme';
import FontLoader from './components/FontLoader';

export default function App() {
  return (
    <FontLoader>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>Hello World</Text>
        </SafeAreaView>
      </ThemeProvider>
    </FontLoader>
  );
}
