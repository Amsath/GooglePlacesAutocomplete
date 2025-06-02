import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@ant-design/react-native';
import { addToHistory, selectPlace } from '../redux/actions/placesActions';
import SearchBar from '../components/SearchBar';
import SearchHistory from '../components/SearchHistory';
import MapView from '../components/MapViewContainer';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {history, predictions } = useSelector((state) => state.places);

  const handlePlaceSelect = (place) => {
    dispatch(addToHistory(place));
    dispatch(selectPlace(place.place_id));
  };

  useEffect(() => {
    console.log(predictions);
  }, [predictions]);

  return (
    <View style={styles.container}>
      <SearchBar onPlaceSelect={handlePlaceSelect} />
      <MapView />
      <SearchHistory history={history} onSelect={handlePlaceSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#899499',
  },
  resultsContainer: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    marginTop: 15,
  },
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  placeName: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  historyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historyItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  map: {
    height: 300, // Height of the map
    marginTop: 20,
    borderRadius: 8,
  },
});

export default HomeScreen;
