import React, { forwardRef, ComponentProps, Ref, useState } from 'react';
import { TextInput as TextInputType } from 'react-native';
import { TextInput as TextInputBase } from './TextInput';

type TextInputProps = ComponentProps<typeof TextInputBase>;

type Props = Omit<TextInputProps, 'value' | 'onChange' | 'onChangeText'> & {
  value: number;
  onChange: (value: number) => void;
};

const NumberInput = forwardRef((props: Props, ref: Ref<TextInputType>) => {
  let { onBlur, value: upstreamValue, onChange, ...otherProps } = props;
  let [value, setValue] = useState(upstreamValue.toString());
  return (
    <TextInputBase
      ref={ref}
      value={value}
      onBlur={(event: unknown) => {
        let number = toNumber(value);
        setValue(number.toString());
        onChange(number);
        onBlur && onBlur(event);
      }}
      onChangeText={(text) => {
        setValue(text.replace(/[^-+\.\d]/g, ''));
      }}
      {...otherProps}
    />
  );
});

function toNumber(input: string): number {
  return Number(input);
}

export { NumberInput, TextInputType as NumberInputType };
