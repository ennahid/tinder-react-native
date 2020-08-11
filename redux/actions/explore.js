import * as types from "./actionTypes";
import axios from "axios";
import { getToken, getUserIdFromUserData } from "../../token.helper";
import { API_URL } from "../../app.json";

export function getUsers(myToken) {
  return function (dispatch) {
    // dispatch({ type: "SWIPE_SUCCESS", direction: direction, userId: userId });
    // dispatch({ type: "SWIPE_BACK_SUCCESS", payload: direction });
    dispatch({ type: "CLIENT_GET_LOADING", payload: true });
    axios({
      method: "get",
      url: `${API_URL}/myapi/clients/`,
      headers: {
        Authorization: "Bearer " + myToken,
      },
    })
      .then(function (response) {
        dispatch({
          type: "GET_USERS_SUCCESS",
          payload: [],
        });
        dispatch({ type: "CLIENT_GET_LOADING", payload: false });
        // alert(JSON.stringify(response));
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "EXPLORE_INIT",
          });
          dispatch({
            type: "GET_USERS_SUCCESS",
            payload: response?.data.data,
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
        dispatch({ type: "CLIENT_GET_LOADING", payload: false });
      });
  };
}

export function onSwipe(direction, userId) {
  // alert("swipte");
  return function (dispatch) {
    let url_value = direction === "left" ? "like" : "dislike";
    // alert("ff");
    dispatch({ type: "SWIPE_SUCCESS", direction: direction, userId: userId });
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/${url_value}/${userId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        // dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          if (response.data?.match) {
            dispatch({
              type: "GOT_MATCH",
              matchId: response?.data?.data,
            });
          }
        }
      })
      .catch(function (error) {})
      .finally(() => {
        // dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}

export function DeleteAllDislikes() {
  return function (dispatch) {
    // let url_value = direction === "left" ? "like" : "dislike";
    // alert("ff");
    // dispatch({ type: "SWIPE_SUCCESS", direction: direction, userId: userId });
    axios({
      method: "post",
      url: `${API_URL}/myapi/clients/delete/dislikes`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        // dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          if (response.data?.match) {
            dispatch({
              type: "GOT_MATCH",
              matchId: response?.data?.data,
            });
          }
        }
      })
      .catch(function (error) {})
      .finally(() => {
        // dispatch({ type: "CLIENT_POST_LOADING", payload: false });
      });
  };
}

export function onSwipeBack(direction, userId) {
  return function (dispatch) {
    dispatch({ type: "SWIPE_BACK_SUCESS" });
  };
}

export function onMatchViewed() {
  return function (dispatch) {
    dispatch({ type: "MATCH_VIEWED" });
  };
}

export function getMatches(myToken) {
  return function (dispatch) {
    dispatch({ type: "CLIENT_GET_LOADING", payload: true });
    axios({
      method: "get",
      url: `${API_URL}/myapi/clients/matches`,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "GET_MATCHES_SUCCESS",
            payload: response?.data.data,
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
        dispatch({ type: "CLIENT_GET_LOADING", payload: false });
      });
  };
}
