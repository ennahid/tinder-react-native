import * as types from "./actionTypes";
import axios from "axios";
import { getToken, getUserIdFromUserData } from "../../token.helper";
import { API_URL } from "../../app.json";

export function addUserData(formData) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_POST_LOADING", payload: true });
    // alert("http://127.0.0.1/myapi/clients/signup");
    // return;
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/${getUserIdFromUserData()}`,
      // url: `127.0.0.1/myapi/clients/${getUserIdFromUserData()}`,
      // url: `http://127.0.0.1/myapi/${getUserIdFromUserData()}/`,
      // url: `${API_URL}/myapi/clients/preferences/${getUserIdFromUserData()}`,
      // data: { hello: "world" },
      data: formData,
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        // alert(JSON.stringify(response.data.data));
        if (response?.status === 200 && response.data?.success) {
          alert(JSON.stringify(response?.data?.data));
          dispatch({
            type: "CLIENT_DATA_SUCSESS",
            step: response?.data?.data?.step,
            userData: response?.data?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        // alert(JSON.stringify(error.message));
        // alert(JSON.stringify(error));
        dispatch({
          type: "CLIENT_ERROR",
          payload: error.message,
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}

export function editUserData(formData) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_POST_LOADING", payload: true });
    // alert("http://127.0.0.1/myapi/clients/signup");
    // return;
    axios({
      method: "put",
      url: `${API_URL}/myapi/clients/${getUserIdFromUserData()}`,
      // url: `127.0.0.1/myapi/clients/${getUserIdFromUserData()}`,
      // url: `http://127.0.0.1/myapi/${getUserIdFromUserData()}/`,
      // url: `${API_URL}/myapi/clients/preferences/${getUserIdFromUserData()}`,
      // data: { hello: "world" },
      data: formData,
      headers: {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        // alert(JSON.stringify(response.data.data));
        if (response?.status === 200 && response.data?.success) {
          // alert(JSON.stringify(response?.data?.data));
          dispatch({
            type: "CLIENT_DATA_SUCSESS",
            step: response?.data?.data?.step,
            userData: response?.data?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        // alert(JSON.stringify(error.message));
        // alert(JSON.stringify(error));
        dispatch({
          type: "CLIENT_ERROR",
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
      // data: { hello: "ff" },
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "CLIENT_DATA_SUCSESS",
            step: response?.data?.data?.step,
            userData: response?.data?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        alert(error.message);
        dispatch({
          type: "CLIENT_ERROR",
          payload: error,
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}

export function editUserPreferences(formData) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_POST_LOADING", payload: true });
    // alert(getUserIdFromUserData());
    // return;
    axios({
      method: "put",
      url: `${API_URL}/myapi/clients/preferences/${getUserIdFromUserData()}`,
      data: formData,
      // data: { hello: "ff" },
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "CLIENT_DATA_SUCSESS",
            step: response?.data?.data?.step,
            userData: response?.data?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: response.data?.message,
          });
        }
      })
      .catch(function (error) {
        alert(
          `${API_URL}/myapi/clients/preferences/${getUserIdFromUserData()}`
        );
        // alert(error.message);
        dispatch({
          type: "CLIENT_ERROR",
          payload: response.data?.message,
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}
