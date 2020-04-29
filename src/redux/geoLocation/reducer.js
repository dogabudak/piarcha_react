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
  return {
    type: SAVE_CURRENT_LOCATION,
    payload: {
      client: 'userUpdate',
      request: {
        method: 'post',
        url: '/update-location',
        data: {
          // TODO get it from state
          token:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2dhYnVkYWsiLCJpc3MiOiJwaWFyY2hfYSIsImlhdCI6MTU4ODE3MjQ1MywiZXhwIjoxNTg4MjA4NDUzfQ.BnefarHvDRROwsSKNE7uLLdNm0h3ApvnI1R2_lvgCJkUvPIWVPm1-Qj7FZKeyRVIOK_S7XLljmvoPJLws8DBKHiYIpAmOJ_kHk_EE9vEfyhzjyrs_30fu44d4aiuYp0DfppB5mLKRD2lMAHbMY8-C5TAmHlz6zKvO4JdDkL7gROJ73e0T1-LvhnfnRE2o2yE7csjGpjW--fV8zlGHkiWAOldYwVNiDxsuYWJvm1SPuZgTdkvEnkvhkHzC-JFjJioHvpD9LFEiM4B3aAQOcsF4G5yISoyKyBedhuZI6nNYpd9JcdkC-v9DQZcwmm_cXMo2q75VdDhLPzSWTkS5A5Rgg',
          currentLocation: locationObject,
        },
      },
    },
  };
}
