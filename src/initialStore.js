export const filterTodoType = {
  ALL: "all",
  ACTIVE: "incompleted",
  COMPLETED: "completed"
};

export default {
  //group component state
  groups: {
    search: "",
    list: [],
    todos_by_group_id: {}, //list of todos for each list by group id
    selected_group_id: null,
    visible: true
  },
  //todos component state
  todos: {
    search: "",
    list: null, //todos from selected group, if it equals null then no group is selected
    filter: filterTodoType.ALL
  }
};
