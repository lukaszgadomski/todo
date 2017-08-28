import reducers from "./reducers";
import * as actions from "./actions";
import initialStore, { filterTodoType } from "../../initialStore";

const stringy = obj => JSON.stringify(obj, null, 4);

let state = {};
describe("reducers", () => {
  describe("group", () => {
    beforeEach(() => {
      state = {
        ...initialStore
      };
    });
    test("add", () => {
      expect(
        reducers(state.groups, actions.addGroup("helou"))
      ).toMatchSnapshot();
    });
    test("edit", () => {
      state.groups = reducers(state.groups, actions.addGroup("helou"));
      expect(
        reducers(state.groups, actions.editGroup(1, "helouedited"))
      ).toMatchSnapshot();
    });
    test("delete", () => {
      state.groups = reducers(state.groups, actions.addGroup("helou"));
      state.groups = reducers(state.groups, actions.addGroup("helou 2"));
      expect(reducers(state.groups, actions.deleteGroup(1))).toMatchSnapshot();
    });
    test("search", () => {
      state.groups = reducers(state.groups, actions.addGroup("helou"));
      state.groups = reducers(
        state.groups,
        actions.addGroup("helou are you there?")
      );
      expect(
        reducers(state.groups, actions.searchGroup("you"))
      ).toMatchSnapshot();
    });
    test("select", () => {
      state.groups = reducers(state.groups, actions.addGroup("helou"));
      expect(reducers(state.groups, actions.selectGroup(1))).toMatchSnapshot();
    });
    test("close", () => {
      state.groups.selected_group_id = 111;
      expect(reducers(state.groups, actions.closeGroup())).toMatchSnapshot();
    });
  });

  describe("todo", () => {
    beforeEach(() => {
      state = {
        ...initialStore
      };
      state.groups = reducers(state.groups, actions.addGroup("nr 1"));

      state.groups = reducers(state.groups, actions.addGroup("nr 2"));
      state.groups = reducers(state.groups, actions.selectGroup(2));
      state.groups = reducers(state.groups, actions.addTodo("helou", 2));
      state.groups = reducers(state.groups, actions.addTodo("helou 2", 2));
      state.groups = reducers(state.groups, actions.selectGroup(1));
    });
    test("add", () => {
      expect(
        reducers(state.groups, actions.addTodo("helou", 1))
      ).toMatchSnapshot();
    });
    test("edit", () => {
      state.groups = reducers(state.groups, actions.addTodo("helou", 1));
      expect(
        reducers(state.groups, actions.editTodo(1, 1, "edited"))
      ).toMatchSnapshot();
    });
    test("delete", () => {
      state.groups = reducers(state.groups, actions.addTodo("helou", 1));
      state.groups = reducers(state.groups, actions.addTodo("helou 2", 1));
      state.groups = reducers(state.groups, actions.addTodo("helou 3", 1));
      expect(
        reducers(state.groups, actions.deleteTodo(1, 1))
      ).toMatchSnapshot();
    });
  });
});
