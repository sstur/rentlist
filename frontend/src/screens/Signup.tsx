import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {
  Button,
  Link,
  Text,
  TextInput,
  TextInputType,
} from '../components/core-ui';
import * as Api from '../helpers/Api';
import { NavigationProp } from '../types/Navigation';
import { useAuth } from '../components/AuthenticationProvider';
import { ToastProvider, useToast } from '../components/ToastProvider';

export default function Signup() {
  let { setCurrentUser } = useAuth();
  let navigation = useNavigation<NavigationProp<'Signup'>>();
  let emailRef = useRef<TextInputType>(null);
  let passwordRef = useRef<TextInputType>(null);
  let [isLoading, setLoading] = useState(false);
  let [showToast, toastRef] = useToast();
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let onSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let result = await Api.signup({ name, email, password });
    if (result.success) {
      setCurrentUser(result.data);
      navigation.replace('Home');
    } else {
      setLoading(false);
      showToast('Signup failed: ' + result.error);
    }
  };
  return (
    <ToastProvider ref={toastRef}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.form}>
          <View style={styles.description}>
            <Text>
              Already have an account?{' '}
              <Link
                onPress={() => {
                  navigation.replace('Login');
                }}
              >
                Log in
              </Link>
            </Text>
          </View>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            autoFocus={true}
            value={name}
            onChangeText={(text) => setName(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef.current && emailRef.current.focus();
            }}
          />
          <TextInput
            placeholder="Email"
            ref={emailRef}
            style={styles.textInput}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current && passwordRef.current.focus();
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            ref={passwordRef}
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
          />
          <Button loading={isLoading} disabled={isLoading} onPress={onSubmit}>
            Sign Up
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </ToastProvider>
  );
}

let styles = StyleSheet.create({
  description: {
    alignItems: 'center',
    marginVertical: 20,
  },
  form: {
    flex: 1,
    paddingHorizontal: 48,
  },
  textInput: {
    marginBottom: 20,
  },
});
