import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

import { Button, TextInput, TextInputType } from '../components/core-ui';
import useFormData from '../helpers/useFormData';
import Dropdown from '../components/core-ui/Dropdown';
import { User, UserInput } from '../types/User';
import { roleToLabel, userRoles } from '../helpers/userRoles';

type Props = {
  user?: User;
  isLoading: boolean;
  showRole?: boolean;
  onSubmit: (data: UserInput) => void;
  onDelete?: () => void;
};

export default function UserEditForm(props: Props) {
  let { user, isLoading, showRole, onSubmit, onDelete } = props;
  let initialData: UserInput;
  if (user) {
    let { name, email, role } = user;
    initialData = { name, email, password: '', role };
  } else {
    initialData = { name: '', email: '', password: '', role: 'USER' };
  }
  let emailRef = useRef<TextInputType>(null);
  let passwordRef = useRef<TextInputType>(null);
  let [userData, setUserData] = useFormData(initialData);
  let submitHandler = async () => {
    Keyboard.dismiss();
    onSubmit(userData);
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
            value={userData.name}
            onChangeText={(text) => setUserData('name', text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef.current && emailRef.current.focus();
            }}
          />
          <TextInput
            label="Email"
            ref={emailRef}
            style={styles.formField}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            value={userData.email}
            onChangeText={(text) => setUserData('email', text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current && passwordRef.current.focus();
            }}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            ref={passwordRef}
            style={styles.formField}
            value={userData.password}
            onChangeText={(text) => setUserData('password', text)}
            returnKeyType="go"
            onSubmitEditing={submitHandler}
          />
          {showRole !== false && (
            <Dropdown
              label="Role"
              values={userRoles}
              selectedValue={userData.role}
              keyExtractor={(role) => role}
              titleExtractor={(role) => roleToLabel(role)}
              onSelect={(role) => setUserData('role', role)}
              onShow={() => Keyboard.dismiss()}
              style={styles.formField}
            />
          )}
          <Button
            style={styles.formField}
            loading={isLoading}
            disabled={isLoading}
            onPress={submitHandler}
          >
            Save
          </Button>
          {onDelete && (
            <Button color="#E1545F" onPress={onDelete}>
              Delete
            </Button>
          )}
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
