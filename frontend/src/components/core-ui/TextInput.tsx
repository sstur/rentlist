import React, { forwardRef, ComponentProps, Ref } from 'react';
import { StyleSheet, TextInput as TextInputType } from 'react-native';
import { TextInput as TextInputBase } from 'react-native-paper';

type Props = ComponentProps<typeof TextInputBase>;

const TextInput = forwardRef((props: Props, ref: Ref<TextInputType>) => {
  let { style, multiline, ...otherProps } = props;
  return (
    <TextInputBase
      ref={ref}
      multiline={multiline}
      style={[multiline ? styles.multiline : styles.input, style]}
      {...otherProps}
    />
  );
});

let styles = StyleSheet.create({
  input: {
    height: 60,
  },
  multiline: {},
});

export { TextInput, TextInputType };
