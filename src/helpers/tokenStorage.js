if (!localStorage.getItem('token')) {
  localStorage.setItem('token', '');
}

export const setToken = (value) => {
  localStorage.setItem('token', value);
};

export const getToken = () => localStorage.getItem('token');
