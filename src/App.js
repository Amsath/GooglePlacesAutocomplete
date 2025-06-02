import React from 'react';
import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/react-native';
import antdTheme from '@ant-design/react-native/lib/style/themes/default';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import store from './redux/store';
import HomeScreen from './screens/HomeScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Places Search',
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <StyleProvider style={antdTheme}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </StyleProvider>
);

export default App;