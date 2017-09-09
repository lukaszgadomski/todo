import initialState, { filterTodoType } from "../../initialStore";
import { types } from "./actions";

import add from "ramda/src/add";
import evolve from "ramda/src/evolve";
import always from "ramda/src/always";
import append from "ramda/src/append";
import map from "ramda/src/map";
import curry from "ramda/src/curry";
import filter from "ramda/src/filter";
import assoc from "ramda/src/assoc";
import cond from "ramda/src/cond";
import propEq from "ramda/src/propEq";
import T from "ramda/src/T";
import dissoc from "ramda/src/dissoc";

export const getMaxId = curry((field, list) => {
  return list.reduce((maxId, item) => Math.max(item[field], maxId), 0) + 1;
});

const editById = curry((id, fn) =>
  map(
    cond([
      [propEq("id", id), fn],
      [T, item => item] //return original item if cond returns false
    ])
  )
);

const appendWithId = data => list => {
  if (data === undefined) {
    throw new Error("data undefined");
  }
  if (list === undefined) {
    throw new Error("empty list");
  }
  return append(assoc("id", getMaxId("id", list), data), list);
};

export default (state = initialState.groups, action) => {
  let groupId = null;

  switch (action.type) {
    case types.ADD_GROUP:
      const id = getMaxId("id", state.list);
      return evolve({
        list: append({
          id: id,
          name: action.text,
          count: 0
        }),
        todos_by_group_id: assoc(id, [])
      })(state);
    case types.EDIT_GROUP:
      return evolve({
        list: editById(action.id, assoc("name", action.text))
      })(state);
    case types.DELETE_GROUP:
      return evolve({
        list: filter(item => item.id !== action.id),
        todos_by_group_id: dissoc(action.id)
      })(state);
    case types.SEARCH_GROUP:
      return evolve({
        search: always(action.text)
      })(state);
    case types.SELECT_GROUP:
      return evolve({
        visible: always(false),
        selected_group_id: always(action.id)
      })(state);
    case types.CLOSE_GROUP:
      return evolve({
        visible: always(true),
        selected_group_id: always(null)
      })(state);
    case types.ADD_TODO:
      groupId = state.selected_group_id;
      return evolve({
        list: editById(
          groupId,
          evolve({
            count: add(1)
          })
        ),
        todos_by_group_id: evolve({
          [groupId]: appendWithId({
            parent_id: groupId,
            name: action.text,
            state: filterTodoType.ACTIVE
          })
        })
      })(state);
    case types.EDIT_TODO:
      groupId = state.selected_group_id;
      return evolve({
        todos_by_group_id: evolve({
          [groupId]: editById(action.id, assoc("name", action.text))
        })
      })(state);
    case types.COMPLETE_TODO:
      groupId = state.selected_group_id;
      return evolve({
        todos_by_group_id: evolve({
          [groupId]: editById(
            action.id,
            cond([
              [
                propEq("state", filterTodoType.COMPLETED),
                assoc("state", filterTodoType.ACTIVE)
              ],
              [
                propEq("state", filterTodoType.ACTIVE),
                assoc("state", filterTodoType.COMPLETED)
              ],
              [T, s => s] //return original item if cond returns false
            ])
          )
        })
      })(state);
    case types.DELETE_TODO:
      groupId = state.selected_group_id;
      return evolve({
        list: editById(
          groupId,
          evolve({
            count: add(-1)
          })
        ),
        todos_by_group_id: evolve({
          [groupId]: filter(item => item.id !== action.id)
        })
      })(state);
    default:
      return state;
  }
};
