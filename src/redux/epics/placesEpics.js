/**
 * @fileoverview
 * Epics to handle asynchronous side effects for the Places module using redux-observable.
 * 
 * This file includes:
 * 1. `fetchPlacesEpic`: Debounced API call to fetch place autocomplete suggestions.
 * 2. `selectPlaceEpic`: API call to fetch place details by selected place ID.
 * 3. `rootEpic`: Combines all place-related epics into one root epic.
 */

import { ofType, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';

import {
  FETCH_PLACES,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  SELECT_PLACE,
  selectPlaceSuccess,
  selectPlaceFailure,
} from '../actions/placesActions';

import { getPlacesAutocomplete, getPlaceDetails } from '../../services/placesService';

/**
 * Epic to handle fetching autocomplete place suggestions.
 * 
 * - Listens for FETCH_PLACES actions.
 * - Debounces input to reduce API call frequency.
 * - Calls the Google Places autocomplete API.
 * - Dispatches success or failure actions based on the result.
 */
const fetchPlacesEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACES),
    debounceTime(300), // Prevent rapid successive API calls
    switchMap((action) =>
      from(getPlacesAutocomplete(action.payload)).pipe(
        map((response) => fetchPlacesSuccess(response.predictions)),
        catchError((error) => of(fetchPlacesFailure(error)))
      )
    )
  );

/**
 * Epic to handle fetching details for a selected place.
 * 
 * - Listens for SELECT_PLACE actions.
 * - Calls the Google Places details API with the place ID.
 * - Dispatches success or failure actions based on the result.
 */
const selectPlaceEpic = (action$) =>
  action$.pipe(
    ofType(SELECT_PLACE),
    switchMap((action) =>
      from(getPlaceDetails(action.payload)).pipe(
        map((placeData) => selectPlaceSuccess(placeData)),
        catchError((error) => of(selectPlaceFailure(error)))
      )
    )
  );

/**
 * Combines all epics related to Places functionality into a single root epic.
 */
export const rootEpic = combineEpics(fetchPlacesEpic, selectPlaceEpic);
