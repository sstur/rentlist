import React from 'react';
import { Linking } from 'expo';
import { useRoute, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Text, FixedRatioImage, Link, Button } from '../components/core-ui';
import { RouteProp, NavigationProp } from '../types/Navigation';
import {
  FONT_SIZE_SMALL,
  PRIMARY_COLOR,
  FONT_BOLD,
  FONT_SIZE_LARGE,
} from '../theme/theme';
import formatPrice from '../helpers/formatPrice';
import { Property } from '../types/Property';
import { useAuth } from '../components/AuthenticationProvider';

export default function PropertyDetails() {
  let { currentUser } = useAuth();
  let navigation = useNavigation<NavigationProp<'PropertyDetails'>>();
  let route = useRoute<RouteProp<'PropertyDetails'>>();
  let { property, refresh } = route.params;
  let image = property.images.length ? property.images[0] : null;
  let defaultDescription = '(no description)';
  return (
    <ScrollView>
      {image && (
        <FixedRatioImage aspectRatio={1.875} source={{ uri: image.url }} />
      )}
      <View style={styles.detailsPane}>
        <Text style={styles.smallTitle}>For Rent</Text>
        <Text style={styles.price}>{formatPrice(property.price)}/mo</Text>
        <Text style={styles.address}>{property.address}</Text>
        <View style={styles.specsRow}>
          <View style={styles.spec}>
            <Icon name="floor-lamp" size={28} color="#bbb" />
            <Text style={styles.specText}>{property.bedCount} bed</Text>
          </View>
          <View style={styles.spec}>
            <Icon name="shower-head" size={28} color="#bbb" />
            <Text style={styles.specText}>{property.bathCount} bath</Text>
          </View>
          <View style={styles.spec}>
            <Icon name="arrow-expand" size={28} color="#bbb" />
            <Text style={styles.specText}>{property.floorArea} sqft</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionValue}>
          {property.description || defaultDescription}
        </Text>
        <Text style={styles.sectionTitle}>Listing Created</Text>
        <Text style={styles.sectionValue}>
          {new Date(property.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.sectionTitle}>Contact Realtor</Text>
        <View style={styles.sectionValue}>
          <Text>{property.manager.name}</Text>
          <Link onPress={() => contactRealtor(property)}>
            {property.manager.email}
          </Link>
        </View>
        {currentUser && currentUser.role !== 'USER' ? (
          <Button
            style={{
              marginTop: 20,
            }}
            onPress={() => {
              navigation.navigate('PropertyEdit', {
                property,
                refresh,
              });
            }}
          >
            Edit
          </Button>
        ) : null}
      </View>
    </ScrollView>
  );
}

function contactRealtor(property: Property) {
  Alert.alert(
    'Contact Realtor',
    'Press OK to contact this realtor by email. This will open your default mail app.',
    [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await Linking.openURL(`mailto:${property.manager.email}`);
          } catch (e) {
            Alert.alert('Unable to open mail app.');
          }
        },
      },
    ],
  );
}

let styles = StyleSheet.create({
  detailsPane: {
    padding: 20,
  },
  smallTitle: {
    fontSize: FONT_SIZE_SMALL,
    textTransform: 'uppercase',
    color: PRIMARY_COLOR,
    marginBottom: 10,
  },
  price: {
    fontSize: FONT_SIZE_LARGE,
    fontFamily: FONT_BOLD,
    marginBottom: 10,
  },
  address: {
    marginBottom: 10,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    paddingLeft: 8,
    fontSize: FONT_SIZE_SMALL,
  },
  sectionTitle: {
    fontFamily: FONT_BOLD,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionValue: {
    marginBottom: 10,
  },
});
