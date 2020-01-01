import React, { ComponentProps } from 'react';
import { IconButton as IconButtonBase } from 'react-native-paper';
import { Icon } from './Icon';

type IconButtonProps = ComponentProps<typeof IconButtonBase>;

type Props = Omit<IconButtonProps, 'icon'> & {
  icon: string;
};

export function IconButton(props: Props) {
  let { icon, ...otherProps } = props;
  return (
    <IconButtonBase
      icon={() => <Icon name={icon} size={28} color="white" />}
      {...otherProps}
    />
  );
}
