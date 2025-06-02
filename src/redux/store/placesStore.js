import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import placesReducer from '../reducer/placesReducer';
import { rootEpic } from '../epics/placesEpics';

const rootReducer = combineReducers({
  places: placesReducer,
});

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);

export default store;
