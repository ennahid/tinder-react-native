import * as types from "./actionTypes";
import { API_URL } from "../../app.json";
import axios from "axios";
import { setToken, setUserData } from "../../token.helper";

export function createUser(formData) {
  return function (dispatch) {
    dispatch({ type: "LOGIN_POST_LOADING", payload: true });
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/signup`,
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then(function (response) {
        dispatch({ type: "LOGIN_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          setToken(response?.data?.token);
          setUserData(response?.data?.data);
          dispatch({
            type: "LOGIN_SUCCESS",
            step: response?.data?.data?.step,
            token: response?.data?.token,
            userData: response?.data?.data,
          });
        } else {
          dispatch({
            type: "LOGIN_ERROR",
            payload: response.data?.message,
          });
        }
        // // console.log(response)
      })
      .catch(function (error) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: error,
        });
      })
      .finally(() => {
        dispatch({ type: "LOGIN_POST_LOADING", payload: false });
        // alert("rffff");
      });
  };
}

export function loginUser(formData) {
  return function (dispatch) {
    dispatch({ type: "LOGIN_POST_LOADING", payload: true });
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/login`,
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    })
      .then(function (response) {
        dispatch({ type: "LOGIN_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          setToken(response?.data?.token);
          setUserData(response?.data?.data);
          dispatch({
            type: "LOGIN_SUCCESS",
            step: response?.data?.data?.step,
            token: response?.data?.token,
            userData: response?.data?.data,
          });
        } else {
          dispatch({
            type: "LOGIN_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: error,
        });
      })
      .finally(() => {
        dispatch({ type: "LOGIN_POST_LOADING", payload: false });
      });
  };
}
