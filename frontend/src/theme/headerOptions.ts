import { StackNavigationOptions } from '@react-navigation/stack';
import { PRIMARY_COLOR, TEXT_ON_PRIMARY_COLOR } from './theme';
import { FONT_MEDIUM } from './fonts';

const headerOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: PRIMARY_COLOR,
  },
  headerTintColor: TEXT_ON_PRIMARY_COLOR,
  headerTitleStyle: {
    fontFamily: FONT_MEDIUM,
  },
};

export default headerOptions;
