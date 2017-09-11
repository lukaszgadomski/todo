import React from "react";
import { filterTodoType } from "../../initialStore";
import { connect } from "react-redux";
import TodoWithEdit from "./todo";
import Input from "../shared/input";
import List from "../shared/list";
import classnames from "classnames";
import * as actions from "../groups/actions";
import * as todoActions from "./actions";
import { getVisibleTodos, getSelectedGroup } from "../selectors";
import Filters from "./filters";

export const Todos = ({
  groupVisible,
  group,
  onAdd,
  onSave,
  onSelect,
  onDelete,
  onClose,
  onSearch,
  onFilter,
  list,
  filter
}) => {
  return (
    <nav className={classnames({ panel: true, hide: groupVisible })}>
      <div className="panel-heading">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <span>{group && group.name}</span>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a className="button is-primary" onClick={onClose}>
                <span className="icon is-small">
                  <i className="fa fa-sign-out " />
                </span>
                <span>Back to groups</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-block">
        <div className="columns">
          <div className="column is-8">
            <Input
              placeholder={"Add todo"}
              onSubmit={onAdd}
              noEmpty={true}
              clearOnSubmit={true}
            />
          </div>
          <div className="column is-4">
            <Input
              placeholder={"Search"}
              onSubmit={onSearch}
              submitOnChange={true}
            />
          </div>
        </div>
      </div>
      <Filters
        options={Object.values(filterTodoType)}
        selected={filter}
        onFilter={onFilter}
      />
      <List
        ItemComponent={TodoWithEdit({
          onSave: onSave,
          onSelect: onSelect,
          onDelete: onDelete
        })}
        list={list}
      />
      {list && list.length > 0 ? (
        <p className="help">Hint: double click on name to edit</p>
      ) : null}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.todos.filter,
    groupVisible: state.groups.visible,
    group: getSelectedGroup(state),
    list: getVisibleTodos(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: text => {
      dispatch(actions.addTodo(text));
    },
    onSave: (id, text) => {
      dispatch(actions.editTodo(id, text));
    },
    onSelect: id => {
      dispatch(actions.completeTodo(id));
    },
    onDelete: id => {
      dispatch(actions.deleteTodo(id));
    },
    onClose: () => {
      dispatch(actions.closeGroup());
    },
    onSearch: text => {
      dispatch(todoActions.searchTodo(text));
    },
    onFilter: filter => {
      dispatch(todoActions.filterTodo(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
