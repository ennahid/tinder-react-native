import * as types from "../actions/actionTypes";

const initialState = {
  logged: false,
  loading: false,
  email: "hello world this is my life",
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_POST_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case types.LOGIN_ERROR:
      return Object.assign({}, state, { email: "cvd" });
    case types.LOGIN_SUCCESS:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}
