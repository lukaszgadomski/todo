export const types = {
  SEARCH_TODO: "SEARCH_TODO",
  CHANGE_FILTER_TODO: "CHANGE_FILTER_TODO"
};

export const searchTodo = text => ({
  type: types.SEARCH_TODO,
  text
});
export const filterTodo = filter => ({
  type: types.CHANGE_FILTER_TODO,
  filter
});
