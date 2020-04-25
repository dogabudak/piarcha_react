export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export default function reducer(
  state = {token: null, username: null, password: null, error: null},
  action,
) {
  switch (action.type) {
    case LOGIN:
      console.log('STATE');
      return {...state, loading: true};
    case LOGIN_SUCCESS:
      if (action.payload.data.authenticated) {
        return {...state, loading: false, token: action.payload};
      } else {
        return {
          ...state,
          loading: false,
          error: 'Cannot login',
          token: action.payload.data.token,
        };
      }
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
