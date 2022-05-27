// Types
export const CHANGE_USER = 'CHANGE_USER';
export const NEXT_TRUE = 'NEXT_TRUE';

export const changeUser = (state) => ({
  type: CHANGE_USER,
  payload: state,
});

export const nextTrue = () => ({
  type: NEXT_TRUE,
});
