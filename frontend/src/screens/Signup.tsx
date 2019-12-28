import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  let navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ margin: 20 }}>Signup</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.replace('Login', {});
        }}
      >
        Log in
      </Button>
    </View>
  );
}
