import React, { forwardRef, ComponentProps, Ref } from 'react';
import { StyleSheet, TextInput as TextInputType } from 'react-native';
import { TextInput as TextInputBase } from 'react-native-paper';

type Props = ComponentProps<typeof TextInputBase>;

const TextInput = forwardRef((props: Props, ref: Ref<TextInputType>) => {
  let { style, ...otherProps } = props;
  return (
    <TextInputBase ref={ref} style={[styles.input, style]} {...otherProps} />
  );
});

let styles = StyleSheet.create({
  input: {
    height: 60,
  },
});

export { TextInput, TextInputType };
