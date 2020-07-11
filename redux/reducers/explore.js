import * as types from "../actions/actionTypes";

const initialState = {
  users: [],
  lastSwipes: [],
  lastSwipe: null,
  matches: [],
};

export default function exploreReducer(state = initialState, action) {
  switch (action.type) {
    case types.EXPLORE_INIT:
      return {
        ...state,
        loading: false,
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case types.SWIPE_SUCCESS:
      return {
        ...state,
        lastSwipes: [
          ...state.lastSwipes,
          { direction: action.direction, userId: action.userId },
        ],
        lastSwipe: { direction: action.direction, userId: action.userId },
      };
    case types.GOT_MATCH:
      return {
        ...state,
        matches: [...state.matches, action.matchId],
      };
    case types.SWIPE_BACK_SUCESS:
      let myLastSwipesArray = state.lastSwipes;
      myLastSwipesArray = myLastSwipesArray.slice(0, -1);
      return {
        ...state,
        lastSwipes: myLastSwipesArray,
        lastSwipe: myLastSwipesArray[myLastSwipesArray.length - 1],
      };
    default:
      return state;
  }
}
