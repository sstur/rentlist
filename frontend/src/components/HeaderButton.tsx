import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './core-ui';

type Props = {
  label: string;
  onPress: () => void;
};

export default function HeaderButton(props: Props) {
  let { label, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
