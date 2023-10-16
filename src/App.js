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

// TODO you can load these from .env variables depending on the build
export const store = createStore(
  reducer,
  applyMiddleware(
    multiClientMiddleware({
      destinations: {
        client: axios.create({
          // TODO this is android path, find a better way to handle this shit !
          // baseURL: 'http://10.0.2.2:3019',
          // TODO this is heroku path
          baseURL: 'http://localhost:3019',
          responseType: 'json',
        }),
      },
      login: {
        client: axios.create({
          //baseURL: 'http://10.0.2.2:8000',
          // TODO this is heroku path https://piarch-a-token.herokuapp.com/
          baseURL: 'http://localhost:8000',
          responseType: 'json',
        }),
      },
      user: {
        client: axios.create({
          //baseURL: 'http://10.0.2.2:3020',
          // TODO this is heroku path https://piarch-a-user.herokuapp.com/
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
export default function App() {
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
