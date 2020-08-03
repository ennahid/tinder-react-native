import * as types from "../actions/actionTypes";
import { ToastAndroid } from "react-native";

const initialState = {
  postingMessage: {},
  errorMessage: {},
  loadingMessages: false,
  loadingConversations: false,
  currentConversationId: null,
  conversations: [],
  messages: {},
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
        loadingConversations: action.payload,
      };
    case types.CHAT_GET_CONV_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
      };
    case types.GET_MESSAGES_SUCCESS:
      let allMessages = { ...state.messages };
      if (allMessages[action.conversationId]) {
        allMessages[action.conversationId] = [
          ...allMessages[action.conversationId],
          ...action.messages,
        ];
      } else {
        allMessages[action.conversationId] = action.messages;
      }
      // alert(JSON.stringify(allMessages[action.conversationId], null, 1));
      return {
        ...state,
        currentConversationId: action.conversationId,
        messages: allMessages,
      };
    case types.APPEND_MESSAGE:
      //prepend MEssage
      let allMessages1 = { ...state.messages };
      let allMessages2 = null;
      if (allMessages1[action.message.conversation_id]) {
        allMessages2 = allMessages1[action.message.conversation_id];
        // allMessages2.push(action.message);
        allMessages2.unshift(action.message);
      } else {
        allMessages2 = [];
        // allMessages2.push(action.message);
        allMessages2.unshift(action.message);
      }

      allMessages1[action.message.conversation_id] = allMessages2;

      // alert(JSON.stringify(allMessages1, null, 1));
      return {
        ...state,
        currentConversationId: action.conversationId,
        messages: { ...allMessages1 },
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
