import React from "react";

const defaults = {
  list: []
};

export default ({ list = defaults.list, ItemComponent }) => {
  return (
    <div className="list">
      {list.map(item => <ItemComponent key={item.id} {...item} />)}
    </div>
  );
};
