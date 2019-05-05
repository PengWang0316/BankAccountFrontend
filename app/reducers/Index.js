import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import user from './User';
import accounts from './Accounts';


export default combineReducers({
  user, accounts,
});
