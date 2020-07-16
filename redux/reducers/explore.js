import * as types from "../actions/actionTypes";

const initialState = {
  users: [],
  lastSwipes: [],
  lastSwipe: null,
  matches: [],
  matchesImages: [],
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
        //append match to array
        let matchItem = state.users.find((item) => item._id === action.matchId);
        if (matchItem) {
          return {
            ...state,
            matches: [...state.matches, action.matchId],
            matchesImages: [...state.matchesImages, matchItem.images[0]],
            lastSwipes: [],
            lastSwipe: null,
          };
        } else {
          return {
            ...state,
            matches: [...state.matches, action.matchId],
            lastSwipes: [],
            lastSwipe: null,
          };
        }
      }
      return { ...state };
    case types.MATCH_VIEWED:
      //remove firt match from array
      return {
        ...state,
        matches: state.matches.slice(1),
        matchesImages: state.matchesImages.slice(1),
      };
    case types.SWIPE_BACK_SUCESS:
      let myLastSwipesArray1 = [...state.lastSwipes];
      myLastSwipesArray1 = myLastSwipesArray1.slice(0, -1);
      return {
        ...state,

        lastSwipes: state.lastSwipes.slice(0, -1),
        lastSwipe: myLastSwipesArray1[myLastSwipesArray1.length - 1],
      };
    default:
      return state;
  }
}
