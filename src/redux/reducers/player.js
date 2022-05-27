import { CHANGE_USER, CHANGE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
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
      score: action.payload,
    };
  default: return state;
  }
};

export default player;
