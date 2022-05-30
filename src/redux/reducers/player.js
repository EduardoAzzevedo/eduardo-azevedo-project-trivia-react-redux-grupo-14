import {
  CHANGE_USER,
  CHANGE_SCORE,
  CHANGE_ASSERTIONS,
  IMAGE_PLAYER,
  RESET_PLAYER,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarImage: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case CHANGE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case CHANGE_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case IMAGE_PLAYER:
    return {
      ...state,
      gravatarImage: action.payload,
    };
  case RESET_PLAYER:
    return INITIAL_STATE;
  default: return state;
  }
};

export default player;
