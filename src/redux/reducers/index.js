import { combineReducers } from 'redux';
import player from './player';
import fetchAPI from './fetchAPI';

const rootReducer = combineReducers({
  player,
  fetchAPI,
});

export default rootReducer;
