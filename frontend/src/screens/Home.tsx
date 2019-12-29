import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, Button } from '../components/core-ui';
import { useFetch } from '../state/propertyList';
import PropertyListItem from '../components/PropertyListItem';
import { Property } from '../types/Property';
import { NavigationProp } from '../types/Navigation';

export default function Home() {
  let { state, refresh } = useFetch();
  let navigation = useNavigation<NavigationProp<'Home'>>();
  let onItemPress = useCallback(
    (property: Property) => {
      navigation.navigate('PropertyDetails', { property });
    },
    [navigation],
  );
  let { isLoading, error, data } = state;
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
    <View style={styles.container}>
      <FlatList
        refreshing={isLoading}
        onRefresh={refresh}
        contentContainerStyle={styles.scrollViewContent}
        ListEmptyComponent={() =>
          isLoading ? null : (
            <View style={styles.fillPageCentered}>
              <Text>No properties available.</Text>
            </View>
          )
        }
        scrollEnabled={data.length !== 0}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: property }) => (
          <PropertyListItem property={property} onPress={onItemPress} />
        )}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  fillPageCentered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
