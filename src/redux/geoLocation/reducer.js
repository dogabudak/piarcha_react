export const SAVE_CURRENT_LOCATION = 'GET_AVAILABLE_CITIES_LOAD';
export const SAVE_CURRENT_LOCATION_SUCCESS = 'SAVE_CURRENT_LOCATION_SUCCESS';
export const SAVE_CURRENT_LOCATION_FAIL = 'SAVE_CURRENT_LOCATION_FAIL';

export default function reducer(
  state = {availableCities: [], futuredCities: []},
  action,
) {
  switch (action.type) {
    case SAVE_CURRENT_LOCATION:
      return {...state, loading: true};
    case SAVE_CURRENT_LOCATION_SUCCESS:
      return {...state, loading: false, availableCities: action.payload.data};
    case SAVE_CURRENT_LOCATION_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching available cities',
      };
    default:
      return state;
  }
}

export function setCurrentLocation() {
  return {
    type: SAVE_CURRENT_LOCATION,
    payload: {
      request: {
        // TODO set current location
        url: '/cityList',
      },
    },
  };
}
