import React from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import store from './src/redux/store/placesStore';
import withLogger from './src/hocs/withLogger';

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default withLogger(App);
