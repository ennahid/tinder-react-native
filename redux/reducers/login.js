import * as types from "../actions/actionTypes";
import { getToken } from "../../token.helper";

const initialState = {
  loggedIn: false,
  email: "",
  step: 0,
  token: "",
  loading: false,
  loginError: "",
  userData: null,
  userId: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_INIT:
      return { ...state, loading: false, loginError: "" };
    case types.LOGIN_POST_LOADING:
      return {
        ...state,
        loading: action.payload,
        loginError: action.payload ? "" : state.loginError,
      };
    case types.LOGIN_ERROR:
      return { ...state, loggedIn: false, loginError: action.payload };
    case types.CLIENT_DATA_SUCSESS:
      return {
        ...state,
        step: action.step,
        userData: action.userData,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginError: "",
        step: action.step,
        token: action.token,
        userData: action.userData,
        userId: action.userData._id,
        loggedIn: true,
      };
    default:
      return state;
  }
}
