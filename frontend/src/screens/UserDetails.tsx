import React, { useState } from 'react';
import { Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import * as Api from '../helpers/Api';
import { NavigationProp, RouteProp } from '../types/Navigation';
import { useToast, ToastProvider } from '../components/ToastProvider';
import { UserInput } from '../types/User';
import UserEditForm from '../components/UserEditForm';
import { useAuth } from '../components/AuthenticationProvider';

export default function UserDetails() {
  let { currentUser, setCurrentUser } = useAuth();
  let navigation = useNavigation<NavigationProp<'UserDetails'>>();
  let route = useRoute<RouteProp<'UserDetails'>>();
  let { user, refresh } = route.params;
  let [isLoading, setLoading] = useState(false);
  let [showToast, toastRef] = useToast();
  let onSubmit = async (userData: UserInput) => {
    Keyboard.dismiss();
    setLoading(true);
    let result = await Api.updateUser(user.id, userData);
    if (result.success) {
      refresh();
      if (currentUser && currentUser.id === user.id) {
        setCurrentUser(result.data);
      }
      navigation.navigate('UserList');
    } else {
      setLoading(false);
      showToast('Save failed: ' + result.error);
    }
  };
  let onDelete = async () => {
    Keyboard.dismiss();
    Alert.alert('Delete', 'Press "Delete" to permanently delete this user.', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: reallyDelete },
    ]);
  };
  let reallyDelete = async () => {
    setLoading(true);
    let result = await Api.deleteUser(user.id);
    if (result.success) {
      refresh();
      navigation.navigate('UserList');
    } else {
      setLoading(false);
      showToast('Request failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      <UserEditForm
        user={user}
        isLoading={isLoading}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </ToastProvider>
  );
}
