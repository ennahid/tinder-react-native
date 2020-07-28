import * as types from "../actions/actionTypes";
import { ToastAndroid } from "react-native";

const initialState = {
  loading: false,
  getLoading: false,
};

export default function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case types.CLIENT_INIT:
      return {
        ...state,
        loading: false,
      };
    case types.CLIENT_POST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.CLIENT_ERROR:
      ToastAndroid.show(action.payload, ToastAndroid.LONG);
      return {
        ...state,
        loading: false,
        getLoading: false,
      };
    case types.CLIENT_GET_LOADING:
      return {
        ...state,
        getLoading: action.payload,
      };
    case types.CLIENT_DATA_SUCSESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
