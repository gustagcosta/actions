export const isAuthenticated = () => localStorage.getItem('TOKEN_KEY') !== null;

export const getToken = () => localStorage.getItem('TOKEN_KEY');

export const getUser = () => JSON.parse(localStorage.getItem('USER'));

export const storeToken = (token) => localStorage.setItem('TOKEN_KEY', token);

export const storeUser = (user) =>
  localStorage.setItem('USER', JSON.stringify(user));

export const clearStorage = () => {
  localStorage.removeItem('TOKEN_KEY');
  localStorage.removeItem('USER');
};
