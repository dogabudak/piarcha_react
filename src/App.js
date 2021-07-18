import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';
import reducer from './redux/index';
import MainStackNavigator from './pages/MainStackNavigator';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

export const store = createStore(
  reducer,
  applyMiddleware(
    multiClientMiddleware({
      destinations: {
        client: axios.create({
          baseURL: 'http://localhost:3019',
          responseType: 'json',
        }),
      },
      login: {
        client: axios.create({
          baseURL: 'http://localhost:8000',
          responseType: 'json',
        }),
      },
      userUpdate: {
        client: axios.create({
          baseURL: 'http://localhost:3020',
          responseType: 'json',
        }),
      },
    }),
  ),
);
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: '#f5992c',
  },
};

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <MainStackNavigator />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
