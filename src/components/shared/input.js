import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

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
    error: null,
    text: this.props.text || ""
  };
  handleSubmit = e => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      if (this.props.noEmpty) {
        if (text === "") {
          this.setState({ error: "Empty name is not allowed" });
          return;
        } else {
          this.setState({ error: null });
        }
      }
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
            className={classnames({
              input: true,
              "is-medium": true,
              "is-danger": this.state.error !== null
            })}
            type="text"
            autoFocus={true}
            placeholder={this.props.placeholder}
          />
          <span className="icon is-small is-left">
            <i className="fa fa-user" />
          </span>
        </p>
        {this.state.error ? (
          <p className="help is-danger">{this.state.error}</p>
        ) : null}
      </div>
    );
  }
}
