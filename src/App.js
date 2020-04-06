import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './redux/cityList/reducer';
// import citySelect from './components/selectCity/selectCityScreen';
// import SelectPicture from './components/utilities/selectPicture';
import Login from './components/login/login';
import Geolocation from '@react-native-community/geolocation';

const client = axios.create({
  baseURL: 'http://localhost:3019',
  responseType: 'json',
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

Geolocation.getCurrentPosition(info => console.log(info));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Login />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});
