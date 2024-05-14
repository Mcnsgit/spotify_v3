import { serverApi } from '../../axios';

const fetchDataPending = () => ({
  type: 'FETCH_DATA_PENDING'
});

const fetchDataSuccess = data => ({
  type: 'FETCH_DATA_SUCCESS',
  data
});

const fetchDataError = () => ({
  type: 'FETCH_DATA_ERROR'
});

export const setQuery = query => ({
  type: 'SET_QUERY',
  query
});

export const fetchSearchData = query => {
  return async (dispatch, getState) => {
    dispatch(setQuery(query));
    if (!query) {
      return;
    }
    dispatch(fetchDataPending());
    const country = getState().userReducer.user.country;
    try {
      const response = await serverApi.get(`/search`, {
        params: { q: query, type: 'artist,album,playlist,track', market: country, limit: 6 }
      });
      dispatch(fetchDataSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchDataError());
      return error;
    }
  };
};
