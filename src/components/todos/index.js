import React from "react";
import { filterTodoType } from "../../initialStore";
import { connect } from "react-redux";
import TodoWithEdit from "./todo";
import Input from "../shared/input";
import List from "../shared/list";
import classnames from "classnames";
import * as actions from "../groups/actions";
import * as todoActions from "./actions";
import { getVisibleTodos } from "../selectors";

export const Todos = ({
  groupVisible,
  onAdd,
  onSave,
  onSelect,
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
            <div className="level-item">Todos</div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <a className="button is-danger" onClick={onClose}>
                <span className="icon is-small">
                  <i className="fa fa-times" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="columns">
          <div className="column is-8">
            <Input
              placeholder={"Add list"}
              onSubmit={onAdd}
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
      <p className="panel-tabs">
        <a
          className={classnames({ "is-active": filter === filterTodoType.ALL })}
          //onClick={onFilter(filterTodoType.ALL)}
        >
          all
        </a>
        <a
          className={classnames({
            "is-active": filter === filterTodoType.ACTIVE
          })}
          //onClick={onFilter(filterTodoType.ACTIVE)}
        >
          active
        </a>
        <a
          className={classnames({
            "is-active": filter === filterTodoType.COMPLETED
          })}
          //onClick={onFilter(filterTodoType.COMPLETED)}
        >
          completed
        </a>
      </p>
      <List
        ItemComponent={TodoWithEdit({
          onSave: onSave,
          onSelect: onSelect
        })}
        list={list}
      />
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    filter: state.todos.filter,
    groupVisible: state.groups.visible,
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
