import * as types from "../actions/actionTypes";
import { ToastAndroid } from "react-native";

const initialState = {
  postingMessage: {},
  errorMessage: {},
  loadingMessages: false,
  conversations: [],
  messages: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_INIT:
      return {
        ...state,
        postingMessage: {},
        errorMessage: {},
        loadingMessages: false,
      };
    case types.CHAT_GET_LOADING:
      return {
        ...state,
      };
    case types.CHAT_GET_CONV_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
      };
    case types.GET_MESSAGES_SUCCESS:
      // let allMessages = {};
      // allMessages[action.conversationId] = action.messages;
      // allMessages[action.conversationId + "1"] = [
      //   "helo world",
      //   "this out test",
      // ];
      // allMessages["messages"] = ;
      // alert(JSON.stringify(allMessages[action.conversationId + "1"]));
      // alert(JSON.stringify({ gg: action.conversationId, cc: action.messages }));
      return {
        ...state,
        messages: [...action.messages, "helo world", "this out test"],
      };
    case types.MESSAGE_POSTING:
      return {
        ...state,
      };
    case types.MESSAGE_ERROR:
      //   ToastAndroid.show(action.payload, ToastAndroid.LONG);
      return {
        ...state,
      };

    default:
      return state;
  }
}
