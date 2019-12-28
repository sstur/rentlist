import { StackNavigationOptions } from '@react-navigation/stack';
import {
  PRIMARY_COLOR,
  TEXT_ON_PRIMARY_COLOR,
  FONT_MEDIUM,
  FONT_SIZE_LARGE,
} from './theme';

const headerOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: PRIMARY_COLOR,
  },
  headerTintColor: TEXT_ON_PRIMARY_COLOR,
  headerTitleStyle: {
    fontSize: FONT_SIZE_LARGE,
    fontFamily: FONT_MEDIUM,
  },
};

export default headerOptions;
