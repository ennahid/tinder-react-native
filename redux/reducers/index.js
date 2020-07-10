import { combineReducers } from "redux";

import loginReducer from "./login";
import clientsReducer from "./clients";
import exploreReducer from "./explore";

const rootReducer = combineReducers({
  loginReducer,
  clientsReducer,
  exploreReducer,
});

export default rootReducer;
