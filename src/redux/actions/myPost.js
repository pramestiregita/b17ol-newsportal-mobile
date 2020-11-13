import http from '../../helpers/http';

export default {
  getAll: (token) => ({
    type: 'GET_NEWS',
    payload: http(token).get('user/my-post?limit=2'),
  }),
  getDetail: (token, id) => ({
    type: 'GET_NEWS_DETAIL',
    payload: http(token).get(`user/my-post/${id}`),
  }),
  search: (token, search) => ({
    type: 'SEARCH',
    payload: http(token).get(`user/my-post?search=${search}`),
  }),
  sort: (token, sort) => ({
    type: 'SORT',
    payload: http(token).get(`user/my-post?sort[createdAt]=${sort}`),
  }),
  next: (token, link) => ({
    type: 'NEXT',
    payload: http(token).get(link !== null && link.slice(22, link.length)),
  }),
  delete: (token, id) => ({
    type: 'DELETE',
    payload: http(token).delete(`user/my-post/${id}`),
  }),
};
