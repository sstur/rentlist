import { DefaultTheme, Theme } from 'react-native-paper';

import { FONT_MEDIUM, FONT_REGULAR, FONT_LIGHT, FONT_THIN } from './fonts';

export const TEXT_ON_PRIMARY_COLOR = 'white';
export const PRIMARY_COLOR = '#00A843';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: PRIMARY_COLOR,
    // accent: 'blue',
  },
  fonts: {
    medium: { fontFamily: FONT_MEDIUM },
    regular: { fontFamily: FONT_REGULAR },
    light: { fontFamily: FONT_LIGHT },
    thin: { fontFamily: FONT_THIN },
  },
};

export default theme;
