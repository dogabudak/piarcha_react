import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';
import reducer from './redux/index';
import MainStackNavigator from './pages/MainStackNavigator';

export const store = createStore(
  reducer,
  applyMiddleware(
    multiClientMiddleware({
      cityList: {
        client: axios.create({
          baseURL: 'http://localhost:3019',
          responseType: 'json',
        }),
      },
      login: {
        client: axios.create({
          baseURL: 'http://localhost:3092',
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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
    );
  }
}
