import React from 'react';
import { View, FlatList } from 'react-native';

import { Text } from '../components/core-ui';
import PropertyListItem from '../components/PropertyListItem';
import { Property } from '../types/Property';

type Props = {
  onItemPress: (property: Property) => void;
  isLoading: boolean;
  data: Array<Property>;
  refresh: () => void;
};

export default function PropertyList(props: Props) {
  let { isLoading, data, onItemPress, refresh } = props;
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
      renderItem={({ item: property }) => (
        <PropertyListItem property={property} onPress={onItemPress} />
      )}
    />
  );
}
