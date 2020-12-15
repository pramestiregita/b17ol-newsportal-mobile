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
  changePassword: (token, data) => ({
    type: 'CHANGE_PASSWORD',
    payload: http(token).patch('user/profile/password', qs.stringify(data)),
  }),
  clear: () => ({
    type: 'CLEAR_PROFILE',
  }),
  addAvatar: (token, ava) => ({
    type: 'ADD_AVATAR',
    payload: http(token).post('user/profile/image', ava),
  }),
  changeAvatar: (token, ava) => ({
    type: 'CHANGE_AVATAR',
    payload: http(token).post('user/profile/image', ava),
  }),
};
