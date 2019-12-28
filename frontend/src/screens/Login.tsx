import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  let navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ margin: 20 }}>Login</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.replace('Signup', {});
        }}
      >
        Sign up
      </Button>
    </View>
  );
}
