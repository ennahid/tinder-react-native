var jwtDecode = require("jwt-decode");
import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export const setToken = (token) => {
  // localStorage.getItem('SM-P-TOKEN');
  storeData("SM-P-TOKEN", token);
};
export const getToken = () => {
  return getData("SM-P-TOKEN");
};
export const getStepFromToken = () => {
  return jwtDecode(getData("SM-P-TOKEN")).step;
};
export const getUserIdFromToken = () => {
  return jwtDecode(getData("SM-P-TOKEN")).userId;
};
export const getUserNameFromToken = () => {
  return jwtDecode(getData("SM-P-TOKEN")).userName;
};
export const deleteToken = () => {
  storeData("SM-P-TOKEN", "");
};
