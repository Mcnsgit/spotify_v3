import   serverApi from '../../axios';

const fetchUserSuccess = user => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  };
};

const fetchUserError = () => {
  return {
    type: 'FETCH_USER_ERROR'
  };
};

export const fetchUser = () => {
  return async dispatch => {
    try {
      const response = await serverApi.get('/me');
      dispatch(fetchUserSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchUserError());
      return error;
    }
  };
};
