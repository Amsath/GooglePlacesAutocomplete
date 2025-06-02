import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const SearchHistory = () => {
  const { history } = useSelector((state) => state.places);
  return (
    <>
      {/* Display search history */}
      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent Searches:</Text>
          <ScrollView style={styles.scrollContainer}>
            {history.map((item, index) => (
              <Text key={index} style={styles.historyItem}>
                {item.description}
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  scrollContainer: {
    maxHeight: 160,
  },
});

export default SearchHistory;