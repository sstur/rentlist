import React, { RefObject } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { NavigationContainerRef } from '@react-navigation/native';

import { Text } from './core-ui';
import { useAuth } from './AuthenticationProvider';
import { FONT_SIZE_LARGE, FONT_BOLD } from '../theme/theme';
import { Avatar } from 'react-native-paper';
import { UserRole } from '../types/User';

type Props = {
  navRef: RefObject<NavigationContainerRef>;
  closeDrawer: () => void;
};

type ButtonConfig = {
  icon: string;
  label: string;
  showForRoles?: Array<UserRole>;
  onPress: () => void;
};

export default function DrawerContent(props: Props) {
  let { navRef, closeDrawer } = props;
  let { currentUser, logout } = useAuth();
  if (currentUser == null) {
    return null;
  }
  let role = currentUser.role;
  let buttons: Array<ButtonConfig> = [
    {
      icon: 'home-outline',
      label: 'Rental Listings',
      onPress: () => {
        navRef.current && navRef.current.navigate('Home', undefined);
      },
    },
    {
      icon: 'bookmark-outline',
      label: 'Favorites',
      onPress: () => {},
    },
    {
      icon: 'file-document-box-outline',
      label: 'My Listings',
      showForRoles: ['MANAGER', 'ADMIN'],
      onPress: () => {},
    },
    {
      icon: 'account-group-outline',
      label: 'Manage Users',
      showForRoles: ['ADMIN'],
      onPress: () => {
        navRef.current && navRef.current.navigate('UserList', undefined);
      },
    },
    {
      icon: 'account-circle-outline',
      label: 'My Profile',
      onPress: () => {
        navRef.current && navRef.current.navigate('MyProfile', undefined);
      },
    },
    {
      icon: 'logout-variant',
      label: 'Logout',
      onPress: () => {
        logout();
        navRef.current && navRef.current.replace('Login', undefined);
      },
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Avatar.Text size={48} label={getInitials(currentUser.name)} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{currentUser.name}</Text>
          <Text style={styles.profileEmail}>{currentUser.email}</Text>
        </View>
      </View>
      <View style={styles.contentPane}>
        {buttons.map(({ icon, label, onPress, showForRoles }, i) =>
          showForRoles && !showForRoles.includes(role) ? null : (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={() => {
                onPress();
                closeDrawer();
              }}
            >
              <Icon name={icon} size={28} color="#999" />
              <Text style={styles.menuItemText}>{label}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </SafeAreaView>
  );
}

function getInitials(name: string): string {
  let parts = name
    .replace(/\W+/g, ' ')
    .trim()
    .split(' ');
  if (parts.length > 1) {
    return (parts[0].charAt(0) + (parts.pop() || '').charAt(0)).toUpperCase();
  } else {
    return parts[0].charAt(0).toUpperCase();
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  profileDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  profileName: {
    fontSize: FONT_SIZE_LARGE,
    fontFamily: FONT_BOLD,
  },
  profileEmail: {},
  contentPane: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    paddingLeft: 10,
  },
});
