export default function reducer(state = { account: {} }, action) {
  switch (action.type) {
    case action.GET_ACCOUNT:
      return { ...state, loading: true };
    case action.GET_ACCOUNT_SUCCESS:
      console.log("reducer action.payload: " + JSON.stringify(action.payload));
      return { ...state, loading: false, account: action.payload.data };
    case action.GET_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching account",
      };
    default:
      return state;
  }
}
