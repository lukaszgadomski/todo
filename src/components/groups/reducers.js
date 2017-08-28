import initialState, { filterTodoType } from "../../initialStore";
import { types } from "./actions";
import { getSelectedTodosSelector, getSelectedGroupId } from "../selectors";
import evolve from "ramda/src/evolve";
import append from "ramda/src/append";

export const getMaxId = list => field => {
  return list.reduce((maxId, item) => Math.max(item[field], maxId), 0) + 1;
};

export const mutateByFunc = old => fn => {
  return fn(old);
};

export const mutatePropByKey = oldObj => propValue => key => {
  return {
    ...oldObj,
    [key]: propValue
  };
};

export const refreshPropByKey = oldObj => propValue => key => {
  return {
    ...oldObj,
    [key]: propValue
  };
};

export const prop = key => obj => {
  return obj[key];
};

/*
const state = {todos: {1 : [1,2,3, 5 , 6], 2: [1]}}
const appender = R.append(4)
const mutateState = R.curry((key, fn, data) => {
  return R.evolve({
    todos: {
     [key] : fn
    }})(data)
})

const got = mutateState(1, R.filter(a => a % 2), state);
*/

export default (state = initialState.groups, action) => {
  let newTodos = null;
  let groupId = null;

  switch (action.type) {
    case types.ADD_GROUP:
      const id = getMaxId(state.list)("id");
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            name: action.text,
            count: 0
          }
        ],
        todos_by_group_id: mutatePropByKey(state.todos_by_group_id)([])(id)
      };
    case types.EDIT_GROUP:
      return {
        ...state,
        list: state.list.map(
          item =>
            item.id === action.id ? { ...item, name: action.text } : item
        )
      };
    case types.DELETE_GROUP:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.id),
        todos_by_group_id: mutateByFunc(
          state.todos_by_group_id
        )(todosByGroupId => {
          const ret = { ...todosByGroupId };
          delete ret[action.id];
          return ret;
        })
      };
    case types.SEARCH_GROUP:
      return {
        ...state,
        search: action.text ? action.text : ""
      };
    case types.SELECT_GROUP:
      return {
        ...state,
        selected_group_id: action.id
      };
    case types.CLOSE_GROUP:
      return {
        ...state,
        selected_group_id: null
      };

    case types.ADD_TODO:
      groupId = state.selected_group_id;
      newTodos = mutateByFunc(
        getSelectedTodosSelector({ groups: state })
      )(todos => {
        return [
          ...todos,
          {
            id: getMaxId(todos)("id"),
            parent_id: groupId,
            name: action.text
          }
        ];
      });
      return {
        ...state,
        list: state.list.map(
          item =>
            item.id === groupId ? { ...item, count: item.count + 1 } : item
        ),
        todos_by_group_id: mutatePropByKey(state.todos_by_group_id)(newTodos)(
          groupId
        )
      };
    case types.EDIT_TODO:
      groupId = state.selected_group_id;
      newTodos = mutateByFunc(
        getSelectedTodosSelector({ groups: state })
      )(todos => {
        return todos.map(
          item =>
            item.id === action.id ? { ...item, name: action.text } : item
        );
      });
      return {
        ...state,
        todos_by_group_id: mutatePropByKey(state.todos_by_group_id)(newTodos)(
          groupId
        )
      };
    case types.DELETE_TODO:
      groupId = state.selected_group_id;
      newTodos = mutateByFunc(
        getSelectedTodosSelector({ groups: state })
      )(todos => {
        return todos.filter(item => item.id !== action.id);
      });
      return {
        ...state,
        list: state.list.map(
          item =>
            item.id === groupId ? { ...item, count: item.count - 1 } : item
        ),
        todos_by_group_id: mutatePropByKey(state.todos_by_group_id)(newTodos)(
          groupId
        )
      };
    default:
      return state;
  }
};
