var jwtDecode = require("jwt-decode");
// import AsyncStorage from "@react-native-community/async-storage";
import SyncStorage from "sync-storage";

SyncStorage.init();
const storeData = (name, value) => {
  try {
    SyncStorage.set(name, value);
  } catch (e) {
    // saving error
    alert(e.message);
  }
};

const getData = (name) => {
  try {
    return SyncStorage.get(name);
  } catch (e) {
    // error reading value
    alert(e.message);
  }
};

export const setToken = (Token) => {
  storeData("SM-P-TOKEN", Token);
};
export const getToken = () => {
  return getData("SM-P-TOKEN");
};
export const setUserData = (userData) => {
  storeData("SM-P-DATA", userData);
};
export const getStepFromUserData = () => {
  return getData("SM-P-DATA")?.step;
};
export const getUserIdFromUserData = () => {
  return getData("SM-P-DATA")?._id;
};
export const getUserNameFromUserData = () => {
  // return JSON.parse(getData("SM-P-DATA")).userName;
};
export const deleteToken = () => {
  storeData("SM-P-TOKEN", "");
};
export const deleteUserData = () => {
  storeData("SM-P-DATA", "");
};
