/**
 * @fileoverview
 * Utility functions to interact with the Google Places API.
 * This module provides methods to:
 * 1. Fetch place predictions (autocomplete suggestions) based on user input.
 * 2. Fetch detailed information about a specific place.
 * 3. Use the new v1 Places API for enhanced autocomplete results.
 *
 * Note: Includes fallback mock data for testing in case of API failures or missing API keys.
 */

import axios from 'axios';
import Config from 'react-native-config';
import { PLACE_DETAILS, PREDICTIONS_DATA } from '../utils/data';

const API_KEY = Config.GOOGLE_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const BASE_URL_V2 = 'https://places.googleapis.com/v1/places:autocomplete';

/**
 * Fetches place autocomplete suggestions using the legacy Google Places API.
 *
 * @param {string} query - User input to search for place suggestions.
 * @returns {Promise<Object>} - Autocomplete prediction results or mock data on failure.
 */
export const getPlacesAutocomplete = async (query) => {
  if (!API_KEY) {
    console.warn('Google Places API request denied. Using mock data.');
    return { predictions: PREDICTIONS_DATA };
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/autocomplete/json?input=${query}&key=${API_KEY}`
    );

    // Return mock data for development or fallback scenario
    if (response.data.status === 'REQUEST_DENIED') {
      console.warn('Google Places API request denied. Using mock data.');
      return { predictions: PREDICTIONS_DATA };
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves detailed information about a specific place by place ID.
 *
 * @param {string} placeId - Unique identifier of the selected place.
 * @returns {Promise<Object>} - Place details or mock data on failure.
 */
export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/details/json?place_id=${placeId}&key=${API_KEY}`
    );

    // Handle API-level error returned in response 
    if (response.data.status === 'REQUEST_DENIED') {
      console.warn('Google Places Details API request denied. Using mock data.');
      // Return mock data for development or fallback scenario
      return PLACE_DETAILS;
    }

    return response.data.result;
  } catch (error) {
    throw error;
  }
};

/**
 * Uses the newer Google Places API v1 to fetch place autocomplete suggestions.
 * Allows for richer request configuration like language, region, and location biasing.
 *
 * @param {string} query - User input to search for place suggestions.
 * @returns {Promise<Object>} - Autocomplete prediction results.
 * @throws Will throw an error if the API call fails.
 */
export const getPlacesAutocompleteV2 = async (query) => {
  try {
    const response = await axios.post(
      BASE_URL_V2,
      {
        input: query,
        languageCode: 'en', // Optional: specify language
        regionCode: 'US',   // Optional: bias results to region
        locationBias: {     // Optional: bias results near a geographic location
          circle: {
            center: {
              latitude: 37.7749,
              longitude: -122.4194,
            },
            radius: 50000, // 50 km radius
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id', // Request only specific fields
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('New Places API Error:', error.response?.data || error.message);
    throw error; // Let the caller handle the error
  }
};
