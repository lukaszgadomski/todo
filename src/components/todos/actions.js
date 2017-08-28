export const types = {

};
export const types = {
  SEARCH_TODO: "SEARCH_TODO",
  CHANGE_FILTER_TODO: "CHANGE_FILTER_TODO"
};

export const searchGroup = text => ({
  type: types.SEARCH_GROUP,
  text
});
export const changeFilterTodo = filter_type => ({
  type: types.CHANGE_FILTER_TODO,
  filter_type
});

