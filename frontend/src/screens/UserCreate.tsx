import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import * as Api from '../helpers/Api';
import { NavigationProp } from '../types/Navigation';
import { useToast, ToastProvider } from '../components/ToastProvider';
import { UserInput } from '../types/User';
import UserEditForm from '../components/UserEditForm';

export default function UserCreate() {
  let navigation = useNavigation<NavigationProp<'UserCreate'>>();
  let [isLoading, setLoading] = useState(false);
  let [showToast, toastRef] = useToast();
  let onSubmit = async (userData: UserInput) => {
    Keyboard.dismiss();
    setLoading(true);
    let result = await Api.createUser(userData);
    if (result.success) {
      navigation.navigate('UserList');
    } else {
      setLoading(false);
      showToast('Save failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      {() => <UserEditForm isLoading={isLoading} onSubmit={onSubmit} />}
    </ToastProvider>
  );
}
