import {combineReducers} from 'redux';

import auth from './auth';
import news from './news';
import myPost from './myPost';
import profile from './profile';

export default combineReducers({
  auth,
  news,
  myPost,
  profile,
});
