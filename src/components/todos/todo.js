import React from "react";
import withEdit from "../shared/withedit";
import Input from "../shared/input";
import memoize from "ramda/src/memoize";
import classnames from "classnames";

export const TodoComponent = function todo({ onEdit, onSelect, name, state }) {
  return (
    <div
      className={classnames({
        "panel-block": true,
        "todo-item": true,
        "list-item": true,
        [state]: true
      })}
    >
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div
              className={classnames({ "checbox-ball": true, [state]: true })}
              onClick={onSelect}
            >
              <span className="icon is-small">
                <i className="fa fa-check" />
              </span>
            </div>
          </div>
          <div className="level-item">
            <span className="list-item-text" onDoubleClick={onEdit}>
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memoize(actions =>
  withEdit("name", TodoComponent, Input, actions)
);
