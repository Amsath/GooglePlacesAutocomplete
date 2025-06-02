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

const fetchPlacesEpic = (action$) =>
  action$.pipe(
    ofType(FETCH_PLACES),
    debounceTime(300),
    switchMap((action) =>
      from(getPlacesAutocomplete(action.payload)).pipe(
        map((response) => fetchPlacesSuccess(response.predictions)),
        catchError((error) => of(fetchPlacesFailure(error)))
      )
    )
  );

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

export const rootEpic = combineEpics(fetchPlacesEpic, selectPlaceEpic);
