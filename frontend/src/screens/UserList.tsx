import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

import { Text, List, Button } from '../components/core-ui';
import { useFetch } from '../state/userList';
import { NavigationProp } from '../types/Navigation';
import { roleToLabel } from '../helpers/userRoles';
import { PRIMARY_COLOR } from '../theme/theme';

export default function UserList() {
  let { state, refresh } = useFetch();
  let navigation = useNavigation<NavigationProp<'UserList'>>();
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
    <>
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
              navigation.navigate('UserDetails', { user, refresh });
            }}
          />
        )}
      />
      <FAB
        style={styles.floatingActionButton}
        icon="plus"
        onPress={() => {
          navigation.navigate('UserCreate', { refresh });
        }}
      />
    </>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingActionButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: PRIMARY_COLOR,
  },
});
