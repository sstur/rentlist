import React, { useCallback } from 'react';
import { View, StyleSheet, Platform, TouchableHighlight } from 'react-native';

import noPhoto from '../../assets/no-photo-available.jpg';
import { Property } from '../types/Property';
import { FixedRatioImage, Text } from './core-ui';
import { FONT_SIZE_LARGE, FONT_SIZE_SMALL } from '../theme/theme';
import formatPrice from '../helpers/formatPrice';

type Props = {
  property: Property;
  onPress: (property: Property) => void;
};

export default function PropertyListItem(props: Props) {
  let { property, onPress } = props;
  let image = property.images.length ? property.images[0] : null;
  let imageSource = image ? { uri: image.url } : noPhoto;
  let handlePress = useCallback(() => {
    onPress(property);
  }, [onPress, property]);
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={handlePress}>
        <View style={styles.containerInner}>
          <FixedRatioImage aspectRatio={1.875} source={imageSource} />
          <View style={styles.caption}>
            <View style={styles.captionRow}>
              <Text style={styles.price}>{formatPrice(property.price)}/mo</Text>
              <Text style={styles.spec}>{property.bedCount} bd</Text>
              <View style={styles.divider} />
              <Text style={styles.spec}>{property.bathCount} ba</Text>
              <View style={styles.divider} />
              <Text style={styles.spec}>{property.floorArea} sqft</Text>
            </View>
            <Text style={styles.address}>{property.address}</Text>
          </View>
          <View style={styles.recentBadge}>
            <Text style={styles.recentText}>{daysAgo(property.createdAt)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

function daysAgo(input: string): string {
  let timeDiff = Date.now() - new Date(input).valueOf();
  let ONE_DAY = 24 * 60 * 60 * 1000;
  let numDays = Math.round(timeDiff / ONE_DAY);
  return numDays < 2 ? 'New' : `${numDays} days ago`;
}

let shadowStyle = Platform.select({
  android: {
    elevation: 4,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
});

let styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  containerInner: {
    backgroundColor: 'white',
    ...shadowStyle,
  },
  caption: {
    padding: 10,
  },
  captionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: FONT_SIZE_LARGE,
  },
  spec: {
    fontSize: FONT_SIZE_SMALL,
    paddingTop: 4,
    paddingHorizontal: 8,
  },
  divider: {
    backgroundColor: '#ccc',
    width: 1,
    height: 12,
    marginTop: 4,
  },
  address: {
    fontSize: FONT_SIZE_SMALL,
    paddingTop: 5,
  },
  recentBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },
  recentText: {
    color: 'white',
    fontSize: FONT_SIZE_SMALL,
  },
});
