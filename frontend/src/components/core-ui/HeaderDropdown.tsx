import React, { ComponentProps, useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

type IconButtonProps = ComponentProps<typeof IconButton>;

type MenuItem = {
  title: string;
  onPress: () => void;
};

type Props = Omit<IconButtonProps, 'icon' | 'onPress'> & {
  menu: Array<MenuItem>;
};

export function HeaderDropdown(props: Props) {
  let { menu, ...otherProps } = props;
  let [isMenuVisible, setMenuVisible] = useState(false);
  return (
    <Menu
      visible={isMenuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <IconButton
          icon={() => <Icon name="dots-vertical" size={28} color="white" />}
          onPress={() => {
            setMenuVisible(true);
          }}
          {...otherProps}
        />
      }
    >
      {menu.map((menuItem, i) => {
        return (
          <Menu.Item
            key={i}
            onPress={() => {
              menuItem.onPress();
              setMenuVisible(false);
            }}
            title={menuItem.title}
          />
        );
      })}
    </Menu>
  );
}
