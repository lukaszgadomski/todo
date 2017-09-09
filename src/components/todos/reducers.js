import initialState from "../../initialStore";
import { types } from "./actions";

import evolve from "ramda/src/evolve";
import always from "ramda/src/always";

export default (state = initialState.todos, action) => {
  switch (action.type) {
    case types.SEARCH_TODO:
      return evolve({
        search: always(action.text)
      })(state);
    case types.CHANGE_FILTER_TODO:
      return evolve({
        filter: always(action.filter)
      })(state);
    default:
      return state;
  }
};
