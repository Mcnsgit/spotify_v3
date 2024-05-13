// Refactored sessionReducer with more descriptive action names and error handling
export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TOKEN_SUCCESS':
      return {
        ...state,
        token: action.token,
        tokenError: null
      };
    case 'SET_TOKEN_FAILURE':
      return {
        ...state,
        tokenError: action.error
      };
    case 'SET_DEVICE_ID_SUCCESS':
      return {
        ...state,
        deviceId: action.id,
        deviceError: null
      };
    case 'SET_DEVICE_ID_FAILURE':
      return {
        ...state,
        deviceError: action.error
      };
    default:
      return state;
  }
};

export default sessionReducer;
