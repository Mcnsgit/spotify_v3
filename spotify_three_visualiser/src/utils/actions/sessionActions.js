import axios from '../../axios';

export const accessToken = accessToken => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  localStorage.setItem('accessToken', accessToken);
  return {
    type: 'SET_TOKEN',
    accessToken
  };
};

export const setActiveDevice = id => {
  axios.put('/me/player', { device_ids: [id], play: false });
  return { type: 'SET_DEVICE' };
};

export const setDeviceId = id => {
  return {
    type: 'SET_DEVICE_ID',
    id
  };
};
