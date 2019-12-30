import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { Text, List, Button, IconButton } from '../components/core-ui';
import { useFetch } from '../state/userList';
import { NavigationProp } from '../types/Navigation';
import { roleToLabel } from '../helpers/userRoles';

export default function UserList() {
  let { state, refresh } = useFetch();

  let navigation = useNavigation<NavigationProp<'UserList'>>();
  navigation.setOptions({
    headerRight: () => (
      <IconButton
        icon={() => <Icon name="plus" size={28} color="white" />}
        onPress={() => {
          navigation.navigate('UserCreate');
        }}
      />
    ),
  });
  let { isLoading, error, data } = state;
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <View style={{ height: 20 }} />
        <Button onPress={refresh}>Try again</Button>
      </View>
    );
  }
  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={refresh}
      ListEmptyComponent={() =>
        isLoading ? null : (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text>No items to display.</Text>
          </View>
        )
      }
      scrollEnabled={data.length !== 0}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item: user }) => (
        <List.Item
          title={user.name}
          description={`${roleToLabel(user.role)} | ${user.email}`}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            navigation.navigate('UserDetails', { user });
          }}
        />
      )}
    />
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
