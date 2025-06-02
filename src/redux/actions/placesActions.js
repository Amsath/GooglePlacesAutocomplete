export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACES_FAILURE = 'FETCH_PLACES_FAILURE';
export const ADD_TO_HISTORY = 'ADD_TO_HISTORY';
export const SELECT_PLACE = 'SELECT_PLACE';
export const SELECT_PLACE_SUCCESS = 'SELECT_PLACE_SUCCESS';
export const SELECT_PLACE_FAILURE = 'SELECT_PLACE_FAILURE';

export const fetchPlaces = (query) => ({
  type: FETCH_PLACES,
  payload: query,
});

export const fetchPlacesSuccess = (predictions) => ({
  type: FETCH_PLACES_SUCCESS,
  payload: predictions,
});

export const fetchPlacesFailure = (error) => ({
  type: FETCH_PLACES_FAILURE,
  payload: error,
});

export const addToHistory = (place) => ({
  type: ADD_TO_HISTORY,
  payload: place,
});

export const selectPlace = (placeId) => ({
  type: SELECT_PLACE,
  payload: placeId,
});

export const selectPlaceSuccess = (placeData) => ({
  type: SELECT_PLACE_SUCCESS,
  payload: placeData,
});

export const selectPlaceFailure = (error) => ({
  type: SELECT_PLACE_FAILURE,
  payload: error,
});
