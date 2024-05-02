import {store} from '../../App';

export const SAVE_USER = 'SAVE_USER_LOAD';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_FAIL = 'SAVE_USER_FAIL';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD_LOAD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export const REGISTER_USER = 'REGISTER_USER_LOAD';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const GET_USER = 'GET_USER_LOAD';
export const GET_USER_LOAD_SUCCESS = 'GET_USER_LOAD_SUCCESS';
export const GET_USER_LOAD_FAIL = 'GET_USER_LOAD_FAIL';

export const GET_PUBLIC_USER = 'GET_PUBLIC_USER_LOAD';
export const GET_PUBLIC_USER_LOAD_SUCCESS = 'GET_PUBLIC_USER_LOAD_SUCCESS';
export const GET_PUBLIC_USER_LOAD_FAIL = 'GET_PUBLIC_USER_LOAD_FAIL';

export const SEARCH_USER = 'SEARCH_USER_LOAD';
export const SEARCH_LOAD_SUCCESS = 'SEARCH_LOAD_SUCCESS';
export const SEARCH_LOAD_FAIL = 'SEARCH_LOAD_FAIL';

export const SEARCH_CLOSE_USER = 'SEARCH_CLOSE_USER_LOAD';
export const SEARCH_CLOSE_LOAD_SUCCESS = 'SEARCH_CLOSE_LOAD_SUCCESS';
export const SEARCH_CLOSE_LOAD_FAIL = 'SEARCH_CLOSE_LOAD_FAIL';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SAVE_USER:
    case SEARCH_USER:
    case FORGOT_PASSWORD:
    case SEARCH_CLOSE_USER:
    case REGISTER_USER:
    case GET_PUBLIC_USER:
    case GET_USER:
      return {...state, loading: true};
    case GET_USER_LOAD_SUCCESS:
      const {firstName, lastName} = action.payload.data;
      return {...state, firstName, lastName, loading: false};
    case SAVE_USER_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
    case SEARCH_LOAD_SUCCESS:
    case SEARCH_CLOSE_LOAD_SUCCESS:
    case GET_PUBLIC_USER_LOAD_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {...state, loading: false};
    case GET_PUBLIC_USER_LOAD_FAIL:
    case GET_USER_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error getting user informaton',
      };
    case FORGOT_PASSWORD_FAIL:
    case REGISTER_USER_FAIL:
    case SEARCH_CLOSE_LOAD_FAIL:
    case SEARCH_LOAD_FAIL:
    case SAVE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error setting user informaton',
      };
    default:
      return state;
  }
}

export function setUserInformation(userDetails) {
  const {
    login: {token},
  } = store.getState();
  return {
    type: SAVE_USER,
    payload: {
      client: 'user',
      request: {
        method: 'post',
        url: '/update-user',
        data: {
          user: userDetails,
        },
        headers: {
          authorize: `jwt ${token}`,
        },
      },
    },
  };
}
export function register(userDetails) {
  return {
    type: REGISTER_USER,
    payload: {
      client: 'user',
      request: {
        method: 'post',
        url: '/signup',
        data: {
          user: userDetails,
        },
      },
    },
  };
}
export function getUserInformation() {
  const {
    login: {token},
  } = store.getState();
  return {
    type: GET_USER,
    payload: {
      client: 'user',
      request: {
        method: 'get',
        url: '/user',
        headers: {
          authorize: `jwt ${token}`,
        },
      },
    },
  };
}
export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    payload: {
      client: 'user',
      request: {
        method: 'get',
        url: `/user/${email}`,
      },
    },
  };
}
export function getPublicUser(username) {
  return {
    type: GET_PUBLIC_USER,
    payload: {
      client: 'user',
      request: {
        method: 'get',
        url: `/public-user/${username}`,
      },
    },
  };
}
export function searchUser(searchString) {
  return {
    type: SEARCH_USER,
    payload: {
      client: 'user',
      request: {
        method: 'get',
        url: `/user/search?searchString=${searchString}`,
      },
    },
  };
}
export function searchClosestUsers() {
  return {
    type: SEARCH_USER,
    payload: {
      client: 'user',
      request: {
        method: 'get',
        url: '/user/search/closestUsers',
      },
    },
  };
}
