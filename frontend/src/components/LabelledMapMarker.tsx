import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './core-ui';
import { FONT_SIZE_XSMALL, PRIMARY_COLOR } from '../theme/theme';

type Props = {
  label: string;
};

export default function LabelledMapMarker(props: Props) {
  let { label } = props;
  return (
    <View style={styles.marker}>
      <Text style={styles.markerText}>{label}</Text>
      <View style={styles.pin} />
    </View>
  );
}

let styles = StyleSheet.create({
  marker: {
    backgroundColor: PRIMARY_COLOR,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#373992',
  },
  markerText: {
    color: 'white',
    fontSize: FONT_SIZE_XSMALL,
    paddingHorizontal: 8,
  },
  pin: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderWidth: 6,
    borderLeftColor: 'transparent',
    borderTopColor: '#373992',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    left: '50%',
    marginLeft: -6,
    bottom: -12,
  },
});
