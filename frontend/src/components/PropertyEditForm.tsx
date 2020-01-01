import React from 'react';
import { StyleSheet, Keyboard, ScrollView } from 'react-native';

import { Button, TextInput, NumberInput } from '../components/core-ui';
import useFormData from '../helpers/useFormData';
import Dropdown from '../components/core-ui/Dropdown';
import { Property, PropertyInput } from '../types/Property';
import { statusToLabel, statuses } from '../helpers/rentalStatus';

type Props = {
  property?: Property;
  isLoading: boolean;
  onSubmit: (data: PropertyInput) => void;
};

export default function PropertyEditForm(props: Props) {
  let { property, isLoading, onSubmit } = props;
  let initialData: PropertyInput;
  if (property) {
    let {
      name,
      description,
      floorArea,
      price,
      bedCount,
      bathCount,
      address,
      lat,
      lng,
      rentalStatus,
      images,
    } = property;
    initialData = {
      name,
      description,
      floorArea,
      price: price / 100,
      bedCount,
      bathCount,
      address,
      latLng: lat.toFixed(6) + ',' + lng.toFixed(6),
      rentalStatus,
      images: images.map(({ url }) => url)[0] || '',
    };
  } else {
    initialData = {
      name: '',
      description: '',
      floorArea: '',
      price: 0,
      bedCount: 0,
      bathCount: 0,
      address: '',
      latLng: '',
      rentalStatus: 'AVAILABLE',
      images: '',
    };
  }
  let [formData, setFormData] = useFormData(initialData);
  let submitHandler = async () => {
    Keyboard.dismiss();
    onSubmit(formData);
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        label="Name"
        style={styles.formField}
        autoFocus={true}
        value={formData.name}
        onChangeText={(text) => setFormData('name', text)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <TextInput
        label="Description"
        multiline={true}
        style={styles.formField}
        value={formData.description}
        onChangeText={(text) => setFormData('description', text)}
      />
      <TextInput
        label="Floor Area (square feet)"
        style={styles.formField}
        value={formData.floorArea}
        onChangeText={(text) => setFormData('floorArea', text)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <NumberInput
        label="Price"
        style={styles.formField}
        value={formData.price}
        onChange={(value) => setFormData('price', value)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <NumberInput
        label="Number of Bedrooms"
        style={styles.formField}
        value={formData.bedCount}
        onChange={(value) => setFormData('bedCount', value)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <NumberInput
        label="Number of Bathrooms"
        style={styles.formField}
        value={formData.bathCount}
        onChange={(value) => setFormData('bathCount', value)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <TextInput
        label="Address"
        style={styles.formField}
        value={formData.address}
        onChangeText={(text) => setFormData('address', text)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <TextInput
        label="Latitude, Longitude"
        style={styles.formField}
        value={formData.latLng}
        onChangeText={(text) => setFormData('latLng', text)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <TextInput
        label="Image"
        style={styles.formField}
        value={formData.images}
        onChangeText={(text) => setFormData('images', text)}
        returnKeyType="done"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />
      <Dropdown
        label="Rental Status"
        values={statuses}
        selectedValue={formData.rentalStatus}
        keyExtractor={(status) => status}
        titleExtractor={(status) => statusToLabel(status)}
        onSelect={(status) => setFormData('rentalStatus', status)}
        onShow={() => Keyboard.dismiss()}
        style={styles.formField}
      />
      <Button
        style={styles.formField}
        loading={isLoading}
        disabled={isLoading}
        onPress={submitHandler}
      >
        Save
      </Button>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  scrollViewContent: {
    padding: 40,
  },
  formField: {
    marginBottom: 20,
  },
});
