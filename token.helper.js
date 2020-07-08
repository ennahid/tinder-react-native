var jwtDecode = require("jwt-decode");
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";

const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    // saving error
    alert(e);
  }
};

const getData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    alert(e);
  }
  // return value;
};

export const setToken = (Token) => {
  storeData("SM-P-TOKEN", Token);
};
export const getToken = () => {
  return getData("SM-P-TOKEN");
};
export const setUserData = (userData) => {
  storeData("SM-P-DATA", JSON.stringify(userData));
};
export const getStepFromUserData = () => {
  // return JSON.parse(getData("SM-P-DATA")).step;
};
export const getUserIdFromUserData = () => {
  // return JSON.parse(getData("SM-P-DATA"))._id;
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
