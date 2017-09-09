import React from "react";
import withEdit from "../shared/withedit";
import Input from "../shared/input";
import memoize from "ramda/src/memoize";

export const GroupComponent = function group({
  onEdit,
  onDelete,
  onSelect,
  name,
  count
}) {
  return (
    <div className="panel-block list-item">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <span className="list-item-text" onDoubleClick={onEdit}>
              {name}
            </span>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p className="field">
              <a className="button is-primary" onClick={onSelect}>
                <span className="icon is-small">
                  <i className="fa fa-list" />
                </span>
                <span>Todos</span>
              </a>
            </p>
          </div>
          <div className="level-item">
            <p className="field">
              <a className="button is-danger" onClick={onDelete}>
                <span className="icon is-small">
                  <i className="fa fa-times" />
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memoize(actions =>
  withEdit("name", GroupComponent, Input, actions)
);
