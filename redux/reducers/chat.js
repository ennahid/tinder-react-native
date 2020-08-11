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
        conversations: action.payload ? action.payload : [],
      };
    case types.GET_MESSAGES_SUCCESS:
      try {
        let allMessages = { ...state.messages };
        if (allMessages[action.conversationId]) {
          //append with offest
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
      } catch (e) {
        return {
          ...state,
        };
      }
    case types.APPEND_MESSAGE:
      //prepend MEssage
      try {
        let allMessages1 = { ...state.messages };
        let allMessages2 = null;
        if (allMessages1[action.message.conversation_id]) {
          allMessages2 = allMessages1[action.message.conversation_id];
          allMessages2.unshift(action.message);
        } else {
          allMessages2 = [];
          allMessages2.unshift(action.message);
        }

        allMessages1[action.message.conversation_id] = allMessages2;

        //change lat activity date for the conv to go on top
        let allConversation = [...state.conversations];
        let conv_index = allConversation.findIndex(
          (item) => item._id === action.message.conversation_id
        );
        allConversation[conv_index][
          "last_activity"
        ] = new Date().toLocaleString();
        if (
          allConversation[conv_index]["last_message"] &&
          allConversation[conv_index]["last_message"][0]
        ) {
          allConversation[conv_index]["last_message"][0] = action.message;
        }
        return {
          ...state,
          conversations: [...allConversation],
          currentConversationId: action.conversationId,
          messages: { ...allMessages1 },
        };
      } catch (e) {
        return {
          ...state,
        };
      }
    case types.SET_CONVERSATION_SEEN:
      try {
        let allConversations = [...state.conversations];
        let cconv_index = allConversations.findIndex(
          (item) => item._id === action.conversationId
        );
        if (
          allConversations[cconv_index].last_message &&
          allConversations[cconv_index].last_message[0] &&
          allConversations[cconv_index].last_message[0]["seen"] !== undefined
        ) {
          // alert(JSON.stringify(allConversations[cconv_index].last_message));
          allConversations[cconv_index].last_message[0]["seen"] = true;
        }
        return {
          ...state,
          conversations: [...allConversations],
        };
      } catch (e) {
        return {
          ...state,
        };
      }
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
