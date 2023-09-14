import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { followerReduser } from "./followerReducer";

const rootReducer = combineReducers({
  followers: followerReduser,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));