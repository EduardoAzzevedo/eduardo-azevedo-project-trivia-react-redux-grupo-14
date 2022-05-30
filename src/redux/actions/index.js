// Types
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_ASSERTIONS = 'CHANGE_ASSERTIONS';
export const NEXT_TRUE = 'NEXT_TRUE';
export const IMAGE_PLAYER = 'IMAGE_PLAYER';
export const RESET_PLAYER = 'RESET_PLAYER';

export const changeUser = (state) => ({
  type: CHANGE_USER,
  payload: state,
});

export const changeScore = (state) => ({
  type: CHANGE_SCORE,
  payload: state,
});

export const changeAssertions = () => ({
  type: CHANGE_ASSERTIONS,
});

export const nextTrue = (state) => ({
  type: NEXT_TRUE,
  payload: state,
});

export const saveImage = (state) => ({
  type: IMAGE_PLAYER,
  payload: state,
});

export const resetPlayer = () => ({
  type: RESET_PLAYER,
});
