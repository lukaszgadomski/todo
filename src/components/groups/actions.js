export const types = {
  ADD_GROUP: "ADD_GROUP",
  EDIT_GROUP: "EDIT_GROUP",
  DELETE_GROUP: "DELETE_GROUP",
  SEARCH_GROUP: "SEARCH_GROUP",
  SELECT_GROUP: "SELECT_GROUP",
  CLOSE_GROUP: "CLOSE_GROUP",

  ADD_TODO: "ADD_TODO",
  EDIT_TODO: "EDIT_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
  DELETE_TODO: "DELETE_TODO"
};

export const addGroup = text => ({ type: types.ADD_GROUP, text });
export const editGroup = (id, text) => ({ type: types.EDIT_GROUP, id, text });
export const deleteGroup = id => ({ type: types.DELETE_GROUP, id });
export const searchGroup = text => ({
  type: types.SEARCH_GROUP,
  text
});
export const selectGroup = id => ({ type: types.SELECT_GROUP, id });
export const closeGroup = () => ({ type: types.CLOSE_GROUP });

export const addTodo = text => ({
  type: types.ADD_TODO,
  text
});
export const editTodo = (id, text) => ({
  type: types.EDIT_TODO,
  id,
  text
});
export const completeTodo = id => ({
  type: types.COMPLETE_TODO,
  id
});
export const deleteTodo = id => ({
  type: types.DELETE_TODO,
  id
});
