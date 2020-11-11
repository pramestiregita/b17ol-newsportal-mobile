import http from '../../helpers/http';
import qs from 'qs';

export default {
  login: (data) => ({
    type: 'LOGIN',
    payload: http().post('auth/login/user', qs.stringify(data)),
  }),
  signup: (data) => ({
    type: 'SIGNUP',
    payload: http().post('auth/signup/user', qs.stringify(data)),
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
};
