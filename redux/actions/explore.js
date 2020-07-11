import * as types from "./actionTypes";
import axios from "axios";
import { getToken, getUserIdFromUserData } from "../../token.helper";
import { API_URL } from "../../app.json";

export function getUsers(direction, userId) {
  return function (dispatch) {
    // alert("ff");
    // dispatch({ type: "SWIPE_SUCCESS", direction: direction, userId: userId });
    // dispatch({ type: "SWIPE_BACK_SUCCESS", payload: direction });
    axios({
      method: "get",
      url: `${API_URL}/myapi/clients/`,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        dispatch({ type: "CLIENT_POST_LOADING", payload: false });
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "GET_USERS_SUCCESS",
            payload: response?.data.data,
          });
          dispatch({
            type: "EXPLORE_INIT",
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

export function onSwipe(direction, userId) {
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

export function onSwipeBack(direction, userId) {
  return function (dispatch) {
    // alert("ff");
    // dispatch({ type: "SWIPE_SUCCESS", payload: direction });
    dispatch({ type: "SWIPE_BACK_SUCESS" });
    // axios({
    //   method: "post",
    //   url: `${API_URL}/myapi/clients/${getUserIdFromUserData()}`,
    //   data: formData,
    //   headers: {
    //     Accept: "multipart/form-data",
    //     "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + getToken(),
    //   },
    // })
    //   .then(function (response) {
    //     dispatch({ type: "CLIENT_POST_LOADING", payload: false });
    //     if (response?.status === 200 && response.data?.success) {
    //       dispatch({
    //         type: "CLIENT_DATA_SUCSESS",
    //         step: response?.data?.step,
    //         userData: response?.data,
    //       });
    //     } else {
    //       dispatch({
    //         type: "CLIENT_DATA_ERROR",
    //         payload: response.data?.message,
    //       });
    //     }
    //   })
    //   .catch(function (error) {
    //     dispatch({
    //       type: "CLIENT_DATA_ERROR",
    //       payload: error,
    //     });
    //   })
    //   .finally(() => {
    //     dispatch({ type: "CLIENT_POST_LOADING", payload: false });
    //   });
  };
}

export function onMatchViewed() {
  return function (dispatch) {
    dispatch({ type: "MATCH_VIEWED" });
  };
}
