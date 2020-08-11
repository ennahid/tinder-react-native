import * as types from "./actionTypes";
import axios from "axios";
import { getToken, getUserIdFromUserData } from "../../token.helper";
import { API_URL } from "../../app.json";

export function getConversations() {
  return function (dispatch) {
    // dispatch({ type: "SWIPE_SUCCESS", direction: direction, userId: userId });
    // dispatch({ type: "SWIPE_BACK_SUCCESS", payload: direction });
    dispatch({ type: "CHAT_GET_LOADING", payload: true });
    axios({
      method: "get",
      url: `${API_URL}/myapi/chat/conversations`,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        // alert(JSON.stringify(response));
        if (response?.status === 200 && response.data?.success) {
          // alert(JSON.stringify(response.data.data));
          dispatch({ type: "CHAT_GET_LOADING", payload: false });
          dispatch({
            type: "CHAT_GET_CONV_SUCCESS",
            payload: response.data?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: "Oops, something went wrong...",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "CLIENT_ERROR",
          payload: "Oops, something went wrong...",
        });
      })
      .finally(() => {
        dispatch({ type: "CHAT_GET_LOADING", payload: false });
      });
  };
}

export function getMessages(conversationId, offset) {
  return function (dispatch) {
    axios({
      method: "get",
      url: `${API_URL}/myapi/chat/messages/${conversationId}/${offset}`,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        if (response?.status === 200 && response.data?.success) {
          dispatch({
            type: "GET_MESSAGES_SUCCESS",
            conversationId: conversationId,
            messages: response.data?.data,
          });
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: "Oops, something went wrong...",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "CLIENT_ERROR",
          payload: "Oops, something went wrong...",
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_GET_LOADING", payload: false });
      });
  };
}

export function setMessagesAsSeen(conversationId) {
  return function (dispatch) {
    dispatch({
      type: "SET_CONVERSATION_SEEN",
      conversationId: conversationId,
    });
    axios({
      method: "post",
      url: `${API_URL}/myapi/chat/messages/seen/${conversationId}`,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(function (response) {
        if (response?.status === 200 && response.data?.success) {
        } else {
          dispatch({
            type: "CLIENT_ERROR",
            payload: "Oops, something went wrong...",
          });
        }
      })
      .catch(function (error) {
        dispatch({
          type: "CLIENT_ERROR",
          payload: "Oops, something went wrong...",
        });
      })
      .finally(() => {
        dispatch({ type: "CLIENT_GET_LOADING", payload: false });
      });
  };
}
