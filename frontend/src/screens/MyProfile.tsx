import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import * as Api from '../helpers/Api';
import { NavigationProp } from '../types/Navigation';
import { useToast, ToastProvider } from '../components/ToastProvider';
import { UserInput } from '../types/User';
import UserEditForm from '../components/UserEditForm';
import { useAuth } from '../components/AuthenticationProvider';

export default function UserDetails() {
  let { currentUser, setCurrentUser } = useAuth();
  let navigation = useNavigation<NavigationProp<'UserDetails'>>();
  let [isLoading, setLoading] = useState(false);
  let [showToast, toastRef] = useToast();
  let onSubmit = async (userData: UserInput) => {
    Keyboard.dismiss();
    setLoading(true);
    let id = currentUser ? currentUser.id : '';
    let result = await Api.updateUser(id, userData);
    if (result.success) {
      setCurrentUser(result.data);
      navigation.navigate('Home');
    } else {
      setLoading(false);
      showToast('Save failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      <UserEditForm
        user={currentUser || undefined}
        isLoading={isLoading}
        showRole={false}
        onSubmit={onSubmit}
      />
    </ToastProvider>
  );
}
