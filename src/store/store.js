import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { followerReduser } from "./Reducers/followerReducer";
import { userReducer } from "./Reducers/userLogin";

const rootReducer = combineReducers({
  followers: followerReduser,
  login: userReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));