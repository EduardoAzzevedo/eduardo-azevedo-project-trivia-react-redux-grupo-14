export const getToken = () => {
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', '');
  }
  return localStorage.getItem('token');
};

export const setToken = (value) => {
  localStorage.setItem('token', value);
};
