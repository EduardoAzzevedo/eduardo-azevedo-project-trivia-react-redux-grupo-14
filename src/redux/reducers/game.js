import { NEXT_TRUE } from '../actions';

const INITIAL_STATE = {
  isNext: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_TRUE:
    return {
      ...state,
      isNext: action.payload,
    };
  default: return state;
  }
};

export default game;
