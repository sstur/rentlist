import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { Text as TextBase } from 'react-native-paper';

type Props = ComponentProps<typeof TextBase>;

export function Text(props: Props) {
  let { style, ...otherProps } = props;
  return <TextBase style={[styles.text, style]} {...otherProps} />;
}

let styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
