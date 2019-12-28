import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import {
  Button,
  Headline,
  Link,
  Snackbar,
  Text,
  TextInput,
  TextInputType,
} from '../components/core-ui';

export default function Signup() {
  let navigation = useNavigation();
  let emailRef = useRef<TextInputType>(null);
  let passwordRef = useRef<TextInputType>(null);
  let [isLoading, setLoading] = useState(false);
  let [toastMessage, setToastMessage] = useState('');
  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let onSubmit = () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToastMessage('Signup not successful');
    }, 1200);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.containerInner}>
          <View style={styles.form}>
            <Headline style={styles.headline}>Sign Up</Headline>
            <View style={styles.description}>
              <Text>
                Already have an account?{' '}
                <Link
                  onPress={() => {
                    navigation.replace('Login', {});
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
            <Button
              mode="contained"
              loading={isLoading}
              disabled={isLoading}
              onPress={onSubmit}
            >
              Sign Up
            </Button>
          </View>
          <Snackbar
            visible={toastMessage !== ''}
            onDismiss={() => setToastMessage('')}
          >
            {toastMessage}
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerInner: {
    flex: 1,
  },
  headline: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  description: {
    alignItems: 'center',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    paddingHorizontal: 48,
  },
  textInput: {
    marginBottom: 20,
  },
});
