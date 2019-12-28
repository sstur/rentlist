import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { APP_TITLE } from '../constants';
import headerOptions from '../theme/headerOptions';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import PropertyList from '../screens/PropertyList';

let Stack = createStackNavigator();

type Props = {
  isAuthenticated: boolean;
};

export default function MainStack(props: Props) {
  return (
    <Stack.Navigator
      initialRouteName={props.isAuthenticated ? 'PropertyList' : 'Login'}
      screenOptions={{
        title: APP_TITLE,
        ...headerOptions,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="PropertyList"
        component={PropertyList}
        options={{ title: 'Available Rentals' }}
      />
    </Stack.Navigator>
  );
}
