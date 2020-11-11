import {combineReducers} from 'redux';

import auth from './auth';
import news from './news';
import myPost from './myPost';

export default combineReducers({
  auth,
  news,
  myPost,
});
