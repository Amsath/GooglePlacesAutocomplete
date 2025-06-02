import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SearchBar, List, Icon } from '@ant-design/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToHistory, fetchPlaces, selectPlace } from '../redux/actions/placesActions';

const SearchBarContainer = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { predictions, loading } = useSelector((state) => state.places);

  // Handle input changes
  const handleSearch = (value) => {
    setQuery(value);
    if (value) {
      dispatch(fetchPlaces(value)); // Dispatch search action with query
    }
  };

  // Clear input search on cancel
  const clearSearch = () => {
    setQuery('')
  };

  // Handle place selection
  const handlePlaceSelect = (place) => {
    dispatch(addToHistory(place));
    dispatch(selectPlace(place.place_id));
  };

  return (
    <>
      <Text style={styles.historyTitle}>Search Places:</Text>

      {/* SearchBar with autocomplete */}
      <SearchBar
        value={query}
        placeholder="Search for a place..."
        onChange={handleSearch}
        onCancel={clearSearch}
        showCancelButton={false}
        cancelText="Cancel"
        style={styles.searchBar}
      />

      {/* Render search results */}
      <View style={styles.resultsContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <List.Item style={styles.listItem}
                onPress={() => handlePlaceSelect(item)} // Handle place selection
              >
                <View style={styles.listItemContent}>
                  <Icon name="environment" color="black" style={styles.icon} />
                  <Text style={styles.placeName}>{item.description}</Text>
                </View>
              </List.Item>
            )}
          />
        )}
      </View>
    </>
    // <List>
    //   <InputItem
    //     value={query}
    //     onChange={(text) => {
    //       setQuery(text);
    //       handleSearch(text);
    //     }}
    //     placeholder="Search for places"
    //   />
    //   {predictions?.map((item) => (
    //     <List.Item
    //       key={item.place_id}
    //       onPress={() => {
    //         onPlaceSelect(item);
    //         setQuery(item.description);
    //       }}
    //     >
    //       {item.description}
    //     </List.Item>
    //   ))}
    // </List>
  );
};


const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#899499'
  },
  resultsContainer: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 5,
    marginTop: 15
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
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default SearchBarContainer;