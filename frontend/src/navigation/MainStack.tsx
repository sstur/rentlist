import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { APP_TITLE } from '../constants';
import headerOptions from '../theme/headerOptions';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import PropertyList from '../screens/PropertyList';
import PropertyDetails from '../screens/PropertyDetails';
import { RootParamList } from '../types/Navigation';

let Stack = createStackNavigator<RootParamList>();

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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Log in' }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Sign up' }}
      />
      <Stack.Screen
        name="PropertyList"
        component={PropertyList}
        options={{ title: 'Available Rentals' }}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetails}
        options={{
          title: 'Rental Details',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
