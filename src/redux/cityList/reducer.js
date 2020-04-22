export const GET_AVAILABLE_CITIES = 'GET_AVAILABLE_CITIES_LOAD';
export const GET_AVAILABLE_CITIES_SUCCESS = 'GET_AVAILABLE_CITIES_LOAD_SUCCESS';
export const GET_AVAILABLE_CITIES_FAIL = 'GET_AVAILABLE_CITIES_LOAD_FAIL';

export const GET_FUTURED_CITIES = 'GET_FUTURED_CITIES_LOAD';
export const GET_FUTURED_CITIES_SUCCESS = 'GET_FUTURED_CITIES_LOAD_SUCCESS';
export const GET_FUTURED_CITIES_FAIL = 'GET_FUTURED_CITIES_LOAD_FAIL';

export default function reducer(
  state = {availableCities: [], futuredCities: []},
  action,
) {
  switch (action.type) {
    case GET_AVAILABLE_CITIES:
      return {...state, loading: true};
    case GET_AVAILABLE_CITIES_SUCCESS:
      return {...state, loading: false, availableCities: action.payload.data};
    case GET_AVAILABLE_CITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching available cities',
      };
    case GET_FUTURED_CITIES:
      return {...state, loading: true};
    case GET_FUTURED_CITIES_SUCCESS:
      return {...state, loading: false, futuredCities: action.payload.data};
    case GET_FUTURED_CITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching futured cities',
      };
    default:
      return state;
  }
}

export function getAvailableCities() {
  return {
    type: GET_AVAILABLE_CITIES,
    payload: {
      client: 'cityList',
      request: {
        url: '/cityList',
      },
    },
  };
}
export function getFuturedCities() {
  return {
    type: GET_FUTURED_CITIES,
    payload: {
      client: 'cityList',
      request: {
        url: '/featuredList',
      },
    },
  };
}
