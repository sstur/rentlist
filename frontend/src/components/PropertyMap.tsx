import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import LabelledMapMarker from './LabelledMapMarker';
import { Property } from '../types/Property';
import formatPrice from '../helpers/formatPrice';

type LocationData = Location.LocationData;
type LatLng = { lat: number; lng: number };

type Props = {
  onItemPress: (property: Property) => void;
  isLoading: boolean;
  data: Array<Property>;
  refresh: () => void;
};

const USE_DEVICE_LOCATION = false;
const DEFAULT_CENTER = { lat: 37.4442567, lng: -122.164109 };

export default function PropertyMap(props: Props) {
  let { data, onItemPress } = props;
  let [currentLocation, setCurrentLocation] = useState<LatLng>(DEFAULT_CENTER);
  useEffect(() => {
    if (USE_DEVICE_LOCATION) {
      getLocation().then((location) => {
        location && setCurrentLocation(location);
      });
    }
  }, []);
  // This will force the map to re-center once we have a location lock.
  let key = `${currentLocation.lat},${currentLocation.lng}`;
  return (
    <View style={styles.container}>
      <MapView
        key={key}
        style={styles.mapView}
        initialRegion={{
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {data.map((property) => (
          <Marker
            key={property.id}
            coordinate={{ latitude: property.lat, longitude: property.lng }}
            onPress={() => onItemPress(property)}
          >
            <LabelledMapMarker label={formatPrice(property.price)} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

async function getLocation(): Promise<LatLng | null> {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    Alert.alert('Location permission has not been granted.');
    return null;
  } else {
    // Note: getLastKnownPositionAsync is faster than getCurrentPositionAsync.
    let location = await Location.getLastKnownPositionAsync();
    let { latitude: lat, longitude: lng } = location.coords;
    return { lat, lng };
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
});
