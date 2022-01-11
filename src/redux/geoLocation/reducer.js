import {store} from '../../App';

export const SAVE_CURRENT_LOCATION = 'SAVE_CURRENT_LOCATION_LOAD';
export const SAVE_CURRENT_LOCATION_SUCCESS = 'SAVE_CURRENT_LOCATION_SUCCESS';
export const SAVE_CURRENT_LOCATION_FAIL = 'SAVE_CURRENT_LOCATION_FAIL';

export default function reducer(state = {currentLocation: {}}, action) {
  switch (action.type) {
    case SAVE_CURRENT_LOCATION:
      return {...state, loading: true};
    case SAVE_CURRENT_LOCATION_SUCCESS:
      return {...state, loading: false, currentLocation: action.payload.data};
    case SAVE_CURRENT_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error setting location',
      };
    default:
      return state;
  }
}

export function setCurrentLocation(locationObject) {
  const {
    login: {token},
  } = store.getState();
  return {
    type: SAVE_CURRENT_LOCATION,
    payload: {
      client: 'user',
      request: {
        method: 'post',
        url: '/update-location',
        data: {
          currentLocation: locationObject,
        },
        headers: {
          authorize: `jwt ${token}`,
        },
      },
    },
  };
}
