import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderButton from '../components/HeaderButton';
import PropertyList from '../components/PropertyList';
import PropertyMap from '../components/PropertyMap';
import { Text, Button } from '../components/core-ui';
import { useFetch } from '../state/propertyList';
import { Property } from '../types/Property';
import { NavigationProp } from '../types/Navigation';

type ViewMode = 'LIST' | 'MAP';

export default function Home() {
  let [viewMode, setViewMode] = useState<ViewMode>('LIST');
  let { state, refresh } = useFetch();
  let navigation = useNavigation<NavigationProp<'Home'>>();
  navigation.setOptions({
    headerRight: () => (
      <HeaderButton
        label={viewMode === 'MAP' ? 'List' : 'Map'}
        onPress={() => {
          setViewMode((mode) => (mode === 'MAP' ? 'LIST' : 'MAP'));
        }}
      />
    ),
  });
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
  return viewMode === 'MAP' ? (
    <PropertyMap
      onItemPress={onItemPress}
      isLoading={isLoading}
      data={data}
      refresh={refresh}
    />
  ) : (
    <PropertyList
      onItemPress={onItemPress}
      isLoading={isLoading}
      data={data}
      refresh={refresh}
    />
  );
}

let styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
