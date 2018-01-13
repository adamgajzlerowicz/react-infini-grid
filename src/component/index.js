// @flow 

import React from 'react';
import { isMobile } from './utils';
import { ItemWrapper } from './components/itemWrapper';
import { map } from 'ramda';
import { calculate } from './utils';
import NothingToShow from "./components/nothingToShow";

import type { Element } from 'react';

const gridStyle = {
  height: 0,
  overflow: 'auto', 
  WebkitOverflowScrolling: isMobile() ? 'touch' : undefined,
};

const gridInner = {
  display: 'flex',
  flexGrow: 1,
  flexBasis: 1,
  flexWrap: 'wrap',
  overflow: 'auto'
};

interface GridPropsType {
  items: Element<*>[];
  height: number;
  width?: number;
  itemHeight: number;
  itemWidth: number;
}

interface GridStateType {
  itemsCount: number;
  wrapperHeight: number;
  wrapperWidth: number;
  itemWidth: number;
  itemHeight: number;
  visibleIndices: { first: number, last: number };
  itemsInRow: number;
};

class Grid extends React.Component<GridPropsType, GridStateType> {
  constructor(props: GridPropsType) {
    super(props);
    const state = {
      itemsCount: 0,
      wrapperHeight: 0,
      wrapperWidth: 0,
      itemWidth: 0,
      itemHeight: 0,
      visibleIndices: { first: 0, last: 0 },
      itemsInRow: 0
    };
    this.state = state;
  }
  gridElement: ?HTMLDivElement = undefined;
  
  getVisibleIndieces() {
    const itemsInRow = calculate.itemsInRow({
      wrapperWidth: this.props.width
      ? this.props.width
      : this.state.wrapperWidth,
      itemWidth: this.props.itemWidth
    });
    const visibleIndices = calculate.visibleItemIndices({
      itemsInRow,
      wrapperHeight: this.props.height,
      totalItems: this.state.itemsCount,
      itemHeight: this.props.itemHeight,
      amountScrolled: this.gridElement ? this.gridElement.scrollTop : 0
    });
    return { visibleIndices, itemsInRow };
  }
 
  componentWillReceiveProps(newProps: {items: Element<*>[]}){
    this.setState({itemsCount: newProps.items.length}, ()=>{
      const { visibleIndices, itemsInRow } = this.getVisibleIndieces();
      this.setState({ visibleIndices, itemsInRow });
    });
    if(this.gridElement) {
      this.gridElement.scrollTop = 0;
    }
  }
  componentDidMount() {
      this.gridElement && this.gridElement.addEventListener("scroll", () => {
        const { visibleIndices, itemsInRow } = this.getVisibleIndieces();
        this.setState({ visibleIndices, itemsInRow });
      });
      
      this.setState(
        {
          wrapperHeight: this.gridElement ? this.gridElement.offsetHeight : 0,
          itemsCount: this.props.items.length,
          itemWidth: this.props.itemWidth,
          itemHeight: this.props.itemHeight,
          wrapperWidth: this.gridElement ? this.gridElement.offsetWidth : 0
        },
        () => {
          const {
            visibleIndices,
            itemsInRow
          } = this.getVisibleIndieces();
          this.setState({
            visibleIndices,
            itemsInRow
          });
        }
      );
      window.addEventListener(
        "resize",
        () => {
          this.gridElement &&
          this.setState(
            { wrapperWidth: this.gridElement.offsetWidth },
            () => {
              const {
                visibleIndices,
                itemsInRow
              } = this.getVisibleIndieces();
              this.setState({ visibleIndices, itemsInRow });
            }
          );
        },
        true
      );
  }
  
  shouldComponentUpdate(
    nextProps: GridPropsType,
    nextState: { visibleIndices: { first: number, last: number } },
    nextContext: any
  ) {
    const prev = this.state.visibleIndices;
    const next = nextState.visibleIndices;
    
    if (next.first && next.first === 1) {
      return true;
    }
    
    if (next.first === prev.first && next.last === prev.last) {
      return false;
    }
    
    return true;
  }
  
  render() {
    const { itemHeight, itemWidth } = this.props;
    
    const style = {
      ...gridStyle,
      height: this.props.height,
      width: this.props.width || "auto",
      minWidth: itemWidth
    };
    
    const height = calculate.wrapperHeight(this.state);
    
    const { itemsInRow, visibleIndices: { first, last } } = this.state;
    
    const visibleItems = this.props.items.slice(first - 1, last);
    
    const spaceBefore = calculate.spaceBefore({
      first,
      itemsInRow,
      itemHeight
    });
    
    const spaceAfter = calculate.spaceAfter({
      last,
      itemsInRow,
      itemHeight,
      containerHeight: height
    });
    
    return (
      <div
      className="grid"
      style={style}
      ref={(e: HTMLDivElement | null ) => {
        this.gridElement = e;
      }}
      >
      <div className="grid-inner" style={{ height, minHeight: this.state.wrapperHeight, ...gridInner }}>
      <div
      className="space-before"
      style={{
        height: spaceBefore,
        flexBasis: "100%",
        flexGrow: 1,
        display: spaceBefore ? "block" : "none"
      }}
      />
      {!visibleItems.length && <NothingToShow />}
      {map(
        (el: Element<*>) => (
          <ItemWrapper
          key={Math.random()}
          height={this.props.itemHeight}
          itemsInRow={itemsInRow}
          child={el}
          />
        ),
        visibleItems
      )}
      <div
      className="space-after"
      style={{
        height: spaceAfter,
        flexBasis: "100%",
        flexGrow: 1,
        display: spaceAfter ? "block" : "none"
      }}
      />
      </div>
      </div>
    );
  }
}

export {
  Grid, calculate, Grid as default,
};
