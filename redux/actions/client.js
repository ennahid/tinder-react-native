import * as types from "./actionTypes";
import axios from "axios";
import { getToken, getUserIdFromUserData } from "../../token.helper";

export function addUserData(userData, formData) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_POST_LOADING", payload: true });
    // alert(getUserIdFromUserData());
    // return;
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/${getUserIdFromUserData()}`,
      data: formData,
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });

        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "CLIENT_DATA_SUCSESS",
            step: response?.data?.step,
            userData: response?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_DATA_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "CLIENT_DATA_ERROR",
          payload: error.message,
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}

export function addUserPreferences(formData) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_POST_LOADING", payload: true });
    // alert(getUserIdFromUserData());
    // return;
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/preferences/${getUserIdFromUserData()}`,
      data: formData,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "CLIENT_DATA_SUCSESS",
            step: response?.data?.step,
          });
        } else {
          dispatch({
            type: "CLIENT_DATA_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "CLIENT_DATA_ERROR",
          payload: error,
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}
