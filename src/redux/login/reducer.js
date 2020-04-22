export const LOGIN = 'LOGIN_LOAD';
export const LOGIN_SUCCESS = 'LOGIN_LOAD_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_LOAD_FAIL';

export default function reducer(
  state = {availableCities: [], futuredCities: []},
  action,
) {
  switch (action.type) {
    case LOGIN:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, availableCities: action.payload.data};
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching available cities',
      };
    default:
      return state;
  }
}

export function login() {
  return {
    type: LOGIN,
    payload: {
      request: {
        url: '/login',
      },
    },
  };
}
