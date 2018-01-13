// @flow

import * as React from 'react';

import type { Element } from 'react';

interface ItemPropsType {
  child: Element<*>;
  itemsInRow: number;
  height: number;
}

const ItemWrapper = ({
  height,
  itemsInRow,
  child,
}: ItemPropsType): Element<*> => {
  const style = {
    height,
    flexBasis: 100 / itemsInRow + '%',
    flexGrow: 1,
  };
  return (
    <div style={style} className="item-wrapper">
      {child}
    </div>
  );
};

export { ItemWrapper, ItemWrapper as default };
