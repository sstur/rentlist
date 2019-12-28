import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { Text as TextBase } from './Text';

type Props = ComponentProps<typeof TextBase>;

export function Link(props: Props) {
  let { style, ...otherProps } = props;
  return <TextBase style={[styles.text, style]} {...otherProps} />;
}

let styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  },
});
