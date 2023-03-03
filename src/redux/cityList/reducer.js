export const GET_AVAILABLE_CITIES = 'GET_AVAILABLE_CITIES_LOAD';
export const GET_AVAILABLE_CITIES_SUCCESS = 'GET_AVAILABLE_CITIES_LOAD_SUCCESS';
export const GET_AVAILABLE_CITIES_FAIL = 'GET_AVAILABLE_CITIES_LOAD_FAIL';

export const GET_AVAILABLE_COUNTRIES = 'GET_AVAILABLE_COUNTRIES_LOAD';
export const GET_AVAILABLE_COUNTRIES_SUCCESS =
  'GET_AVAILABLE_COUNTRIES_LOAD_SUCCESS';
export const GET_AVAILABLE_COUNTRIES_FAIL =
  'GET_AVAILABLE_COUNTRIES_LOAD_SUCCESS';

export const GET_COORDINATES = 'GET_COORDINATES_LOAD';
export const GET_COORDINATES_SUCCESS = 'GET_COORDINATES_LOAD_SUCCESS';
export const GET_COORDINATES_FAIL = 'GET_COORDINATES_FAIL';

export const GET_FUTURED_CITIES = 'GET_FUTURED_CITIES_LOAD';
export const GET_FUTURED_CITIES_SUCCESS = 'GET_FUTURED_CITIES_LOAD_SUCCESS';
export const GET_FUTURED_CITIES_FAIL = 'GET_FUTURED_CITIES_LOAD_FAIL';

export default function reducer(
  state = {availableCountries: [], availableCities: [], futuredCities: [], coordinates:[], tours:[]},
  action,
) {
  switch (action.type) {
    case GET_AVAILABLE_CITIES:
      return {...state, loading: true};
    case GET_AVAILABLE_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        availableCities: action.payload.data,
      };
    case GET_AVAILABLE_CITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching available cities',
      };
    case GET_COORDINATES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching available cities',
      };
    case GET_COORDINATES_SUCCESS:
      return {
        ...state,
        loading: false,
        coordinates: action.payload.data.coordinates,
        tours:action.payload.data.tours,
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
    case GET_AVAILABLE_COUNTRIES:
      return {...state, loading: true};
    case GET_AVAILABLE_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        availableCountries: action.payload.data.countries,
      };
    case GET_AVAILABLE_COUNTRIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching counteries',
      };
    default:
      return state;
  }
}

export function getAvailableCountries() {
  return {
    type: GET_AVAILABLE_COUNTRIES,
    payload: {
      client: 'destinations',
      request: {
        url: '/countryList',
      },
    },
  };
}
export function getAvailableCities(country) {
  if(!country) return []
  return {
    type: GET_AVAILABLE_CITIES,
    payload: {
      client: 'destinations',
      request: {
        url: `/cityList/${country}`,
      },
    },
  };
}
export function getCoordinates(city) {
  return {
    type: GET_COORDINATES,
    payload: {
      client: 'destinations',
      request: {
        url: `/coordinates/${city}`,
      },
    },
  };
}
export function getFuturedCities() {
  return {
    type: GET_FUTURED_CITIES,
    payload: {
      client: 'destinations',
      request: {
        url: '/featuredList',
      },
    },
  };
}
