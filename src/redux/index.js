import {combineReducers} from 'redux';
import cityList from './cityList/reducer';
import login from './login/reducer';
import user from './user/reducer';
import currentLocation from './geoLocation/reducer';
export default combineReducers({
  login,
  user,
  cityList,
  currentLocation,
});
