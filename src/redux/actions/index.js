// Types
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_SCORE = 'CHANGE_SCORE';

export const changeUser = (state) => ({
  type: CHANGE_USER,
  payload: state,
});

export const changeScore = (state) => ({
  type: CHANGE_SCORE,
  payload: state,
});
