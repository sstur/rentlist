import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { Button as ButtonBase } from 'react-native-paper';

type Props = ComponentProps<typeof ButtonBase>;

export function Button(props: Props) {
  let { contentStyle, labelStyle, ...otherProps } = props;
  return (
    <ButtonBase
      mode="contained"
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
      {...otherProps}
    />
  );
}

let styles = StyleSheet.create({
  content: {
    height: 50,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 28,
  },
});
