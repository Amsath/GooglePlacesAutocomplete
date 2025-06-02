import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from '@ant-design/react-native';
import { useSelector } from 'react-redux';

const MapViewContainer = () => {
  const { selectedPlace } = useSelector((state) => state.places);

  if (!selectedPlace?.geometry?.location) { return null; }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: selectedPlace.geometry.location.lat,
          longitude: selectedPlace.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
    </View>
  );
};

export default MapViewContainer;