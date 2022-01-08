/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
if (!__DEV__) {
  for (const iterator of Object.keys(global.console)) {
    global.console[iterator] = () => 0;
  }
}