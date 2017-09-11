import React from "react";
import { connect } from "react-redux";
import GroupWithEdit from "./group";
import Input from "../shared/input";
import List from "../shared/list";
import * as actions from "./actions";
import { getVisibleGroups } from "../selectors";
import classnames from "classnames";

export const Groups = props => {
  return (
    <nav className={classnames({ panel: true, hide: !props.visible })}>
      <p className="panel-heading">Groups</p>
      <div className="border-block">
        <div className="columns">
          <div className="column is-8">
            <Input
              placeholder={"Add list"}
              onSubmit={props.onAdd}
              noEmpty={true}
              clearOnSubmit={true}
            />
          </div>
          <div className="column is-4">
            <Input
              placeholder={"Search"}
              onSubmit={props.onSearch}
              submitOnChange={true}
            />
          </div>
        </div>
      </div>
      <List
        ItemComponent={GroupWithEdit({
          onSave: props.onSave,
          onDelete: props.onDelete,
          onSelect: props.onSelect
        })}
        list={props.list}
      />
      {props.list && props.list.length > 0 ? (
        <p className="help">Hint: double click on name to edit</p>
      ) : null}
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    visible: state.groups.visible,
    list: getVisibleGroups(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdd: text => {
      dispatch(actions.addGroup(text));
    },
    onSave: (id, text) => {
      dispatch(actions.editGroup(id, text));
    },
    onDelete: id => {
      dispatch(actions.deleteGroup(id));
    },
    onSelect: id => {
      dispatch(actions.selectGroup(id));
    },
    onSearch: text => {
      dispatch(actions.searchGroup(text));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
