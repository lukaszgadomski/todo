import React from "react";
import classnames from "classnames";

export default ({ options, selected, onFilter }) => {
  return (
    <p className="panel-tabs">
      {options.map(name => (
        <a
          key={name}
          className={classnames({
            "is-active": name === selected
          })}
          onClick={() => onFilter(name)}
        >
          {name}
        </a>
      ))}
    </p>
  );
};
