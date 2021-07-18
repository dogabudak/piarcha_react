export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export default function reducer(state = {token: null}, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.request._response,
      };
    // TODO this is not working properly anymore thats why commented out
    // and getting it now from .request._response
    /*
      if (action.payload.data.authenticated) {
        return {...state, loading: false, token: action.payload.data.token};
      } else {
        return {
          ...state,
          loading: false,
          error: 'Cannot login',
          token: action.payload.data.token,
        };
      }
       */
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while logging',
      };
    default:
      return state;
  }
}

export function login(username, password) {
  return {
    type: LOGIN,
    payload: {
      client: 'login',
      request: {
        headers: {
          authorize: `Basic ${username}:${password}`,
        },
        url: '/login',
      },
    },
  };
}
