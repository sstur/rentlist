import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import * as Api from '../helpers/Api';
import { NavigationProp, RouteProp } from '../types/Navigation';
import { useToast, ToastProvider } from '../components/ToastProvider';
import { UserInput } from '../types/User';
import UserEditForm from '../components/UserEditForm';

export default function UserDetails() {
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
      navigation.navigate('UserList');
    } else {
      setLoading(false);
      showToast('Save failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      {() => (
        <UserEditForm user={user} isLoading={isLoading} onSubmit={onSubmit} />
      )}
    </ToastProvider>
  );
}
