import React from "react";
import Input from "../shared/input";

export default function withEdit(
  field,
  WrappedComponent,
  EditComponent,
  actions
) {
  if (
    field === undefined ||
    WrappedComponent === undefined ||
    EditComponent === undefined ||
    actions === undefined
  ) {
    throw new Error(
      "Bad parameters: field, WrappedComponent, EditComponent, actions are required "
    );
  }

  actions = actions || {};

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.state = {
        edit: false
      };
    }
    handleEdit(e) {
      this.setState((prevState, props) => {
        return { edit: !prevState.edit };
      });
    }
    handleSave(text) {
      if (actions.onSave) {
        actions.onSave(this.props.id, text);
      }
      this.setState({ edit: false });
    }
    handleDelete() {
      if (actions.onDelete) {
        actions.onDelete(this.props.id);
      }
    }
    handleSelect() {
      if (actions.onSelect) {
        actions.onSelect(this.props.id);
      }
    }
    render() {
      return (
        <div className={"editable-row"}>
          {this.state.edit
            ? <div className="panel-block">
                <Input
                  text={this.props[field]}
                  submitOnBlur={true}
                  onSubmit={this.handleSave}
                />
              </div>
            : <WrappedComponent
                className={"edit-wrapped"}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
                onSelect={this.handleSelect}
                {...this.props}
              />}
        </div>
      );
    }
  };
}
