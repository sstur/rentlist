import { RouteProp as RoutePropBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Property } from './Property';
import { User } from './User';

export type NavigationProp<T extends keyof RootParamList> = StackNavigationProp<
  RootParamList,
  T
>;

export type RouteProp<T extends keyof RootParamList> = RoutePropBase<
  RootParamList,
  T
>;

export type RootParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  PropertyDetails: { property: Property; refresh: () => void };
  PropertyCreate: { onComplete: () => void };
  PropertyEdit: { property: Property; onComplete: () => void };
  UserList: undefined;
  UserDetails: { user: User };
  UserCreate: undefined;
};
