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
        matches: [],
      };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case types.SWIPE_SUCCESS:
      if (
        state.lastSwipes.indexOf({
          direction: action.direction,
          userId: action.userId,
        }) === -1
      ) {
        return {
          ...state,
          lastSwipes: [
            ...state.lastSwipes,
            { direction: action.direction, userId: action.userId },
          ],
          lastSwipe: { direction: action.direction, userId: action.userId },
        };
      }
      return { ...state };
    case types.GOT_MATCH:
      if (state.matches.indexOf(action.matchId) === -1) {
        return {
          ...state,
          matches: [...state.matches, action.matchId],
        };
      }
      return { ...state };
    case types.MATCH_VIEWED:
      return {
        ...state,
        matches: state.matches.slice(1),
      };
    case types.SWIPE_BACK_SUCESS:
      let myLastSwipesArray = [...state.lastSwipes];
      myLastSwipesArray = myLastSwipesArray.slice(0, -1);
      return {
        ...state,
        lastSwipes: state.lastSwipes.slice(0, -1),
        lastSwipe: myLastSwipesArray[myLastSwipesArray.length - 1],
      };
    default:
      return state;
  }
}
