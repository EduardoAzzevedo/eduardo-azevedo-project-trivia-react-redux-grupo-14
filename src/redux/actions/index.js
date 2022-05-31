// Types
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_ASSERTIONS = 'CHANGE_ASSERTIONS';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
export const CHANGE_TYPE = 'CHANGE_TYPE';
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

export const changeCategory = (state) => ({
  type: CHANGE_CATEGORY,
  payload: state,
});

export const changeDifficulty = (state) => ({
  type: CHANGE_DIFFICULTY,
  payload: state,
});

export const changeType = (state) => ({
  type: CHANGE_TYPE,
  payload: state,
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
