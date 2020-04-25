import {combineReducers} from 'redux';
import cityList from './cityList/reducer';
import login from './login/reducer';
export default combineReducers({
  login,
  cityList,
});
