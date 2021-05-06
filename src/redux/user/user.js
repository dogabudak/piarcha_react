import {store} from '../../App';

export const SAVE_USER = 'SAVE_USER_LOAD';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_FAIL = 'SAVE_USER_FAIL';

export default function reducer(state, action) {
  switch (action.type) {
    case SAVE_USER:
      return {...state, loading: true};
    case SAVE_USER_SUCCESS:
      return {...state, loading: false};
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
  console.log(userDetails, token);
  return {
    type: SAVE_USER,
    payload: {
      client: 'userUpdate',
      request: {
        method: 'post',
        url: '/update-user',
        data: {
          token,
          user: userDetails,
        },
      },
    },
  };
}
