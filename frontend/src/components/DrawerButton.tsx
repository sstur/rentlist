import React from 'react';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useDrawer } from '../navigation/Drawer';

export default function DrawerButton() {
  let { openDrawer } = useDrawer();
  return (
    <IconButton
      icon={() => <Icon name="menu" size={30} color="white" />}
      onPress={() => {
        openDrawer();
      }}
    />
  );
}
