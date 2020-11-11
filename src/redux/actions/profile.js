import http from '../../helpers/http';
import qs from 'qs';

export default {
  getProfile: (token) => ({
    type: 'GET_PROFILE',
    payload: http(token).get('user/profile'),
  }),
  editProfile: (token, data) => ({
    type: 'UPDATE_PROFILE',
    payload: http(token).patch('user/profile', qs.stringify(data)),
  }),
};
