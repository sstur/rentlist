import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import { Button, TextInput } from '../components/core-ui';
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
      price,
      bedCount,
      bathCount,
      address,
      lat,
      lng,
      rentalStatus,
      images: images.join('\n'),
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
      lat: 0,
      lng: 0,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="always"
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
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
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
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
            onPress={submitHandler}
          >
            Save
          </Button>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 40,
  },
  formField: {
    marginBottom: 20,
  },
});
