import React from 'react';
import { IconButton } from './core-ui';
import { useDrawer } from '../navigation/Drawer';

export default function DrawerButton() {
  let { openDrawer } = useDrawer();
  return (
    <IconButton
      icon="menu"
      onPress={() => {
        openDrawer();
      }}
    />
  );
}
