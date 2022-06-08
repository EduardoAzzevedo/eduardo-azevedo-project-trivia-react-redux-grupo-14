import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_TYPE,
} from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  type: '',
};

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_CATEGORY:
    return {
      ...state,
      category: action.payload !== '' ? `&category=${action.payload}` : '',
    };
  case CHANGE_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload !== '' ? `&difficulty=${action.payload}` : '',
    };
  case CHANGE_TYPE:
    return {
      ...state,
      type: action.payload !== '' ? `&type=${action.payload}` : '',
    };
  default: return state;
  }
};

export default settings;
