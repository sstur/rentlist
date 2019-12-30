import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import * as Api from '../helpers/Api';
import { NavigationProp, RouteProp } from '../types/Navigation';
import { useToast, ToastProvider } from '../components/ToastProvider';
import { PropertyInput } from '../types/Property';
import PropertyEditForm from '../components/PropertyEditForm';

export default function PropertyCreate() {
  let navigation = useNavigation<NavigationProp<'PropertyCreate'>>();
  let route = useRoute<RouteProp<'PropertyCreate'>>();
  let { onComplete } = route.params;
  let [isLoading, setLoading] = useState(false);
  let [showToast, toastRef] = useToast();
  let onSubmit = async (formData: PropertyInput) => {
    Keyboard.dismiss();
    setLoading(true);
    let result = await Api.createProperty(formData);
    if (result.success) {
      onComplete();
      navigation.navigate('Home');
    } else {
      setLoading(false);
      showToast('Save failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      {() => <PropertyEditForm isLoading={isLoading} onSubmit={onSubmit} />}
    </ToastProvider>
  );
}
