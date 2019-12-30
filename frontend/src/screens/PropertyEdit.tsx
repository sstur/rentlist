import React, { useState } from 'react';
import { Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import * as Api from '../helpers/Api';
import { NavigationProp, RouteProp } from '../types/Navigation';
import { useToast, ToastProvider } from '../components/ToastProvider';
import { PropertyInput } from '../types/Property';
import PropertyEditForm from '../components/PropertyEditForm';

export default function PropertyEdit() {
  let navigation = useNavigation<NavigationProp<'PropertyEdit'>>();
  let route = useRoute<RouteProp<'PropertyEdit'>>();
  let { property, refresh } = route.params;
  let [isLoading, setLoading] = useState(false);
  let [showToast, toastRef] = useToast();
  let onSubmit = async (formData: PropertyInput) => {
    Keyboard.dismiss();
    setLoading(true);
    let result = await Api.updateProperty(property.id, formData);
    if (result.success) {
      refresh();
      navigation.navigate('Home');
    } else {
      setLoading(false);
      showToast('Save failed: ' + result.error);
    }
  };
  let onDelete = async () => {
    Keyboard.dismiss();
    Alert.alert(
      'Delete',
      'Press "Delete" to permanently delete this rental listing.',
      [{ text: 'Cancel' }, { text: 'Delete', onPress: reallyDelete }],
    );
  };
  let reallyDelete = async () => {
    setLoading(true);
    let result = await Api.deleteProperty(property.id);
    if (result.success) {
      refresh();
      navigation.navigate('Home');
    } else {
      setLoading(false);
      showToast('Request failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      {() => (
        <PropertyEditForm
          property={property}
          isLoading={isLoading}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      )}
    </ToastProvider>
  );
}
