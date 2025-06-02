import React from 'react';
import { List } from '@ant-design/react-native';

const SearchHistory = ({ history, onSelect }) => {
  return (
    <List renderHeader="Search History">
      {history?.map((item, index) => (
        <List.Item
          key={index}
          onPress={() => onSelect(item)}
        >
          {item?.description}
        </List.Item>
      ))}
    </List>
  );
};

export default SearchHistory;