import React from "react";
import renderer from "react-test-renderer";

import Item from './item';

describe('Item', () => {
  
  const component = renderer.create(<Item id={13} />);
  const tree = component.toJSON();
  
  it('renders', () => {
    expect(tree).toBeTruthy();
  });
  
  it('has class name', () => {
    expect(tree.children[0].props.className).toEqual('item-inner');
    expect(tree.props.className).toEqual('item-outer');
  });
  
  it('shows correct number', () => {
    expect(tree.children[0].children[1]).toEqual('14');
  });
  
  it('matches the snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  
});
