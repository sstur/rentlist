import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Text } from '../components/core-ui';

export default function PropertyList() {
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Property List</Headline>
      <Text>The list of available rental properties will go here.</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },
  headline: {
    marginVertical: 30,
    textAlign: 'center',
  },
});
