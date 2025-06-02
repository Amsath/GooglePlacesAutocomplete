import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE  } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

const MapViewContainer = () => {
  const { selectedPlace } = useSelector((state) => state.places);

  if (!selectedPlace?.geometry?.location) { return null; }

  return (
    <MapView
      style={styles.map}
      zoomEnabled={true}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: selectedPlace.geometry.location.lat,
        longitude: selectedPlace.geometry.location.lng,
        latitudeDelta: 0.9122,
        longitudeDelta: 0.9121,
      }}
    >
      <Marker
        coordinate={{
          latitude: selectedPlace.geometry.location.lat,
          longitude: selectedPlace.geometry.location.lng,
        }}
        title={selectedPlace.name}
        description={selectedPlace.formatted_address}
      />
    </MapView>

  );
};

const styles = StyleSheet.create({
  map: {
    height: 500, // Height of the map
    marginTop: 20,
    borderRadius: 8,
  },
});

export default MapViewContainer;
