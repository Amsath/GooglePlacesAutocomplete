import axios from 'axios';
import Config from 'react-native-config';

const API_KEY = Config.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const BASE_URL_V2 = 'https://places.googleapis.com/v1/places:autocomplete';

export const getPlacesAutocomplete = async (query) => {
  if (!API_KEY) {
    throw new Error('Google Places API key is missing');
  }
  try {
    const response = await axios.get(
      `${BASE_URL}/autocomplete/json?input=${query}&key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/details/json?place_id=${placeId}&key=${API_KEY}`
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

export const getPlacesAutocompleteV2 = async (query) => {
  try {
    const response = await axios.post(
      BASE_URL_V2,
      {
        input: query,
        languageCode: 'en', // Optional: specify language
        regionCode: 'US',   // Optional: bias results to region
        locationBias: {     // Optional: bias results near location
          circle: {
            center: {
              latitude: 37.7749,
              longitude: -122.4194
            },
            radius: 50000 // 50km radius
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id' // Request only needed fields
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('New Places API Error:', error.response?.data || error.message);
    throw error;
  }
};

