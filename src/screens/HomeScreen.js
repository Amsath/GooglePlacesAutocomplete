import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@ant-design/react-native';
import { addToHistory, selectPlace } from '../redux/actions/placesActions';
import SearchBarContainer from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import MapViewContainer from '../components/MapViewContainer';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <SearchBarContainer />
      <MapViewContainer />
      <SearchHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
});

export default HomeScreen;
