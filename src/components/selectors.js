/***
 * get selected group
 * filter todos by filter type
 * filter todos by search text if it's not empty
 */
import { filterTodoType } from "../initialStore";
import { createSelector } from "reselect";

export const getGroups = state => state.groups.list;
export const getGroupsSearch = state => state.groups.search;
export const getTodosByGroupId = state => state.groups.todos_by_group_id;
export const getSelectedGroupId = state => state.groups.selected_group_id;
export const getTodosFilter = state => state.todos.filter;
export const getTodosSearch = state => state.todos.search;

export const searchPredicate = search => field => item => {
  if (!search || !search.length) {
    return true;
  }
  return item[field].indexOf(search) !== -1;
};

// export const filterTypePredicate = filter => ;

export const getSelectedTodosSelector = createSelector(
  getSelectedGroupId,
  getTodosByGroupId,
  (groupId, groupsById) => (groupId ? groupsById[groupId] : null)
);

export const getSelectedGroup = createSelector(
  getGroups,
  getSelectedGroupId,
  (groups, groupId) => {
    if (!groupId) {
      return null;
    }
    return groups.find(group => group.id === groupId);
  }
);

//returns todos list: selected, filtered by search and status
export const getVisibleTodos = createSelector(
  getSelectedTodosSelector,
  getTodosFilter,
  getTodosSearch,
  (todos, filterType, searchText) => {
    if (todos == null) {
      return [];
    }
    //simply return todos if filters are empty
    if (filterType === filterTodoType.All && searchText === "") {
      return todos;
    }
    const search = searchPredicate(searchText)("name");
    return todos.filter(todo => {
      return (
        search(todo) &&
        (filterType === filterTodoType.ALL || filterType === todo.state)
      );
    });
  }
);

//return groups with todos count
export const getVisibleGroups = createSelector(
  getGroups,
  getSelectedTodosSelector,
  getGroupsSearch,
  (groups, todos, searchText) => {
    if (searchText === "") {
      return groups;
    }
    return groups.filter(searchPredicate(searchText)("name"));
  }
);
