import { getVisibleTodos, getVisibleGroups } from "./selectors";
import { filterTodoType } from "../initialStore";

const stringy = obj => JSON.stringify(obj, null, 4);

let state = {};
beforeEach(() => {
  state = {
    groups: {
      search: "",
      list: [{ name: "List n. 1", count: 4 }, { name: "List n. 2", count: 1 }],
      todos_by_group_id: {
        1: [
          {
            id: 1,
            group_id: 1,
            name: "bob clean",
            status: filterTodoType.COMPLETED
          },
          {
            id: 1,
            group_id: 1,
            name: "bob the",
            status: filterTodoType.ACTIVE
          },
          { id: 1, group_id: 1, name: "code", status: filterTodoType.ACTIVE },
          { id: 1, group_id: 1, name: "do it", status: filterTodoType.ACTIVE }
        ],
        2: [{ name: "i'm in second list!", status: filterTodoType.COMPLETED }]
      }, //list of todos for each list by group id
      selected_group_id: 1
    },
    //todos component state
    todos: {
      search: "bob",
      //    list: null, //todos from selected group, if it equals null then no group is selected
      filter: filterTodoType.ACTIVE
    }
  };
});

describe("getVisibleTodos", () => {
  test("filter by status and text and group id", () => {
    expect(getVisibleTodos(state)).toMatchSnapshot();
  });
});

describe("getVisibleGroups", () => {
  test("filter by text ", () => {
    expect(getVisibleGroups(state)).toMatchSnapshot();
  });
});
