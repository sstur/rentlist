import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { APP_TITLE } from '../constants';
import headerOptions from '../theme/headerOptions';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import PropertyDetails from '../screens/PropertyDetails';
import UserList from '../screens/UserList';

import DrawerButton from '../components/DrawerButton';
import { RootParamList } from '../types/Navigation';
import { useAuth } from '../components/AuthenticationProvider';

let Stack = createStackNavigator<RootParamList>();

export default function MainStack() {
  let { currentUser } = useAuth();
  let isAuthenticated = currentUser != null;
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}
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
        name="Home"
        component={Home}
        options={{
          title: 'Available Rentals',
          headerLeft: () => <DrawerButton />,
        }}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetails}
        options={{
          title: 'Rental Details',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{
          title: 'Users',
          headerLeft: () => <DrawerButton />,
        }}
      />
    </Stack.Navigator>
  );
}
