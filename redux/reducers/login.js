import * as types from "../actions/actionTypes";

const initialState = {
  logged: false,
  email: "hello world this is my life",
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_ERROR:
      return Object.assign({}, state, { email: "cvd" });
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, { email: action.payload });
    default:
      return state;
  }
}
