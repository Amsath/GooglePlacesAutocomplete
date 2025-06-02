import React, { useState } from 'react';
import { InputItem, List } from '@ant-design/react-native';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces } from '../redux/actions/placesActions';

const SearchBar = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const predictions = useSelector((state) => state.places.predictions);

  const handleSearch = debounce((text) => {
    if (text.length > 2) {
      dispatch(fetchPlaces(text));
    }
  }, 500);

  return (
    <List>
      <InputItem
        value={query}
        onChange={(text) => {
          setQuery(text);
          handleSearch(text);
        }}
        placeholder="Search for places"
      />
      {predictions?.map((item) => (
        <List.Item
          key={item.place_id}
          onPress={() => {
            onPlaceSelect(item);
            setQuery(item.description);
          }}
        >
          {item.description}
        </List.Item>
      ))}
    </List>
  );
};

export default SearchBar;