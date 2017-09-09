import { combineReducers, createStore } from "redux";
import groupReducer from "./components/groups/reducers";
import todoReducer from "./components/todos/reducers";

const rootReducer = combineReducers({
  groups: groupReducer,
  todos: todoReducer
});

export default createStore(rootReducer);
