import {
    FETCH_PLACES,
    FETCH_PLACES_SUCCESS,
    ADD_TO_HISTORY,
    SELECT_PLACE,
    SELECT_PLACE_SUCCESS,
} from '../actions/placesActions';

const initialState = {
    predictions: [],
    history: [],
    selectedPlace: null,
    loading: false,
    error: null,
};

const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACES:
            return { ...state, loading: true };
        case FETCH_PLACES_SUCCESS:
            return { ...state, predictions: action.payload, loading: false };
        case ADD_TO_HISTORY:
            return {
                ...state,
                history: [action.payload, ...state.history].slice(0, 10),
            };
        case SELECT_PLACE:
            return { ...state, loading: true };
        case SELECT_PLACE_SUCCESS:
            return { ...state, selectedPlace: action.payload, history: [action.payload, ...state.history].slice(0, 10), loading: false };
        default:
            return state;
    }
};

export default placesReducer;
