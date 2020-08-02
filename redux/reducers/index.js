import { combineReducers } from "redux";

import loginReducer from "./login";
import clientsReducer from "./clients";
import exploreReducer from "./explore";
import chatReducer from "./chat";

const rootReducer = combineReducers({
  loginReducer,
  clientsReducer,
  exploreReducer,
  chatReducer,
});

export default rootReducer;
