 

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import UserDetailsReducer from './reducers/UserDetailsReducer';
 

const rootReducer = combineReducers({
  userDetails: UserDetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
