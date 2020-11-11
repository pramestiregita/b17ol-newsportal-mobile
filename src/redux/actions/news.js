import http from '../../helpers/http';

export default {
  getAll: (token) => ({
    type: 'GET_NEWS',
    payload: http(token).get('user/post'),
  }),
  getDetail: (token, id) => ({
    type: 'GET_NEWS_DETAIL',
    payload: http(token).get(`user/post/${id}`),
  }),
  search: (token, search) => ({
    type: 'SEARCH',
    payload: http(token).get(`user/post?search=${search}`),
  }),
  sort: (token, sort) => ({
    type: 'SORT',
    payload: http(token).get(`user/post?sort[createdAt]=${sort}`),
  }),
};
