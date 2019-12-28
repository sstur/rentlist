import { DefaultTheme, Theme } from 'react-native-paper';

import {
  FONT_BOLD,
  FONT_MEDIUM,
  FONT_REGULAR,
  FONT_LIGHT,
  FONT_THIN,
} from './fonts';

export { FONT_BOLD, FONT_MEDIUM, FONT_REGULAR, FONT_LIGHT, FONT_THIN };

export const FONT_SIZE_LARGE = 18;
export const FONT_SIZE_NORMAL = 16;
export const FONT_SIZE_SMALL = 14;

export const TEXT_ON_PRIMARY_COLOR = 'white';
export const PRIMARY_COLOR = '#5458E1';
export const ACCENT_COLOR = '#FF6C00';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
    accent: ACCENT_COLOR,
  },
  fonts: {
    medium: { fontFamily: FONT_MEDIUM },
    regular: { fontFamily: FONT_REGULAR },
    light: { fontFamily: FONT_LIGHT },
    thin: { fontFamily: FONT_THIN },
  },
};

export default theme;
