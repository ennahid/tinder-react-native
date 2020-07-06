var jwtDecode = require("jwt-decode");

export const setToken = (token) => {
  // localStorage.getItem('SM-P-TOKEN');
  localStorage.setItem("SM-P-TOKEN", token);
};
export const getToken = () => {
  return localStorage.getItem("SM-P-TOKEN");
};

export const deleteToken = () => {
  localStorage.removeItem("SM-P-TOKEN");
};
