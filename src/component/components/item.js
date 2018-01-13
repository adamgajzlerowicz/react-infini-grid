// @flow

import React from 'react';

interface ItemPropsType {
  id: number;
}

const Item = ({ id }: ItemPropsType) => {
  return (
    <div className="item-outer">
      <div className="item-inner">Item : {id + 1}</div>
    </div>
  );
};

export { Item, Item as default };
