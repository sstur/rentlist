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
import * as Api from '../helpers/Api';
import { NavigationProp } from '../types/Navigation';

export default function Login() {
  let navigation = useNavigation<NavigationProp<'Login'>>();
  let emailRef = useRef<TextInputType>(null);
  let passwordRef = useRef<TextInputType>(null);
  let [isLoading, setLoading] = useState(false);
  let [toastMessage, setToastMessage] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let onSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let result = await Api.login({ email, password });
    if (result.success) {
      navigation.replace('PropertyList');
    } else {
      setLoading(false);
      setToastMessage('Login failed');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.containerInner}>
          <View style={styles.form}>
            <Headline style={styles.headline}>Log In</Headline>
            <View style={styles.description}>
              <Text>
                {`Don't have an account? `}
                <Link
                  onPress={() => {
                    navigation.replace('Signup');
                  }}
                >
                  Sign up
                </Link>
              </Text>
            </View>
            <TextInput
              label="Email"
              ref={emailRef}
              autoFocus={true}
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
              label="Password"
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
              Log In
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
