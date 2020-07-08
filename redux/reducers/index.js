import { combineReducers } from "redux";

import loginReducer from "./login";
import clientsReducer from "./clients";

const rootReducer = combineReducers({
  loginReducer,
  clientsReducer,
});

export default rootReducer;
