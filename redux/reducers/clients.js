import * as types from "../actions/actionTypes";

const initialState = {
  loading: false,
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
    case types.CLIENT_DATA_SUCSESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
