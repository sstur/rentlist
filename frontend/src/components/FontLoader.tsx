import React, { useState, useCallback } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import fonts from '../theme/fonts';

type Props = {
  children: React.ReactElement;
};

export default function FontLoader(props: Props) {
  let [isLoading, setLoading] = useState(true);
  let loadFonts = useCallback(async () => {
    await Font.loadAsync(fonts);
  }, []);
  return isLoading ? (
    <AppLoading
      startAsync={loadFonts}
      onFinish={() => {
        setLoading(false);
      }}
    />
  ) : (
    props.children
  );
}
