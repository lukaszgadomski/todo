import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TodoTextInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,

    text: PropTypes.string,
    placeholder: PropTypes.string,
    submitOnChange: PropTypes.bool,
    submitOnBlur: PropTypes.bool,
    clearOnSubmit: PropTypes.bool
  };
  state = {
    text: this.props.text || ""
  };
  handleSubmit = e => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSubmit(text);
      if (this.props.clearOnSubmit) {
        this.setState({ text: "" });
      }
    }
  };
  handleChange = e => {
    this.setState({ text: e.target.value });
    if (this.props.submitOnChange) {
      this.props.onSubmit(e.target.value);
    }
  };
  handleBlur = e => {
    if (this.props.submitOnBlur) {
      this.props.onSubmit(e.target.value);
    }
  };
  render() {
    return (
      <div className="field">
        <p className="control has-icons-left is-expanded">
          <input
            value={this.state.text}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            className="input is-medium"
            type="text"
            autoFocus={true}
            placeholder={this.props.placeholder}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-user" />
          </span>
        </p>
      </div>
    );
  }
}
