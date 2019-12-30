import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

import PropertyList from '../components/PropertyList';
import { Text, Button } from '../components/core-ui';
import { useFetch } from '../state/propertyList';
import { Property } from '../types/Property';
import { NavigationProp } from '../types/Navigation';
import { PRIMARY_COLOR } from '../theme/theme';
import { useAuth } from '../components/AuthenticationProvider';

export default function MyListings() {
  let { currentUser } = useAuth();
  let { state, refresh } = useFetch();
  let navigation = useNavigation<NavigationProp<'Home'>>();
  let onItemPress = (property: Property) => {
    navigation.navigate('PropertyDetails', { property, refresh });
  };
  let { isLoading, error, data } = state;
  let userID = currentUser ? currentUser.id : '';
  let properties = useMemo(
    () => data.filter((property) => property.manager.id === userID),
    [data, userID],
  );
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
        <View style={{ height: 20 }} />
        <Button onPress={refresh}>Try again</Button>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <PropertyList
        onItemPress={onItemPress}
        isLoading={isLoading}
        data={properties}
        refresh={refresh}
      />
      <FAB
        style={styles.floatingActionButton}
        icon="plus"
        onPress={() => {
          navigation.navigate('PropertyCreate', {
            refresh,
          });
        }}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    padding: 30,
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
