import http from '../../helpers/http';
import qs from 'qs';

export default {
  getAll: (token) => ({
    type: 'GET_MY_POST',
    payload: http(token).get('user/my-post?limit=5'),
  }),
  getDetail: (token, id) => ({
    type: 'GET_MY_POST_DETAIL',
    payload: http(token).get(`user/my-post/${id}`),
  }),
  search: (token, search) => ({
    type: 'SEARCH_MY_POST',
    payload: http(token).get(`user/my-post?search=${search}`),
  }),
  sort: (token, sort) => ({
    type: 'SORT_MY_POST',
    payload: http(token).get(`user/my-post?sort[createdAt]=${sort}`),
  }),
  next: (token, link) => ({
    type: 'NEXT_MY_POST',
    payload: http(token).get(link),
  }),
  delete: (token, id) => ({
    type: 'DELETE_MY_POST',
    payload: http(token).delete(`user/my-post/${id}`),
  }),
  create: (token, data) => ({
    type: 'CREATE_MY_POST',
    payload: http(token).post('user/post', data),
  }),
  edit: (token, id, data) => ({
    type: 'EDIT_MY_POST',
    payload: http(token).patch(`user/my-post/${id}`, qs.stringify(data)),
  }),
  editPict: (token, id, data) => ({
    type: 'EDIT_PICT_MY_POST',
    payload: http(token).patch(`user/post/picture/${id}`, data),
  }),
  clear: () => ({
    type: 'CLEAR_MYPOST',
  }),
};
